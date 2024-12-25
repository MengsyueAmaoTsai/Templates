import { makeSerializationNoop } from "../platform.js";
import { Binding } from "./binding.js";
class OneTimeBinding extends Binding {
    createObserver() {
        return this;
    }
    bind(controller) {
        return this.evaluate(controller.source, controller.context);
    }
}
makeSerializationNoop(OneTimeBinding);
/**
 * Creates a one time binding
 * @param expression - The binding to refresh when signaled.
 * @param policy - The security policy to associate with th binding.
 * @returns A binding configuration.
 * @public
 */
export function oneTime(expression, policy) {
    return new OneTimeBinding(expression, policy);
}
