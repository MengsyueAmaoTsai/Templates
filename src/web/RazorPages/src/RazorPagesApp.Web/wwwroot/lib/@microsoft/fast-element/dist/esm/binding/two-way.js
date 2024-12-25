import { isString } from "../interfaces.js";
import { Observable, } from "../observation/observable.js";
import { FAST, makeSerializationNoop } from "../platform.js";
import { Binding } from "./binding.js";
const defaultOptions = {
    fromView: v => v,
};
let twoWaySettings = {
    determineChangeEvent() {
        return "change";
    },
};
/**
 * Enables configuring two-way binding settings.
 */
export const TwoWaySettings = Object.freeze({
    /**
     * Configures two-way binding.
     * @param settings - The settings to use for the two-way binding system.
     */
    configure(settings) {
        twoWaySettings = settings;
    },
});
class TwoWayObserver {
    constructor(directive, subscriber, dataBinding) {
        this.directive = directive;
        this.subscriber = subscriber;
        this.dataBinding = dataBinding;
        this.isNotBound = true;
        this.notifier = Observable.binding(dataBinding.evaluate, this, dataBinding.isVolatile);
    }
    bind(controller) {
        var _a;
        if (!this.changeEvent) {
            this.changeEvent =
                (_a = this.dataBinding.options.changeEvent) !== null && _a !== void 0 ? _a : twoWaySettings.determineChangeEvent(this.directive, this.target);
        }
        if (this.isNotBound) {
            this.target.addEventListener(this.changeEvent, this);
            controller.onUnbind(this);
            this.isNotBound = false;
        }
        return this.notifier.bind(controller);
    }
    unbind(controller) {
        this.isNotBound = true;
        this.target.removeEventListener(this.changeEvent, this);
    }
    handleChange(subject, args) {
        this.subscriber.handleChange(this.dataBinding.evaluate, this);
    }
    handleEvent(event) {
        const bindingSource = this.directive;
        const target = event.currentTarget;
        const notifier = this.notifier;
        const last = notifier.last; // using internal API!!!
        if (!last) {
            FAST.warn(1203 /* Message.twoWayBindingRequiresObservables */);
            return;
        }
        let value;
        switch (bindingSource.aspectType) {
            case 1:
                value = target.getAttribute(bindingSource.targetAspect);
                break;
            case 2:
                value = target.hasAttribute(bindingSource.targetAspect);
                break;
            case 4:
                value = target.innerText;
                break;
            default:
                value = target[bindingSource.targetAspect];
                break;
        }
        last.propertySource[last.propertyName] =
            this.dataBinding.options.fromView(value);
    }
}
makeSerializationNoop(TwoWayObserver);
class TwoWayBinding extends Binding {
    createObserver(subscriber, bindingSource) {
        return new TwoWayObserver(bindingSource, subscriber, this);
    }
}
/**
 * Creates a default binding.
 * @param expression - The binding to refresh when changed.
 * @param optionsOrChangeEvent - The binding options or the name of the change event to use.
 * @param policy - The security policy to associate with the binding.
 * @param isBindingVolatile - Indicates whether the binding is volatile or not.
 * @returns A binding.
 * @public
 */
export function twoWay(expression, optionsOrChangeEvent, policy, isBindingVolatile = Observable.isVolatileBinding(expression)) {
    if (isString(optionsOrChangeEvent)) {
        optionsOrChangeEvent = { changeEvent: optionsOrChangeEvent };
    }
    if (!optionsOrChangeEvent) {
        optionsOrChangeEvent = defaultOptions;
    }
    else if (!optionsOrChangeEvent.fromView) {
        optionsOrChangeEvent.fromView = defaultOptions.fromView;
    }
    const binding = new TwoWayBinding(expression, policy, isBindingVolatile);
    binding.options = optionsOrChangeEvent;
    return binding;
}
