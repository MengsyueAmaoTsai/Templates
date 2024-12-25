import { isFunction, noop } from "../interfaces.js";
import { ArrayObserver } from "../observation/arrays.js";
import { Observable } from "../observation/observable.js";
import { visitObject } from "./visitor.js";
function watchObject(object, data) {
    const notifier = Observable.getNotifier(object);
    notifier.subscribe(data.subscriber);
    data.notifiers.push(notifier);
}
const watchVisitor = {
    visitProperty: noop,
    visitObject: watchObject,
    visitArray: watchObject,
};
/**
 * Deeply subscribes to changes in existing observable objects.
 * @param object - The observable object to watch.
 * @param subscriber - The handler to call when changes are made to the object.
 * @returns A disposable that can be used to unsubscribe from change updates.
 * @beta
 */
export function watch(object, subscriber) {
    const data = {
        notifiers: [],
        subscriber: isFunction(subscriber) ? { handleChange: subscriber } : subscriber,
    };
    ArrayObserver.enable();
    visitObject(object, true, watchVisitor, data, new Set());
    return {
        dispose() {
            for (const n of data.notifiers) {
                n.unsubscribe(data.subscriber);
            }
        },
    };
}
