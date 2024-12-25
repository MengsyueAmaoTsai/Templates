import { emptyArray } from "../platform.js";
import { SubscriberSet } from "./notifier.js";
import { Observable } from "./observable.js";
import { Updates } from "./update-queue.js";
/**
 * A splice map is a representation of how a previous array of items
 * was transformed into a new array of items. Conceptually it is a list of
 * tuples of
 *
 *   (index, removed, addedCount)
 *
 * which are kept in ascending index order of. The tuple represents that at
 * the |index|, |removed| sequence of items were removed, and counting forward
 * from |index|, |addedCount| items were added.
 * @public
 */
export class Splice {
    /**
     * Creates a splice.
     * @param index - The index that the splice occurs at.
     * @param removed - The items that were removed.
     * @param addedCount - The  number of items that were added.
     */
    constructor(index, removed, addedCount) {
        this.index = index;
        this.removed = removed;
        this.addedCount = addedCount;
    }
    /**
     * Adjusts the splice index based on the provided array.
     * @param array - The array to adjust to.
     * @returns The same splice, mutated based on the reference array.
     */
    adjustTo(array) {
        let index = this.index;
        const arrayLength = array.length;
        if (index > arrayLength) {
            index = arrayLength - this.addedCount;
        }
        else if (index < 0) {
            index = arrayLength + this.removed.length + index - this.addedCount;
        }
        this.index = index < 0 ? 0 : index;
        return this;
    }
}
/**
 * Indicates what level of feature support the splice
 * strategy provides.
 * @public
 */
export const SpliceStrategySupport = Object.freeze({
    /**
     * Only supports resets.
     */
    reset: 1,
    /**
     * Supports tracking splices and resets.
     */
    splice: 2,
    /**
     * Supports tracking splices and resets, while applying some form
     * of optimization, such as merging, to the splices.
     */
    optimized: 3,
});
const reset = new Splice(0, emptyArray, 0);
reset.reset = true;
const resetSplices = [reset];
// Note: This function is *based* on the computation of the Levenshtein
// "edit" distance. The one change is that "updates" are treated as two
// edits - not one. With Array splices, an update is really a delete
// followed by an add. By retaining this, we optimize for "keeping" the
// maximum array items in the original array. For example:
//
//   'xxxx123' to '123yyyy'
//
// With 1-edit updates, the shortest path would be just to update all seven
// characters. With 2-edit updates, we delete 4, leave 3, and add 4. This
// leaves the substring '123' intact.
function calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd) {
    // "Deletion" columns
    const rowCount = oldEnd - oldStart + 1;
    const columnCount = currentEnd - currentStart + 1;
    const distances = new Array(rowCount);
    let north;
    let west;
    // "Addition" rows. Initialize null column.
    for (let i = 0; i < rowCount; ++i) {
        distances[i] = new Array(columnCount);
        distances[i][0] = i;
    }
    // Initialize null row
    for (let j = 0; j < columnCount; ++j) {
        distances[0][j] = j;
    }
    for (let i = 1; i < rowCount; ++i) {
        for (let j = 1; j < columnCount; ++j) {
            if (current[currentStart + j - 1] === old[oldStart + i - 1]) {
                distances[i][j] = distances[i - 1][j - 1];
            }
            else {
                north = distances[i - 1][j] + 1;
                west = distances[i][j - 1] + 1;
                distances[i][j] = north < west ? north : west;
            }
        }
    }
    return distances;
}
// This starts at the final weight, and walks "backward" by finding
// the minimum previous weight recursively until the origin of the weight
// matrix.
function spliceOperationsFromEditDistances(distances) {
    let i = distances.length - 1;
    let j = distances[0].length - 1;
    let current = distances[i][j];
    const edits = [];
    while (i > 0 || j > 0) {
        if (i === 0) {
            edits.push(2 /* Edit.add */);
            j--;
            continue;
        }
        if (j === 0) {
            edits.push(3 /* Edit.delete */);
            i--;
            continue;
        }
        const northWest = distances[i - 1][j - 1];
        const west = distances[i - 1][j];
        const north = distances[i][j - 1];
        let min;
        if (west < north) {
            min = west < northWest ? west : northWest;
        }
        else {
            min = north < northWest ? north : northWest;
        }
        if (min === northWest) {
            if (northWest === current) {
                edits.push(0 /* Edit.leave */);
            }
            else {
                edits.push(1 /* Edit.update */);
                current = northWest;
            }
            i--;
            j--;
        }
        else if (min === west) {
            edits.push(3 /* Edit.delete */);
            i--;
            current = west;
        }
        else {
            edits.push(2 /* Edit.add */);
            j--;
            current = north;
        }
    }
    return edits.reverse();
}
function sharedPrefix(current, old, searchLength) {
    for (let i = 0; i < searchLength; ++i) {
        if (current[i] !== old[i]) {
            return i;
        }
    }
    return searchLength;
}
function sharedSuffix(current, old, searchLength) {
    let index1 = current.length;
    let index2 = old.length;
    let count = 0;
    while (count < searchLength && current[--index1] === old[--index2]) {
        count++;
    }
    return count;
}
function intersect(start1, end1, start2, end2) {
    // Disjoint
    if (end1 < start2 || end2 < start1) {
        return -1;
    }
    // Adjacent
    if (end1 === start2 || end2 === start1) {
        return 0;
    }
    // Non-zero intersect, span1 first
    if (start1 < start2) {
        if (end1 < end2) {
            return end1 - start2; // Overlap
        }
        return end2 - start2; // Contained
    }
    // Non-zero intersect, span2 first
    if (end2 < end1) {
        return end2 - start1; // Overlap
    }
    return end1 - start1; // Contained
}
/**
 * @remarks
 * Lacking individual splice mutation information, the minimal set of
 * splices can be synthesized given the previous state and final state of an
 * array. The basic approach is to calculate the edit distance matrix and
 * choose the shortest path through it.
 *
 * Complexity: O(l * p)
 *   l: The length of the current array
 *   p: The length of the old array
 */
