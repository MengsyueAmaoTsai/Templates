import type { Expression } from "../observation/observable.js";
import { Binding } from "../binding/binding.js";
import { CSSDirective } from "./css-directive.js";
import { ComposableStyles, ElementStyles } from "./element-styles.js";
/**
 * Represents the types of values that can be interpolated into a template.
 * @public
 */
export declare type CSSValue<TSource, TParent = any> = Expression<TSource, any, TParent> | Binding<TSource, any, TParent> | ComposableStyles | CSSDirective;
/**
 * Transforms a template literal string into styles.
 * @param strings - The string fragments that are interpolated with the values.
 * @param values - The values that are interpolated with the string fragments.
 * @remarks
 * The css helper supports interpolation of strings and ElementStyle instances.
 * Use the .partial method to create partial CSS fragments.
 * @public
 */
export declare type CSSTemplateTag = (<TSource = any, TParent = any>(strings: TemplateStringsArray, ...values: CSSValue<TSource, TParent>[]) => ElementStyles) & {
    /**
     * Transforms a template literal string into partial CSS.
     * @param strings - The string fragments that are interpolated with the values.
     * @param values - The values that are interpolated with the string fragments.
     * @public
     */
    partial<TSource = any, TParent = any>(strings: TemplateStringsArray, ...values: CSSValue<TSource, TParent>[]): CSSDirective;
};
/**
 * Transforms a template literal string into styles.
 * @param strings - The string fragments that are interpolated with the values.
 * @param values - The values that are interpolated with the string fragments.
 * @remarks
 * The css helper supports interpolation of strings and ElementStyle instances.
 * @public
 */
export declare const css: CSSTemplateTag;
