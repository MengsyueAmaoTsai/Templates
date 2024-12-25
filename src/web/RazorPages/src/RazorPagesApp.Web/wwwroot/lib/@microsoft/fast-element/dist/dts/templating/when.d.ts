import type { Expression } from "../observation/observable.js";
import type { CaptureType, SyntheticViewTemplate } from "./template.js";
/**
 * A directive that enables basic conditional rendering in a template.
 * @param condition - The condition to test for rendering.
 * @param templateOrTemplateBinding - The template or a binding that gets
 * the template to render when the condition is true.
 * @param elseTemplateOrTemplateBinding - Optional template or binding that that
 * gets the template to render when the conditional is false.
 * @public
 */
export declare function when<TSource = any, TReturn = any, TParent = any>(condition: Expression<TSource, TReturn, TParent> | boolean, templateOrTemplateBinding: SyntheticViewTemplate<TSource, TParent> | Expression<TSource, SyntheticViewTemplate<TSource, TParent>, TParent>, elseTemplateOrTemplateBinding?: SyntheticViewTemplate<TSource, TParent> | Expression<TSource, SyntheticViewTemplate<TSource, TParent>, TParent>): CaptureType<TSource, TParent>;
