// Inspired by https://www.starbeamjs.com/
import { isFunction, isString } from "../interfaces.js";
import { Observable } from "../observation/observable.js";
import { reactive } from "./reactive.js";
const defaultStateOptions = {
    deep: false,
};
/**
 * Creates a reactive state value.
 * @param value - The initial state value.
 * @param options - Options to customize the state or a friendly name.
 * @returns A State instance.
 * @beta
 */
export function state(value, options = defaultStateOptions) {
    var _a;
    if (isString(options)) {
        options = { deep: false, name: options };
    }
    const host = reactive({ value }, options.deep);
    const state = (() => host.value);
    Object.defineProperty(state, "current", {
        get: () => host.value,
        set: (value) => (host.value = value),
    });
    Object.defineProperty(state, "name", {
        value: (_a = options.name) !== null && _a !== void 0 ? _a : "SharedState",
    });
    state.set = (value) => (host.value = value);
    state.asReadonly = () => {
        const readonlyState = (() => host.value);
        Object.defineProperty(readonlyState, "current", {
            get: () => host.value,
        });
        Object.defineProperty(readonlyState, "name", {
            value: `${state.name} (Readonly)`,
        });
        return Object.freeze(readonlyState);
    };
    return state;
}
/**
 * Creates a reactive state that has its value associated with a specific owner.
 * @param value - The initial value or a factory that provides an initial value for each owner.
 * @param options - Options to customize the state or a friendly name.
 * @returns An OwnedState instance.
 * @beta
 */
export function ownedState(value, options = defaultStateOptions) {
    var _a;
    if (isString(options)) {
        options = { deep: false, name: options };
    }
    if (!isFunction(value)) {
        const v = value;
        value = () => v;
    }
    const storage = new WeakMap();
    const getHost = (owner) => {
        let host = storage.get(owner);
        if (host === void 0) {
            host = reactive({ value: value() }, options.deep);
            storage.set(owner, host);
        }
        return host;
    };
    const state = ((owner) => getHost(owner).value);
    Object.defineProperty(state, "name", {
        value: (_a = options.name) !== null && _a !== void 0 ? _a : "OwnedState",
    });
    state.set = (owner, value) => (getHost(owner).value = value);
    state.asReadonly = () => {
        const readonlyState = ((owner) => getHost(owner).value);
        Object.defineProperty(readonlyState, "name", {
            value: `${state.name} (Readonly)`,
        });
        return Object.freeze(readonlyState);
    };
    return state;
}
/**
 * Creates a ComputedState.
 * @param initialize - The initialization callback.
 * @param name - A friendly name for this computation.
 * @returns A ComputedState
 * @beta
 */
export function computedState(initialize, name = "ComputedState") {
    let setupCallback = null;
    const builder = {
        on: {
            setup(callback) {
                setupCallback = callback;
            },
        },
    };
    const computer = initialize(builder);
    const host = reactive({ value: null }, false);
    const output = (() => host.value);
    Object.defineProperty(output, "current", {
        get: () => host.value,
    });
    Object.defineProperty(output, "name", {
        value: name,
    });
    // eslint-disable-next-line prefer-const
    let computedNotifier;
    const computedSubscriber = {
        handleChange() {
            host.value = computedNotifier.observe(null);
        },
    };
    computedNotifier = Observable.binding(computer, computedSubscriber);
    computedNotifier.setMode(false);
    let cleanup;
    let setupNotifier;
    if (setupCallback) {
        const setupSubscriber = {
            handleChange() {
                if (cleanup) {
                    cleanup();
                }
                cleanup = setupNotifier.observe(null);
                host.value = computer();
            },
        };
        setupNotifier = Observable.binding(setupCallback, setupSubscriber);
        setupNotifier.setMode(false);
        cleanup = setupNotifier.observe(null);
    }
    host.value = computedNotifier.observe(null);
    output.dispose = () => {
        if (cleanup) {
            cleanup();
        }
        if (setupNotifier) {
            setupNotifier.dispose();
        }
        computedNotifier.dispose();
    };
    output.subscribe = (subscriber) => {
        computedNotifier.subscribe(subscriber);
    };
    output.unsubscribe = (subscriber) => {
        computedNotifier.unsubscribe(subscriber);
    };
    return output;
}
