import type { DOMPolicy } from "../dom.js";
import { Expression } from "../observation/observable.js";
import { Binding } from "./binding.js";
/**
 * Creates an standard binding.
 * @param expression - The binding to refresh when changed.
 * @param policy - The security policy to associate with th binding.
 * @param isVolatile - Indicates whether the binding is volatile or not.
 * @returns A binding configuration.
 * @public
 */
export declare function oneWay<T = any>(expression: Expression<T>, policy?: DOMPolicy, isVolatile?: boolean): Binding<T>;
/**
 * Creates an event listener binding.
 * @param expression - The binding to invoke when the event is raised.
 * @param options - Event listener options.
 * @returns A binding configuration.
 * @public
 */
export declare function listener<T = any>(expression: Expression<T>, options?: AddEventListenerOptions): Binding<T>;
