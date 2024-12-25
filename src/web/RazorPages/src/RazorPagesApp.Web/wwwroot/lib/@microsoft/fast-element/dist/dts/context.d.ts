import { Constructable, ParameterDecorator } from "./interfaces.js";
/**
 * A Context object defines an optional initial value for a Context, as well as a name identifier for debugging purposes.
 * @public
 */
export declare type Context<T> = {
    readonly name: string;
    readonly initialValue?: T;
};
/**
 * A constant key that can be used to represent a Context dependency.
 * The key can be used for context or DI but also doubles as a decorator for
 * resolving the associated dependency.
 * @public
 */
export declare type ContextDecorator<T = any> = Readonly<Context<T>> & PropertyDecorator & ParameterDecorator;
/**
 * A Context object defines an optional initial value for a Context, as well as a name identifier for debugging purposes.
 * The FASTContext can also be used as a decorator to declare context dependencies or as a key for DI.
 * @public
 */
export declare type FASTContext<T> = ContextDecorator<T> & {
    get(target: EventTarget): T;
    provide(target: EventTarget, value: T): void;
    request(target: EventTarget, callback: ContextCallback<T>, multiple?: boolean): void;
    handle(target: EventTarget, callback: (event: ContextEvent<FASTContext<T>>) => void): void;
};
/**
 * A strategy that controls how all Context.request API calls are handled.
 * @remarks
 * By default this is handled via Context.dispatch, which dispatches a ContextEvent.
 * @public
 */
export declare type FASTContextRequestStrategy = <T extends UnknownContext>(target: EventTarget, context: T, callback: ContextCallback<ContextType<T>>, multiple: any) => void;
declare const contextEventType = "context-request";
/**
 * Enables using:
 * {@link https://github.com/webcomponents-cg/community-protocols/blob/main/proposals/context.md | W3C Community Context protocol.}
 * @public
 */
export declare const Context: Readonly<{
    /**
     * The event type used for W3C Context Protocol requests.
     */
    eventType: "context-request";
    /**
     * Returns a FASTContext object from the global context registry matching the given name if found.
     * Otherwise, returns a new FASTContext with this name.
     * @param name - The name of the FASTContext to get or create.
     * @returns A FASTContext object.
     */
    for<T = unknown>(name: string): FASTContext<T>;
    /**
     * Creates a W3C Community Protocol-based Context object to use in requesting/providing
     * context through the DOM.
     * @param name - The name to use for the connext. Useful in debugging.
     * @param initialValue - An optional initial value to use if a context handler isn't found.
     */
    create<T_1 = unknown>(name: string, initialValue?: T_1 | undefined): FASTContext<T_1>;
    /**
     * Sets the strategy used by all FAST-specific context requests made through the
     * Context.request, Context.get, Context.defineProperty, and ContextDecorator APIs.
     * @param strategy - The strategy to use. By default, the strategy is Context.dispatch.
     */
    setDefaultRequestStrategy(strategy: FASTContextRequestStrategy): void;
    /**
     * Gets the context value for the target node or returns the initial value if
     * a context handler is not found.
     * @param target - The target to get the context for.
     * @param context - The context to locate.
     * @returns The context value.
     * @remarks
     * Uses the default request strategy to locate the context. If no context is found
     * then the initial value of the context is returned.
     */
    get<T_2 extends UnknownContext>(target: EventTarget, context: T_2): ContextType<T_2>;
    /**
     * Requests the context value for the target node.
     * @param target - The target to request the context for.
     * @param context - The context to locate.
     * @param callback - A callback to invoke with the context value.
     * @param multiple - Whether the context requestor expects to handle updates
     * to the context value after the initial request.
     * @remarks
     * Uses the default request strategy to locate the context.
     */
    request<T_3 extends UnknownContext>(target: EventTarget, context: T_3, callback: ContextCallback<ContextType<T_3>>, multiple?: boolean): void;
    /**
     *
     * @param target - The target to dispatch the context event on.
     * @param context - The context to locate.
     * @param callback - The callback to invoke with the context value.
     * @param multiple - Whether the context requestor expects to handle updates
     * to the context value after the initial request.
     * @remarks
     * This API does NOT use the default request strategy. It always dispatches
     * an event through the DOM.
     */
    dispatch<T_4 extends UnknownContext>(target: EventTarget, context: T_4, callback: ContextCallback<ContextType<T_4>>, multiple?: boolean): void;
    /**
     * Enables an event target to provide a context value.
     * @param target The target to provide the context value for.
     * @param context The context to provide the value for.
     * @param value The value to provide for the context.
     */
    provide<T_5 extends UnknownContext>(target: EventTarget, context: T_5, value: ContextType<T_5>): void;
    /**
     *
     * @param target - The target on which to handle context requests.
     * @param callback - The callback to invoke when a context request is received.
     * @param context - The context to handle requests for.
     * @remarks
     * If a context is not provided then the callback will be invoked for all context
     * requests that are received on the target.
     */
    handle<T_6 extends UnknownContext>(target: EventTarget, callback: (event: ContextEvent<T_6>) => void, context?: T_6 | undefined): void;
    /**
     * Defines a getter-only property on the target that will return the context
     * value for the target.
     * @param target The target to define the property on.
     * @param propertyName The name of the property to define.
     * @param context The context that will be used to retrieve the property value.
     * @remarks
     * Uses the default request strategy to locate the context and will return the
     * initialValue if the context isn't handled.
     */
    defineProperty<T_7 extends UnknownContext>(target: Constructable<EventTarget> | EventTarget, propertyName: string, context: T_7): void;
}>;
/**
 * An unknown context type.
 * @public
 */
export declare type UnknownContext = Context<unknown>;
/**
 * A helper type which can extract a Context value type from a Context type
 * @public
 */
export declare type ContextType<T extends UnknownContext> = T extends Context<infer Y> ? Y : never;
/**
 * A callback which is provided by a context requester and is called with the value satisfying the request.
 * This callback can be called multiple times by context providers as the requested value is changed.
 * @public
 */
export declare type ContextCallback<ValueType> = (value: ValueType, dispose?: () => void) => void;
/**
 * An event fired by a context requester to signal it desires a named context.
 *
 * A provider should inspect the `context` property of the event to determine if it has a value that can
 * satisfy the request, calling the `callback` with the requested value if so.
 *
 * If the requested context event contains a truthy `multiple` value, then a provider can call the callback
 * multiple times if the value is changed, if this is the case the provider should pass a `dispose`
 * method to the callback which requesters can invoke to indicate they no longer wish to receive these updates.
 * @public
 */
export declare class ContextEvent<T extends UnknownContext> extends Event {
    readonly context: T;
    readonly callback: ContextCallback<ContextType<T>>;
    readonly multiple?: boolean | undefined;
    constructor(context: T, callback: ContextCallback<ContextType<T>>, multiple?: boolean | undefined);
}
declare global {
    interface HTMLElementEventMap {
        /**
         * A 'context-request' event can be emitted by any element which desires
         * a context value to be injected by an external provider.
         */
        [contextEventType]: ContextEvent<UnknownContext>;
    }
}
export {};