function calc(current, currentStart, currentEnd, old, oldStart, oldEnd) {
    let prefixCount = 0;
    let suffixCount = 0;
    const minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
    if (currentStart === 0 && oldStart === 0) {
        prefixCount = sharedPrefix(current, old, minLength);
    }
    if (currentEnd === current.length && oldEnd === old.length) {
        suffixCount = sharedSuffix(current, old, minLength - prefixCount);
    }
    currentStart += prefixCount;
    oldStart += prefixCount;
    currentEnd -= suffixCount;
    oldEnd -= suffixCount;
    if (currentEnd - currentStart === 0 && oldEnd - oldStart === 0) {
        return emptyArray;
    }
    if (currentStart === currentEnd) {
        const splice = new Splice(currentStart, [], 0);
        while (oldStart < oldEnd) {
            splice.removed.push(old[oldStart++]);
        }
        return [splice];
    }
    else if (oldStart === oldEnd) {
        return [new Splice(currentStart, [], currentEnd - currentStart)];
    }
    const ops = spliceOperationsFromEditDistances(calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd));
    const splices = [];
    let splice = void 0;
    let index = currentStart;
    let oldIndex = oldStart;
    for (let i = 0; i < ops.length; ++i) {
        switch (ops[i]) {
            case 0 /* Edit.leave */:
                if (splice !== void 0) {
                    splices.push(splice);
                    splice = void 0;
                }
                index++;
                oldIndex++;
                break;
            case 1 /* Edit.update */:
                if (splice === void 0) {
                    splice = new Splice(index, [], 0);
                }
                splice.addedCount++;
                index++;
                splice.removed.push(old[oldIndex]);
                oldIndex++;
                break;
            case 2 /* Edit.add */:
                if (splice === void 0) {
                    splice = new Splice(index, [], 0);
                }
                splice.addedCount++;
                index++;
                break;
            case 3 /* Edit.delete */:
                if (splice === void 0) {
                    splice = new Splice(index, [], 0);
                }
                splice.removed.push(old[oldIndex]);
                oldIndex++;
                break;
            // no default
        }
    }
    if (splice !== void 0) {
        splices.push(splice);
    }
    return splices;
}
function merge(splice, splices) {
    let inserted = false;
    let insertionOffset = 0;
    for (let i = 0; i < splices.length; i++) {
        const current = splices[i];
        current.index += insertionOffset;
        if (inserted) {
            continue;
        }
        const intersectCount = intersect(splice.index, splice.index + splice.removed.length, current.index, current.index + current.addedCount);
        if (intersectCount >= 0) {
            // Merge the two splices
            splices.splice(i, 1);
            i--;
            insertionOffset -= current.addedCount - current.removed.length;
            splice.addedCount += current.addedCount - intersectCount;
            const deleteCount = splice.removed.length + current.removed.length - intersectCount;
            if (!splice.addedCount && !deleteCount) {
                // merged splice is a noop. discard.
                inserted = true;
            }
            else {
                let currentRemoved = current.removed;
                if (splice.index < current.index) {
                    // some prefix of splice.removed is prepended to current.removed.
                    const prepend = splice.removed.slice(0, current.index - splice.index);
                    prepend.push(...currentRemoved);
                    currentRemoved = prepend;
                }
                if (splice.index + splice.removed.length >
                    current.index + current.addedCount) {
                    // some suffix of splice.removed is appended to current.removed.
                    const append = splice.removed.slice(current.index + current.addedCount - splice.index);
                    currentRemoved.push(...append);
                }
                splice.removed = currentRemoved;
                if (current.index < splice.index) {
                    splice.index = current.index;
                }
            }
        }
        else if (splice.index < current.index) {
            // Insert splice here.
            inserted = true;
            splices.splice(i, 0, splice);
            i++;
            const offset = splice.addedCount - splice.removed.length;
            current.index += offset;
            insertionOffset += offset;
        }
    }
    if (!inserted) {
        splices.push(splice);
    }
}
function project(array, changes) {
    let splices = [];
    const initialSplices = [];
    for (let i = 0, ii = changes.length; i < ii; i++) {
        merge(changes[i], initialSplices);
    }
    for (let i = 0, ii = initialSplices.length; i < ii; ++i) {
        const splice = initialSplices[i];
        if (splice.addedCount === 1 && splice.removed.length === 1) {
            if (splice.removed[0] !== array[splice.index]) {
                splices.push(splice);
            }
            continue;
        }
        splices = splices.concat(calc(array, splice.index, splice.index + splice.addedCount, splice.removed, 0, splice.removed.length));
    }
    return splices;
}
/**
 * A SpliceStrategy that attempts to merge all splices into the minimal set of
 * splices needed to represent the change from the old array to the new array.
 * @public
 */
