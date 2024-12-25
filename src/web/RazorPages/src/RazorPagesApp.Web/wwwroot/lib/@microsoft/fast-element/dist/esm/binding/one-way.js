import { Observable } from "../observation/observable.js";
import { Binding } from "./binding.js";
class OneWayBinding extends Binding {
    createObserver(subscriber) {
        return Observable.binding(this.evaluate, subscriber, this.isVolatile);
    }
}
/**
 * Creates an standard binding.
 * @param expression - The binding to refresh when changed.
 * @param policy - The security policy to associate with th binding.
 * @param isVolatile - Indicates whether the binding is volatile or not.
 * @returns A binding configuration.
 * @public
 */
export function oneWay(expression, policy, isVolatile = Observable.isVolatileBinding(expression)) {
    return new OneWayBinding(expression, policy, isVolatile);
}
/**
 * Creates an event listener binding.
 * @param expression - The binding to invoke when the event is raised.
 * @param options - Event listener options.
 * @returns A binding configuration.
 * @public
 */
export function listener(expression, options) {
    const config = new OneWayBinding(expression);
    config.options = options;
    return config;
}
