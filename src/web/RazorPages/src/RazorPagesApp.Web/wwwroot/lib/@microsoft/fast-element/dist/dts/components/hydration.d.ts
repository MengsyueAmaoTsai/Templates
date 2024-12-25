import type { ContentTemplate, HydratableContentTemplate } from "../templating/html-binding-directive.js";
import type { ViewController } from "../templating/html-directive.js";
import type { ElementViewTemplate, HydratableElementViewTemplate, HydratableSyntheticViewTemplate, SyntheticViewTemplate } from "../templating/template.js";
import type { HydrationView } from "../templating/view.js";
/**
 * Markup utilities to aid in template hydration.
 * @internal
 */
export declare const HydrationMarkup: Readonly<{
    attributeMarkerName: "data-fe-b";
    attributeBindingSeparator: " ";
    contentBindingStartMarker(index: number, uniqueId: string): string;
    contentBindingEndMarker(index: number, uniqueId: string): string;
    repeatStartMarker(index: number): string;
    repeatEndMarker(index: number): string;
    isContentBindingStartMarker(content: string): boolean;
    isContentBindingEndMarker(content: string): boolean;
    isRepeatViewStartMarker(content: string): boolean;
    isRepeatViewEndMarker(content: string): boolean;
    isElementBoundaryStartMarker(node: Node): boolean;
    isElementBoundaryEndMarker(node: Node): boolean;
    /**
     * Returns the indexes of the ViewBehaviorFactories affecting
     * attributes for the element, or null if no factories were found.
     */
    parseAttributeBinding(node: Element): null | number[];
    /**
     * Parses the ViewBehaviorFactory index from string data. Returns
     * the binding index or null if the index cannot be retrieved.
     */
    parseContentBindingStartMarker(content: string): null | [index: number, id: string];
    parseContentBindingEndMarker(content: string): null | [index: number, id: string];
    /**
     * Parses the index of a repeat directive from a content string.
     */
    parseRepeatStartMarker(content: string): null | number;
    parseRepeatEndMarker(content: string): null | number;
    /**
     * Parses element Id from element boundary markers
     */
    parseElementBoundaryStartMarker(content: string): null | string;
    parseElementBoundaryEndMarker(content: string): null | string;
}>;
/**
 * @internal
 */
export declare const Hydratable: unique symbol;
/**
 * Tests if a template or ViewController is hydratable.
 *
 * @beta
 */
export declare function isHydratable(view: ViewController): view is HydrationView;
export declare function isHydratable<TSource = any, TParent = any>(template: SyntheticViewTemplate<TSource, TParent>): template is HydratableSyntheticViewTemplate<TSource, TParent>;
export declare function isHydratable<TSource = any, TParent = any>(template: ElementViewTemplate<TSource, TParent>): template is HydratableElementViewTemplate<TSource, TParent>;
export declare function isHydratable(template: ContentTemplate): template is HydratableContentTemplate;
