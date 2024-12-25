import type { Expression } from "../observation/observable.js";
import { Binding } from "./binding.js";
/**
 * Normalizes the input value into a binding.
 * @param value - The value to create the default binding for.
 * @returns A binding configuration for the provided value.
 * @public
 */
export declare function normalizeBinding<TSource = any, TReturn = any, TParent = any>(value: Expression<TSource, TReturn, TParent> | Binding<TSource, TReturn, TParent> | {}): Binding<TSource, TReturn, TParent>;
