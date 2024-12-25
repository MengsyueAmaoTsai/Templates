import type { DOMPolicy } from "../dom.js";
import { Binding } from "../binding/binding.js";
import type { Expression } from "../observation/observable.js";
import { AddViewBehaviorFactory, CompiledViewBehaviorFactory, HTMLDirective, ViewBehaviorFactory } from "./html-directive.js";
import type { ElementView, HTMLView, SyntheticView } from "./view.js";
/**
 * A template capable of creating views specifically for rendering custom elements.
 * @public
 */
export interface ElementViewTemplate<TSource = any, TParent = any> {
    /**
     * Creates an ElementView instance based on this template definition.
     * @param hostBindingTarget - The element that host behaviors will be bound to.
     */
    create(hostBindingTarget: Element): ElementView<TSource, TParent>;
    /**
     * Creates an HTMLView from this template, binds it to the source, and then appends it to the host.
     * @param source - The data source to bind the template to.
     * @param host - The Element where the template will be rendered.
     * @param hostBindingTarget - An HTML element to target the host bindings at if different from the
     * host that the template is being attached to.
     */
    render(source: TSource, host: Node, hostBindingTarget?: Element): ElementView<TSource, TParent>;
}
export interface HydratableElementViewTemplate<TSource = any, TParent = any> extends ElementViewTemplate<TSource, TParent> {
    hydrate(firstChild: Node, lastChild: Node, hostBindingTarget?: Element): ElementView<TSource, TParent>;
}
/**
 * A marker interface used to capture types when interpolating Directive helpers
 * into templates.
 * @public
 */
export interface CaptureType<TSource, TParent> {
}
/**
 * A template capable of rendering views not specifically connected to custom elements.
 * @public
 */
export interface SyntheticViewTemplate<TSource = any, TParent = any> {
    /**
     * Creates a SyntheticView instance based on this template definition.
     */
    create(): SyntheticView<TSource, TParent>;
    /**
     * Returns a directive that can inline the template.
     */
    inline(): CaptureType<TSource, TParent>;
}
export interface HydratableSyntheticViewTemplate<TSource = any, TParent = any> extends SyntheticViewTemplate {
    hydrate(firstChild: Node, lastChild: Node): SyntheticView<TSource, TParent>;
}
/**
 * The result of a template compilation operation.
 * @public
 */
export interface HTMLTemplateCompilationResult<TSource = any, TParent = any> {
    /**
     * Creates a view instance.
     * @param hostBindingTarget - The host binding target for the view.
     */
    createView(hostBindingTarget?: Element): HTMLView<TSource, TParent>;
    readonly factories: CompiledViewBehaviorFactory[];
}
/**
 * Represents the types of values that can be interpolated into a template.
 * @public
 */
export declare type TemplateValue<TSource, TParent = any> = Expression<TSource, any, TParent> | Binding<TSource, any, TParent> | HTMLDirective | CaptureType<TSource, TParent>;
/**
 * Inlines a template into another template.
 * @public
 */
export declare class InlineTemplateDirective implements HTMLDirective {
    private html;
    private factories;
    /**
     * An empty template partial.
     */
    static readonly empty: InlineTemplateDirective;
    /**
     * Creates an instance of InlineTemplateDirective.
     * @param template - The template to inline.
     */
    constructor(html: string, factories?: Record<string, ViewBehaviorFactory>);
    /**
     * Creates HTML to be used within a template.
     * @param add - Can be used to add  behavior factories to a template.
     */
    createHTML(add: AddViewBehaviorFactory): string;
}
/**
 * A template capable of creating HTMLView instances or rendering directly to DOM.
 * @public
 */
export declare class ViewTemplate<TSource = any, TParent = any> implements ElementViewTemplate<TSource, TParent>, SyntheticViewTemplate<TSource, TParent> {
    private policy?;
    private result;
    /**
     * The html representing what this template will
     * instantiate, including placeholders for directives.
     */
    readonly html: string | HTMLTemplateElement;
    /**
     * The directives that will be connected to placeholders in the html.
     */
    readonly factories: Record<string, ViewBehaviorFactory>;
    /**
     * Creates an instance of ViewTemplate.
     * @param html - The html representing what this template will instantiate, including placeholders for directives.
     * @param factories - The directives that will be connected to placeholders in the html.
     * @param policy - The security policy to use when compiling this template.
     */
    constructor(html: string | HTMLTemplateElement, factories?: Record<string, ViewBehaviorFactory>, policy?: DOMPolicy | undefined);
    /**
     * @internal
     */
    compile(): HTMLTemplateCompilationResult<TSource, TParent>;
    /**
     * Creates an HTMLView instance based on this template definition.
     * @param hostBindingTarget - The element that host behaviors will be bound to.
     */
    create(hostBindingTarget?: Element): HTMLView<TSource, TParent>;
    /**
     * Returns a directive that can inline the template.
     */
    inline(): CaptureType<TSource, TParent>;
    /**
     * Sets the DOMPolicy for this template.
     * @param policy - The policy to associated with this template.
     * @returns The modified template instance.
     * @remarks
     * The DOMPolicy can only be set once for a template and cannot be
     * set after the template is compiled.
     */
    withPolicy(policy: DOMPolicy): this;
    /**
     * Creates an HTMLView from this template, binds it to the source, and then appends it to the host.
     * @param source - The data source to bind the template to.
     * @param host - The Element where the template will be rendered.
     * @param hostBindingTarget - An HTML element to target the host bindings at if different from the
     * host that the template is being attached to.
     */
    render(source: TSource, host: Node, hostBindingTarget?: Element): HTMLView<TSource, TParent>;
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
    static create<TSource = any, TParent = any>(strings: string[], values: TemplateValue<TSource, TParent>[], policy?: DOMPolicy): ViewTemplate<TSource, TParent>;
}
/**
 * Transforms a template literal string into a ViewTemplate.
 * @param strings - The string fragments that are interpolated with the values.
 * @param values - The values that are interpolated with the string fragments.
 * @remarks
 * The html helper supports interpolation of strings, numbers, binding expressions,
 * other template instances, and Directive instances.
 * @public
 */
export declare type HTMLTemplateTag = (<TSource = any, TParent = any>(strings: TemplateStringsArray, ...values: TemplateValue<TSource, TParent>[]) => ViewTemplate<TSource, TParent>) & {
    /**
     * Transforms a template literal string into partial HTML.
     * @param html - The HTML string fragment to interpolate.
     * @public
     */
    partial(html: string): InlineTemplateDirective;
};
/**
 * Transforms a template literal string into a ViewTemplate.
 * @param strings - The string fragments that are interpolated with the values.
 * @param values - The values that are interpolated with the string fragments.
 * @remarks
 * The html helper supports interpolation of strings, numbers, binding expressions,
 * other template instances, and Directive instances.
 * @public
 */
export declare const html: HTMLTemplateTag;
