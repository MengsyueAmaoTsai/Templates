import type { DOMPolicy } from "../dom.js";
import type { Expression } from "../observation/observable.js";
import { Binding } from "./binding.js";
/**
 * Creates a one time binding
 * @param expression - The binding to refresh when signaled.
 * @param policy - The security policy to associate with th binding.
 * @returns A binding configuration.
 * @public
 */
export declare function oneTime<T = any>(expression: Expression<T>, policy?: DOMPolicy): Binding<T>;