let defaultSpliceStrategy = Object.freeze({
    support: SpliceStrategySupport.optimized,
    normalize(previous, current, changes) {
        if (previous === void 0) {
            if (changes === void 0) {
                return emptyArray;
            }
            return project(current, changes);
        }
        return resetSplices;
    },
    pop(array, observer, pop, args) {
        const notEmpty = array.length > 0;
        const result = pop.apply(array, args);
        if (notEmpty) {
            observer.addSplice(new Splice(array.length, [result], 0));
        }
        return result;
    },
    push(array, observer, push, args) {
        const result = push.apply(array, args);
        observer.addSplice(new Splice(array.length - args.length, [], args.length).adjustTo(array));
        return result;
    },
    reverse(array, observer, reverse, args) {
        const result = reverse.apply(array, args);
        observer.reset(array);
        return result;
    },
    shift(array, observer, shift, args) {
        const notEmpty = array.length > 0;
        const result = shift.apply(array, args);
        if (notEmpty) {
            observer.addSplice(new Splice(0, [result], 0));
        }
        return result;
    },
    sort(array, observer, sort, args) {
        const result = sort.apply(array, args);
        observer.reset(array);
        return result;
    },
    splice(array, observer, splice, args) {
        const result = splice.apply(array, args);
        observer.addSplice(new Splice(+args[0], result, args.length > 2 ? args.length - 2 : 0).adjustTo(array));
        return result;
    },
    unshift(array, observer, unshift, args) {
        const result = unshift.apply(array, args);
        observer.addSplice(new Splice(0, [], args.length).adjustTo(array));
        return result;
    },
});
/**
 * Functionality related to tracking changes in arrays.
 * @public
 */
