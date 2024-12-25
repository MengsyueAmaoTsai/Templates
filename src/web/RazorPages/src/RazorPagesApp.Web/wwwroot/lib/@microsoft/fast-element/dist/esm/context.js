import "./interfaces.js";
import { Metadata } from "./metadata.js";
import { FAST } from "./platform.js";
const contextsByName = new Map();
const contextEventType = "context-request";
let requestStrategy;
/**
 * Enables using:
 * {@link https://github.com/webcomponents-cg/community-protocols/blob/main/proposals/context.md | W3C Community Context protocol.}
 * @public
 */
export const Context = Object.freeze({
    /**
     * The event type used for W3C Context Protocol requests.
     */
    eventType: contextEventType,
    /**
     * Returns a FASTContext object from the global context registry matching the given name if found.
     * Otherwise, returns a new FASTContext with this name.
     * @param name - The name of the FASTContext to get or create.
     * @returns A FASTContext object.
     */
    for(name) {
        let c = contextsByName.get(name);
        if (c === void 0) {
            c = Context.create(name);
            contextsByName.set(name, c);
        }
        return c;
    },
    /**
     * Creates a W3C Community Protocol-based Context object to use in requesting/providing
     * context through the DOM.
     * @param name - The name to use for the connext. Useful in debugging.
     * @param initialValue - An optional initial value to use if a context handler isn't found.
     */
    create(name, initialValue) {
        const Interface = function (target, property, index) {
            if (target == null || new.target !== undefined) {
                throw FAST.error(1501 /* Message.noRegistrationForContext */, {
                    name: Interface.name,
                });
            }
            if (property) {
                Context.defineProperty(target, property, Interface);
            }
            else {
                const types = Metadata.getOrCreateAnnotationParamTypes(target);
                types[index] = Interface;
            }
        };
        Interface.$isInterface = true;
        Interface.initialValue = initialValue;
        Reflect.defineProperty(Interface, "name", { value: name });
        Interface.handle = (target, callback) => Context.handle(target, callback, Interface);
        Interface.provide = (target, value) => Context.provide(target, Interface, value);
        Interface.get = (target) => Context.get(target, Interface);
        Interface.request = (target, callback, multiple) => Context.request(target, Interface, callback, multiple);
        Interface.toString = () => `Context<${Interface.name}>`;
        return Interface;
    },
    /**
     * Sets the strategy used by all FAST-specific context requests made through the
     * Context.request, Context.get, Context.defineProperty, and ContextDecorator APIs.
     * @param strategy - The strategy to use. By default, the strategy is Context.dispatch.
     */
    setDefaultRequestStrategy(strategy) {
        requestStrategy = strategy;
    },
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
    get(target, context) {
        var _a;
        let value;
        requestStrategy(target, context, found => (value = found), false);
        return (_a = value) !== null && _a !== void 0 ? _a : context.initialValue;
    },
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
    request(target, context, callback, multiple = false) {
        requestStrategy(target, context, callback, multiple);
    },
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
    dispatch(target, context, callback, multiple = false) {
        target.dispatchEvent(new ContextEvent(context, callback, multiple));
    },
    /**
     * Enables an event target to provide a context value.
     * @param target The target to provide the context value for.
     * @param context The context to provide the value for.
     * @param value The value to provide for the context.
     */
    provide(target, context, value) {
        Context.handle(target, (event) => {
            event.stopImmediatePropagation();
            event.callback(value);
        }, context);
    },
    /**
     *
     * @param target - The target on which to handle context requests.
     * @param callback - The callback to invoke when a context request is received.
     * @param context - The context to handle requests for.
     * @remarks
     * If a context is not provided then the callback will be invoked for all context
     * requests that are received on the target.
     */
    handle(target, callback, context) {
        if (context) {
            target.addEventListener(contextEventType, (event) => {
                if (event.context === context) {
                    callback(event);
                }
            });
        }
        else {
            target.addEventListener(contextEventType, callback);
        }
    },
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
    defineProperty(target, propertyName, context) {
        const field = Symbol.for(`fast:di:${propertyName}`);
        Reflect.defineProperty(target, propertyName, {
            get: function () {
                var _a;
                return (_a = this[field]) !== null && _a !== void 0 ? _a : (this[field] = Context.get(this, context));
            },
        });
    },
});
Context.setDefaultRequestStrategy(Context.dispatch);
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
export class ContextEvent extends Event {
    constructor(context, callback, multiple) {
        super(contextEventType, { bubbles: true, composed: true });
        this.context = context;
        this.callback = callback;
        this.multiple = multiple;
    }
}
