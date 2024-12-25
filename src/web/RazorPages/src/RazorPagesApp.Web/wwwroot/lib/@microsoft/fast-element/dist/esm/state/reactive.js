import { noop } from "../interfaces.js";
import { Observable } from "../observation/observable.js";
import { visitObject } from "./visitor.js";
const observed = new WeakSet();
const makeObserverVisitor = {
    visitObject: noop,
    visitArray: noop,
    visitProperty(object, propertyName, value) {
        Reflect.defineProperty(object, propertyName, {
            enumerable: true,
            get() {
                Observable.track(object, propertyName);
                return value;
            },
            set(newValue) {
                if (value !== newValue) {
                    value = newValue;
                    Observable.notify(object, propertyName);
                }
            },
        });
    },
};
/**
 * Converts a plain object to a reactive, observable object.
 * @param object - The object to make reactive.
 * @param deep - Indicates whether or not to deeply convert the oject.
 * @returns The converted object.
 * @beta
 */
export function reactive(object, deep = false) {
    visitObject(object, deep, makeObserverVisitor, void 0, observed);
    return object;
}
