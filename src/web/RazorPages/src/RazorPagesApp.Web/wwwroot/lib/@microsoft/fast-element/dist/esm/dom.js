import "./interfaces.js";
import { FAST } from "./platform.js";
/**
 * The type of HTML aspect to target.
 * @public
 */
export const DOMAspect = Object.freeze({
    /**
     * Not aspected.
     */
    none: 0,
    /**
     * An attribute.
     */
    attribute: 1,
    /**
     * A boolean attribute.
     */
    booleanAttribute: 2,
    /**
     * A property.
     */
    property: 3,
    /**
     * Content
     */
    content: 4,
    /**
     * A token list.
     */
    tokenList: 5,
    /**
     * An event.
     */
    event: 6,
});
const createHTML = html => html;
const fastTrustedType = globalThis.trustedTypes
    ? globalThis.trustedTypes.createPolicy("fast-html", { createHTML })
    : { createHTML };
let defaultPolicy = Object.freeze({
    createHTML(value) {
        return fastTrustedType.createHTML(value);
    },
    protect(tagName, aspect, aspectName, sink) {
        return sink;
    },
});
const fastPolicy = defaultPolicy;
/**
 * Common DOM APIs.
 * @public
 */
export const DOM = Object.freeze({
    /**
     * Gets the dom policy used by the templating system.
     */
    get policy() {
        return defaultPolicy;
    },
    /**
     * Sets the dom policy used by the templating system.
     * @param policy - The policy to set.
     * @remarks
     * This API can only be called once, for security reasons. It should be
     * called by the application developer at the start of their program.
     */
    setPolicy(value) {
        if (defaultPolicy !== fastPolicy) {
            throw FAST.error(1201 /* Message.onlySetDOMPolicyOnce */);
        }
        defaultPolicy = value;
    },
    /**
     * Sets an attribute value on an element.
     * @param element - The element to set the attribute value on.
     * @param attributeName - The attribute name to set.
     * @param value - The value of the attribute to set.
     * @remarks
     * If the value is `null` or `undefined`, the attribute is removed, otherwise
     * it is set to the provided value using the standard `setAttribute` API.
     */
    setAttribute(element, attributeName, value) {
        value === null || value === undefined
            ? element.removeAttribute(attributeName)
            : element.setAttribute(attributeName, value);
    },
    /**
     * Sets a boolean attribute value.
     * @param element - The element to set the boolean attribute value on.
     * @param attributeName - The attribute name to set.
     * @param value - The value of the attribute to set.
     * @remarks
     * If the value is true, the attribute is added; otherwise it is removed.
     */
    setBooleanAttribute(element, attributeName, value) {
        value
            ? element.setAttribute(attributeName, "")
            : element.removeAttribute(attributeName);
    },
});
