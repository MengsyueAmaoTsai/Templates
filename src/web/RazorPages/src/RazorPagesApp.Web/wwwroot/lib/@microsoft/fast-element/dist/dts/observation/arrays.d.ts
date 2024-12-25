import { Subscriber, SubscriberSet } from "./notifier.js";
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
export declare class Splice {
    index: number;
    removed: any[];
    addedCount: number;
    /**
     * Indicates that this splice represents a complete array reset.
     */
    reset?: boolean;
    /**
     * Creates a splice.
     * @param index - The index that the splice occurs at.
     * @param removed - The items that were removed.
     * @param addedCount - The  number of items that were added.
     */
    constructor(index: number, removed: any[], addedCount: number);
    /**
     * Adjusts the splice index based on the provided array.
     * @param array - The array to adjust to.
     * @returns The same splice, mutated based on the reference array.
     */
    adjustTo(array: any[]): this;
}
/**
 * Indicates what level of feature support the splice
 * strategy provides.
 * @public
 */
export declare const SpliceStrategySupport: Readonly<{
    /**
     * Only supports resets.
     */
    readonly reset: 1;
    /**
     * Supports tracking splices and resets.
     */
    readonly splice: 2;
    /**
     * Supports tracking splices and resets, while applying some form
     * of optimization, such as merging, to the splices.
     */
    readonly optimized: 3;
}>;
/**
 * The available values for SpliceStrategySupport.
 * @public
 */
export declare type SpliceStrategySupport = (typeof SpliceStrategySupport)[keyof typeof SpliceStrategySupport];
/**
 * An approach to tracking changes in an array.
 * @public
 */
export interface SpliceStrategy {
    /**
     * The level of feature support the splice strategy provides.
     */
    readonly support: SpliceStrategySupport;
    /**
     * Normalizes the splices before delivery to array change subscribers.
     * @param previous - The previous version of the array if a reset has taken place.
     * @param current - The current version of the array.
     * @param changes - The set of changes tracked against the array.
     */
    normalize(previous: unknown[] | undefined, current: unknown[], changes: Splice[] | undefined): readonly Splice[];
    /**
     * Performs and tracks a pop operation on an array.
     * @param array - The array to track the change for.
     * @param observer - The observer to register the change with.
     * @param pop - The operation to perform.
     * @param args - The arguments for the operation.
     */
    pop(array: any[], observer: ArrayObserver, pop: typeof Array.prototype.pop, args: any[]): any;
    /**
     * Performs and tracks a push operation on an array.
     * @param array - The array to track the change for.
     * @param observer - The observer to register the change with.
     * @param push - The operation to perform.
     * @param args - The arguments for the operation.
     */
    push(array: any[], observer: ArrayObserver, push: typeof Array.prototype.push, args: any[]): any;
    /**
     * Performs and tracks a reverse operation on an array.
     * @param array - The array to track the change for.
     * @param observer - The observer to register the change with.
     * @param reverse - The operation to perform.
     * @param args - The arguments for the operation.
     */
    reverse(array: any[], observer: ArrayObserver, reverse: typeof Array.prototype.reverse, args: any[]): any;
    /**
     * Performs and tracks a shift operation on an array.
     * @param array - The array to track the change for.
     * @param observer - The observer to register the change with.
     * @param shift - The operation to perform.
     * @param args - The arguments for the operation.
     */
    shift(array: any[], observer: ArrayObserver, shift: typeof Array.prototype.shift, args: any[]): any;
    /**
     * Performs and tracks a sort operation on an array.
     * @param array - The array to track the change for.
     * @param observer - The observer to register the change with.
     * @param sort - The operation to perform.
     * @param args - The arguments for the operation.
     */
    sort(array: any[], observer: ArrayObserver, sort: typeof Array.prototype.sort, args: any[]): any[];
    /**
     * Performs and tracks a splice operation on an array.
     * @param array - The array to track the change for.
     * @param observer - The observer to register the change with.
     * @param splice - The operation to perform.
     * @param args - The arguments for the operation.
     */
    splice(array: any[], observer: ArrayObserver, splice: typeof Array.prototype.splice, args: any[]): any;
    /**
     * Performs and tracks an unshift operation on an array.
     * @param array - The array to track the change for.
     * @param observer - The observer to register the change with.
     * @param unshift - The operation to perform.
     * @param args - The arguments for the operation.
     */
    unshift(array: any[], observer: ArrayObserver, unshift: typeof Array.prototype.unshift, args: any[]): any[];
}
/**
 * Functionality related to tracking changes in arrays.
 * @public
 */
export declare const SpliceStrategy: Readonly<{
    /**
     * A set of changes that represent a full array reset.
     */
    readonly reset: Splice[];
    /**
     * Sets the default strategy to use for array observers.
     * @param strategy - The splice strategy to use.
     */
    readonly setDefaultStrategy: (strategy: SpliceStrategy) => void;
}>;
/**
 * Observes array lengths.
 * @public
 */
export interface LengthObserver extends Subscriber {
    /**
     * The length of the observed array.
     */
    length: number;
}
/**
 * An observer for arrays.
 * @public
 */
export interface ArrayObserver extends SubscriberSet {
    /**
     * The strategy to use for tracking changes.
     */
    strategy: SpliceStrategy | null;
    /**
     * The length observer for the array.
     */
    readonly lengthObserver: LengthObserver;
    /**
     * Adds a splice to the list of changes.
     * @param splice - The splice to add.
     */
    addSplice(splice: Splice): void;
    /**
     * Indicates that a reset change has occurred.
     * @param oldCollection - The collection as it was before the reset.
     */
    reset(oldCollection: any[] | undefined): void;
    /**
     * Flushes the changes to subscribers.
     */
    flush(): void;
}
/**
 * An observer for arrays.
 * @public
 */
export declare const ArrayObserver: Readonly<{
    /**
     * Enables the array observation mechanism.
     * @remarks
     * Array observation is enabled automatically when using the
     * {@link RepeatDirective}, so calling this API manually is
     * not typically necessary.
     */
    readonly enable: () => void;
}>;
/**
 * Enables observing the length of an array.
 * @param array - The array to observe the length of.
 * @returns The length of the array.
 * @public
 */
export declare function lengthOf<T>(array: readonly T[]): number;