export const SpliceStrategy = Object.freeze({
    /**
     * A set of changes that represent a full array reset.
     */
    reset: resetSplices,
    /**
     * Sets the default strategy to use for array observers.
     * @param strategy - The splice strategy to use.
     */
    setDefaultStrategy(strategy) {
        defaultSpliceStrategy = strategy;
    },
});
function setNonEnumerable(target, property, value) {
    Reflect.defineProperty(target, property, {
        value,
        enumerable: false,
    });
}
class DefaultArrayObserver extends SubscriberSet {
    constructor(subject) {
        super(subject);
        this.oldCollection = void 0;
        this.splices = void 0;
        this.needsQueue = true;
        this._strategy = null;
        this._lengthObserver = void 0;
        this.call = this.flush;
        setNonEnumerable(subject, "$fastController", this);
    }
    get strategy() {
        return this._strategy;
    }
    set strategy(value) {
        this._strategy = value;
    }
    get lengthObserver() {
        let observer = this._lengthObserver;
        if (observer === void 0) {
            const array = this.subject;
            this._lengthObserver = observer = {
                length: array.length,
                handleChange() {
                    if (this.length !== array.length) {
                        this.length = array.length;
                        Observable.notify(observer, "length");
                    }
                },
            };
            this.subscribe(observer);
        }
        return observer;
    }
    subscribe(subscriber) {
        this.flush();
        super.subscribe(subscriber);
    }
    addSplice(splice) {
        if (this.splices === void 0) {
            this.splices = [splice];
        }
        else {
            this.splices.push(splice);
        }
        this.enqueue();
    }
    reset(oldCollection) {
        this.oldCollection = oldCollection;
        this.enqueue();
    }
    flush() {
        var _a;
        const splices = this.splices;
        const oldCollection = this.oldCollection;
        if (splices === void 0 && oldCollection === void 0) {
            return;
        }
        this.needsQueue = true;
        this.splices = void 0;
        this.oldCollection = void 0;
        this.notify(((_a = this._strategy) !== null && _a !== void 0 ? _a : defaultSpliceStrategy).normalize(oldCollection, this.subject, splices));
    }
    enqueue() {
        if (this.needsQueue) {
            this.needsQueue = false;
            Updates.enqueue(this);
        }
    }
}
let enabled = false;
/**
 * An observer for arrays.
 * @public
 */
export const ArrayObserver = Object.freeze({
    /**
     * Enables the array observation mechanism.
     * @remarks
     * Array observation is enabled automatically when using the
     * {@link RepeatDirective}, so calling this API manually is
     * not typically necessary.
     */
    enable() {
        if (enabled) {
            return;
        }
        enabled = true;
        Observable.setArrayObserverFactory((collection) => new DefaultArrayObserver(collection));
        const proto = Array.prototype;
        if (!proto.$fastPatch) {
            setNonEnumerable(proto, "$fastPatch", 1);
            [
                proto.pop,
                proto.push,
                proto.reverse,
                proto.shift,
                proto.sort,
                proto.splice,
                proto.unshift,
            ].forEach(method => {
                proto[method.name] = function (...args) {
                    var _a;
                    const o = this.$fastController;
                    return o === void 0
                        ? method.apply(this, args)
                        : ((_a = o.strategy) !== null && _a !== void 0 ? _a : defaultSpliceStrategy)[method.name](this, o, method, args);
                };
            });
        }
    },
});
/**
 * Enables observing the length of an array.
 * @param array - The array to observe the length of.
 * @returns The length of the array.
 * @public
 */
export function lengthOf(array) {
    if (!array) {
        return 0;
    }
    let arrayObserver = array.$fastController;
    if (arrayObserver === void 0) {
        ArrayObserver.enable();
        arrayObserver = Observable.getNotifier(array);
    }
    Observable.track(arrayObserver.lengthObserver, "length");
    return array.length;
}
