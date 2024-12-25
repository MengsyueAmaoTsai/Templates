import type { Expression } from "../observation/observable.js";
import type { Subscriber } from "../observation/notifier.js";
import type { DOMPolicy } from "../dom.js";
import { Binding } from "./binding.js";
/**
 * The gateway to signal APIs.
 * @public
 */
export declare const Signal: Readonly<{
    /**
     * Subscribes to a signal.
     * @param signal The signal to subscribe to.
     * @param subscriber The subscriber.
     */
    subscribe(signal: string, subscriber: Subscriber): void;
    /**
     * Unsubscribes from the signal.
     * @param signal The signal to unsubscribe from.
     * @param subscriber The subscriber.
     */
    unsubscribe(signal: string, subscriber: Subscriber): void;
    /**
     * Sends the specified signal to subscribers.
     * @param signal - The signal to send.
     */
    send(signal: string): void;
}>;
/**
 * Creates a signal binding configuration with the supplied options.
 * @param expression - The binding to refresh when signaled.
 * @param options - The signal name or a binding to use to retrieve the signal name.
 * @param policy - The security policy to associate with th binding.
 * @returns A binding configuration.
 * @public
 */
export declare function signal<T = any>(expression: Expression<T>, options: string | Expression<T>, policy?: DOMPolicy): Binding<T>;
