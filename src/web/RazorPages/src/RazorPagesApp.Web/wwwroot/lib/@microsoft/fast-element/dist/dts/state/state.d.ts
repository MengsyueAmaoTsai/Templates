import { Disposable } from "../interfaces.js";
import type { Subscriber } from "../observation/notifier.js";
/**
 * Options for creating state.
 * @beta
 */
export declare type StateOptions = {
    /**
     * Indicates whether to deeply make the state value observable.
     */
    deep?: boolean;
    /**
     * A friendly name for the state.
     */
    name?: string;
};
/**
 * A readonly stateful value.
 * @beta
 */
export declare type ReadonlyState<T> = {
    /**
     * Gets the current state value.
     */
    (): T;
    /**
     * Gets the current state value.
     */
    readonly current: T;
};
/**
 * A read/write stateful value.
 * @beta
 */
export declare type State<T> = ReadonlyState<T> & {
    /**
     * Gets or sets the current state value.
     */
    current: T;
    /**
     * Sets the current state value.
     * @param value The new state value.
     */
    set(value: T): void;
    /**
     * Creates a readonly version of the state.
     */
    asReadonly(): ReadonlyState<T>;
};
/**
 * Creates a reactive state value.
 * @param value - The initial state value.
 * @param options - Options to customize the state or a friendly name.
 * @returns A State instance.
 * @beta
 */
export declare function state<T>(value: T, options?: string | StateOptions): State<T>;
/**
 * A readonly stateful value associated with an object owner.
 * @beta
 */
export declare type ReadonlyOwnedState<T> = {
    /**
     * Gets the current stateful value for the owner.
     */
    (owner: any): T;
};
/**
 * A read/write stateful value associated with an owner.
 * @beta
 */
export declare type OwnedState<T> = ReadonlyOwnedState<T> & {
    /**
     * Sets
     * @param owner - The object to set the state for the owner.
     * @param value - The new state value.
     */
    set(owner: any, value: T): void;
    /**
     * Creates a readonly version of the state.
     */
    asReadonly(): ReadonlyOwnedState<T>;
};
/**
 * Creates a reactive state that has its value associated with a specific owner.
 * @param value - The initial value or a factory that provides an initial value for each owner.
 * @param options - Options to customize the state or a friendly name.
 * @returns An OwnedState instance.
 * @beta
 */
export declare function ownedState<T>(value: T | (() => T), options?: string | StateOptions): OwnedState<T>;
/**
 * State whose value is computed from other dependencies.
 * @beta
 */
export declare type ComputedState<T> = ReadonlyState<T> & Disposable & {
    /**
     * Subscribes to notification of changes in the state.
     * @param subscriber - The object that is subscribing for change notification.
     */
    subscribe(subscriber: Subscriber): void;
    /**
     * Unsubscribes from notification of changes in the state.
     * @param subscriber - The object that is unsubscribing from change notification.
     */
    unsubscribe(subscriber: Subscriber): void;
};
/**
 * A callback that enables computation setup.
 * @beta
 */
export declare type ComputedSetupCallback = () => (() => void) | void;
/**
 * Provides computed state capabilities.
 * @beta
 */
export declare type ComputedBuilder = {
    /**
     * Callbacks related to computed state.
     */
    on: {
        /**
         * Provides a setup callback for the computation.
         * @param callback The callback to run to setup the computation.
         */
        setup(callback: ComputedSetupCallback): void;
    };
};
/**
 * A callback that initializes the computation.
 * @beta
 */
export declare type ComputedInitializer<T> = (builder: ComputedBuilder) => () => T;
/**
 * Creates a ComputedState.
 * @param initialize - The initialization callback.
 * @param name - A friendly name for this computation.
 * @returns A ComputedState
 * @beta
 */
export declare function computedState<T>(initialize: ComputedInitializer<T>, name?: string): ComputedState<T>;
