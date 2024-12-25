const bindingStartMarker = /fe-b\$\$start\$\$(\d+)\$\$(.+)\$\$fe-b/;
const bindingEndMarker = /fe-b\$\$end\$\$(\d+)\$\$(.+)\$\$fe-b/;
const repeatViewStartMarker = /fe-repeat\$\$start\$\$(\d+)\$\$fe-repeat/;
const repeatViewEndMarker = /fe-repeat\$\$end\$\$(\d+)\$\$fe-repeat/;
const elementBoundaryStartMarker = /^(?:.{0,1000})fe-eb\$\$start\$\$(.+?)\$\$fe-eb/;
const elementBoundaryEndMarker = /fe-eb\$\$end\$\$(.{0,1000})\$\$fe-eb(?:.{0,1000})$/;
function isComment(node) {
    return node && node.nodeType === Node.COMMENT_NODE;
}
/**
 * Markup utilities to aid in template hydration.
 * @internal
 */
export const HydrationMarkup = Object.freeze({
    attributeMarkerName: "data-fe-b",
    attributeBindingSeparator: " ",
    contentBindingStartMarker(index, uniqueId) {
        return `fe-b$$start$$${index}$$${uniqueId}$$fe-b`;
    },
    contentBindingEndMarker(index, uniqueId) {
        return `fe-b$$end$$${index}$$${uniqueId}$$fe-b`;
    },
    repeatStartMarker(index) {
        return `fe-repeat$$start$$${index}$$fe-repeat`;
    },
    repeatEndMarker(index) {
        return `fe-repeat$$end$$${index}$$fe-repeat`;
    },
    isContentBindingStartMarker(content) {
        return bindingStartMarker.test(content);
    },
    isContentBindingEndMarker(content) {
        return bindingEndMarker.test(content);
    },
    isRepeatViewStartMarker(content) {
        return repeatViewStartMarker.test(content);
    },
    isRepeatViewEndMarker(content) {
        return repeatViewEndMarker.test(content);
    },
    isElementBoundaryStartMarker(node) {
        return isComment(node) && elementBoundaryStartMarker.test(node.data.trim());
    },
    isElementBoundaryEndMarker(node) {
        return isComment(node) && elementBoundaryEndMarker.test(node.data);
    },
    /**
     * Returns the indexes of the ViewBehaviorFactories affecting
     * attributes for the element, or null if no factories were found.
     */
    parseAttributeBinding(node) {
        const attr = node.getAttribute(this.attributeMarkerName);
        return attr === null
            ? attr
            : attr.split(this.attributeBindingSeparator).map(i => parseInt(i));
    },
    /**
     * Parses the ViewBehaviorFactory index from string data. Returns
     * the binding index or null if the index cannot be retrieved.
     */
    parseContentBindingStartMarker(content) {
        return parseIndexAndIdMarker(bindingStartMarker, content);
    },
    parseContentBindingEndMarker(content) {
        return parseIndexAndIdMarker(bindingEndMarker, content);
    },
    /**
     * Parses the index of a repeat directive from a content string.
     */
    parseRepeatStartMarker(content) {
        return parseIntMarker(repeatViewStartMarker, content);
    },
    parseRepeatEndMarker(content) {
        return parseIntMarker(repeatViewEndMarker, content);
    },
    /**
     * Parses element Id from element boundary markers
     */
    parseElementBoundaryStartMarker(content) {
        return parseStringMarker(elementBoundaryStartMarker, content.trim());
    },
    parseElementBoundaryEndMarker(content) {
        return parseStringMarker(elementBoundaryEndMarker, content);
    },
});
function parseIntMarker(regex, content) {
    const match = regex.exec(content);
    return match === null ? match : parseInt(match[1]);
}
function parseStringMarker(regex, content) {
    const match = regex.exec(content);
    return match === null ? match : match[1];
}
function parseIndexAndIdMarker(regex, content) {
    const match = regex.exec(content);
    return match === null ? match : [parseInt(match[1]), match[2]];
}
/**
 * @internal
 */
export const Hydratable = Symbol.for("fe-hydration");
export function isHydratable(value) {
    return value[Hydratable] === Hydratable;
}
