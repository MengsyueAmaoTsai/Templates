import { isFunction, isString } from "../interfaces.js";
import { Binding } from "../binding/binding.js";
import { FAST, makeSerializationNoop } from "../platform.js";
import { oneWay } from "../binding/one-way.js";
import { oneTime } from "../binding/one-time.js";
import { HTMLBindingDirective } from "./html-binding-directive.js";
import { Compiler } from "./compiler.js";
import { HTMLDirective, } from "./html-directive.js";
import { nextId } from "./markup.js";
// Much thanks to LitHTML for working this out!
const lastAttributeNameRegex = 
/* eslint-disable-next-line no-control-regex, max-len */
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
const noFactories = Object.create(null);
/**
 * Inlines a template into another template.
 * @public
 */
export class InlineTemplateDirective {
    /**
     * Creates an instance of InlineTemplateDirective.
     * @param template - The template to inline.
     */
    constructor(html, factories = noFactories) {
        this.html = html;
        this.factories = factories;
    }
    /**
     * Creates HTML to be used within a template.
     * @param add - Can be used to add  behavior factories to a template.
     */
    createHTML(add) {
        const factories = this.factories;
        for (const key in factories) {
            add(factories[key]);
        }
        return this.html;
    }
}
/**
 * An empty template partial.
 */
InlineTemplateDirective.empty = new InlineTemplateDirective("");
HTMLDirective.define(InlineTemplateDirective);
function createHTML(value, prevString, add, definition = HTMLDirective.getForInstance(value)) {
    if (definition.aspected) {
        const match = lastAttributeNameRegex.exec(prevString);
        if (match !== null) {
            HTMLDirective.assignAspect(value, match[2]);
        }
    }
    return value.createHTML(add);
}
/**
 * A template capable of creating HTMLView instances or rendering directly to DOM.
 * @public
 */
export class ViewTemplate {
    /**
     * Creates an instance of ViewTemplate.
     * @param html - The html representing what this template will instantiate, including placeholders for directives.
     * @param factories - The directives that will be connected to placeholders in the html.
     * @param policy - The security policy to use when compiling this template.
     */
    constructor(html, factories = {}, policy) {
        this.policy = policy;
        this.result = null;
        this.html = html;
        this.factories = factories;
    }
    /**
     * @internal
     */
    compile() {
        if (this.result === null) {
            this.result = Compiler.compile(this.html, this.factories, this.policy);
        }
        return this.result;
    }
    /**
     * Creates an HTMLView instance based on this template definition.
     * @param hostBindingTarget - The element that host behaviors will be bound to.
     */
    create(hostBindingTarget) {
        return this.compile().createView(hostBindingTarget);
    }
    /**
     * Returns a directive that can inline the template.
     */
    inline() {
        return new InlineTemplateDirective(isString(this.html) ? this.html : this.html.innerHTML, this.factories);
    }
    /**
     * Sets the DOMPolicy for this template.
     * @param policy - The policy to associated with this template.
     * @returns The modified template instance.
     * @remarks
     * The DOMPolicy can only be set once for a template and cannot be
     * set after the template is compiled.
     */
    withPolicy(policy) {
        if (this.result) {
            throw FAST.error(1208 /* Message.cannotSetTemplatePolicyAfterCompilation */);
        }
        if (this.policy) {
            throw FAST.error(1207 /* Message.onlySetTemplatePolicyOnce */);
        }
        this.policy = policy;
        return this;
    }
    /**
     * Creates an HTMLView from this template, binds it to the source, and then appends it to the host.
     * @param source - The data source to bind the template to.
     * @param host - The Element where the template will be rendered.
     * @param hostBindingTarget - An HTML element to target the host bindings at if different from the
     * host that the template is being attached to.
     */
    render(source, host, hostBindingTarget) {
        const view = this.create(hostBindingTarget);
        view.bind(source);
        view.appendTo(host);
        return view;
    }
    /**
     * Creates a template based on a set of static strings and dynamic values.
     * @param strings - The static strings to create the template with.
     * @param values - The dynamic values to create the template with.
     * @param policy - The DOMPolicy to associated with the template.
     * @returns A ViewTemplate.
     * @remarks
     * This API should not be used directly under normal circumstances because constructing
     * a template in this way, if not done properly, can open up the application to XSS
     * attacks. When using this API, provide a strong DOMPolicy that can properly sanitize
     * and also be sure to manually sanitize all static strings particularly if they can
     * come from user input.
     */
    static create(strings, values, policy) {
        let html = "";
        const factories = Object.create(null);
        const add = (factory) => {
            var _a;
            const id = (_a = factory.id) !== null && _a !== void 0 ? _a : (factory.id = nextId());
            factories[id] = factory;
            return id;
        };
        for (let i = 0, ii = strings.length - 1; i < ii; ++i) {
            const currentString = strings[i];
            let currentValue = values[i];
            let definition;
            html += currentString;
            if (isFunction(currentValue)) {
                currentValue = new HTMLBindingDirective(oneWay(currentValue));
            }
            else if (currentValue instanceof Binding) {
                currentValue = new HTMLBindingDirective(currentValue);
            }
            else if (!(definition = HTMLDirective.getForInstance(currentValue))) {
                const staticValue = currentValue;
                currentValue = new HTMLBindingDirective(oneTime(() => staticValue));
            }
            html += createHTML(currentValue, currentString, add, definition);
        }
        return new ViewTemplate(html + strings[strings.length - 1], factories, policy);
    }
}
makeSerializationNoop(ViewTemplate);
/**
 * Transforms a template literal string into a ViewTemplate.
 * @param strings - The string fragments that are interpolated with the values.
 * @param values - The values that are interpolated with the string fragments.
 * @remarks
 * The html helper supports interpolation of strings, numbers, binding expressions,
 * other template instances, and Directive instances.
 * @public
 */
export const html = ((strings, ...values) => {
    if (Array.isArray(strings) && Array.isArray(strings.raw)) {
        return ViewTemplate.create(strings, values);
    }
    throw FAST.error(1206 /* Message.directCallToHTMLTagNotAllowed */);
});
html.partial = (html) => {
    return new InlineTemplateDirective(html);
};
