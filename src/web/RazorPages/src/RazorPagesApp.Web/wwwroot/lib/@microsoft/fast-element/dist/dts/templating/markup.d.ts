import type { ViewBehaviorFactory } from "./html-directive.js";
/** @internal */
export declare const nextId: () => string;
/**
 * Common APIs related to markup generation.
 * @public
 */
export declare const Markup: Readonly<{
    /**
     * Creates a placeholder string suitable for marking out a location *within*
     * an attribute value or HTML content.
     * @param index - The directive index to create the placeholder for.
     * @remarks
     * Used internally by binding directives.
     */
    interpolation: (id: string) => string;
    /**
     * Creates a placeholder that manifests itself as an attribute on an
     * element.
     * @param attributeName - The name of the custom attribute.
     * @param index - The directive index to create the placeholder for.
     * @remarks
     * Used internally by attribute directives such as `ref`, `slotted`, and `children`.
     */
    attribute: (id: string) => string;
    /**
     * Creates a placeholder that manifests itself as a marker within the DOM structure.
     * @param index - The directive index to create the placeholder for.
     * @remarks
     * Used internally by structural directives such as `repeat`.
     */
    comment: (id: string) => string;
}>;
/**
 * Common APIs related to content parsing.
 * @public
 */
export declare const Parser: Readonly<{
    /**
     * Parses text content or HTML attribute content, separating out the static strings
     * from the directives.
     * @param value - The content or attribute string to parse.
     * @param factories - A list of directives to search for in the string.
     * @returns A heterogeneous array of static strings interspersed with
     * directives or null if no directives are found in the string.
     */
    parse(value: string, factories: Record<string, ViewBehaviorFactory>): (string | ViewBehaviorFactory)[] | null;
}>;
