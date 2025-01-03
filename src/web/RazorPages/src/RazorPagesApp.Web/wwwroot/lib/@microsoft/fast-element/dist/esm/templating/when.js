import { isFunction } from "../interfaces.js";
const noTemplate = () => null;
function normalizeBinding(value) {
    return value === undefined ? noTemplate : isFunction(value) ? value : () => value;
}
/**
 * A directive that enables basic conditional rendering in a template.
 * @param condition - The condition to test for rendering.
 * @param templateOrTemplateBinding - The template or a binding that gets
 * the template to render when the condition is true.
 * @param elseTemplateOrTemplateBinding - Optional template or binding that that
 * gets the template to render when the conditional is false.
 * @public
 */
export function when(condition, templateOrTemplateBinding, elseTemplateOrTemplateBinding) {
    const dataBinding = isFunction(condition) ? condition : () => condition;
    const templateBinding = normalizeBinding(templateOrTemplateBinding);
    const elseBinding = normalizeBinding(elseTemplateOrTemplateBinding);
    return (source, context) => dataBinding(source, context)
        ? templateBinding(source, context)
        : elseBinding(source, context);
}
