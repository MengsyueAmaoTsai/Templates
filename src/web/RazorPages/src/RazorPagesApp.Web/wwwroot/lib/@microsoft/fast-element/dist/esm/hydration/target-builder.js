import { HydrationMarkup } from "../components/hydration.js";
export class HydrationTargetElementError extends Error {
    constructor(
    /**
     * The error message
     */
    message, 
    /**
     * The Compiled View Behavior Factories that belong to the view.
     */
    factories, 
    /**
     * The node to target factory.
     */
    node) {
        super(message);
        this.factories = factories;
        this.node = node;
    }
}
function isComment(node) {
    return node.nodeType === Node.COMMENT_NODE;
}
function isText(node) {
    return node.nodeType === Node.TEXT_NODE;
}
/**
 * Returns a range object inclusive of all nodes including and between the
 * provided first and last node.
 * @param first - The first node
 * @param last - This last node
 * @returns
 */
export function createRangeForNodes(first, last) {
    const range = document.createRange();
    range.setStart(first, 0);
    // The lastIndex should be inclusive of the end of the lastChild. Obtain offset based
    // on usageNotes:  https://developer.mozilla.org/en-US/docs/Web/API/Range/setEnd#usage_notes
    range.setEnd(last, isComment(last) || isText(last) ? last.data.length : last.childNodes.length);
    return range;
}
function isShadowRoot(node) {
    return node instanceof DocumentFragment && "mode" in node;
}
/**
 * Maps {@link CompiledViewBehaviorFactory} ids to the corresponding node targets for the view.
 * @param firstNode - The first node of the view.
 * @param lastNode -  The last node of the view.
 * @param factories - The Compiled View Behavior Factories that belong to the view.
 * @returns - A {@link ViewBehaviorTargets } object for the factories in the view.
 */
export function buildViewBindingTargets(firstNode, lastNode, factories) {
    const range = createRangeForNodes(firstNode, lastNode);
    const treeRoot = range.commonAncestorContainer;
    const walker = document.createTreeWalker(treeRoot, NodeFilter.SHOW_ELEMENT + NodeFilter.SHOW_COMMENT + NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            return range.comparePoint(node, 0) === 0
                ? NodeFilter.FILTER_ACCEPT
                : NodeFilter.FILTER_REJECT;
        },
    });
    const targets = {};
    const boundaries = {};
    let node = (walker.currentNode = firstNode);
    while (node !== null) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE: {
                targetElement(node, factories, targets);
                break;
            }
            case Node.COMMENT_NODE: {
                targetComment(node, walker, factories, targets, boundaries);
                break;
            }
        }
        node = walker.nextNode();
    }
    range.detach();
    return { targets, boundaries };
}
function targetElement(node, factories, targets) {
    // Check for attributes and map any factories.
    const attrFactoryIds = HydrationMarkup.parseAttributeBinding(node);
    if (attrFactoryIds !== null) {
        for (const id of attrFactoryIds) {
            if (!factories[id]) {
                throw new HydrationTargetElementError(`HydrationView was unable to successfully target factory on ${node.nodeName} inside ${node.getRootNode().host.nodeName}. This likely indicates a template mismatch between SSR rendering and hydration.`, factories, node);
            }
            targetFactory(factories[id], node, targets);
        }
        node.removeAttribute(HydrationMarkup.attributeMarkerName);
    }
}
function targetComment(node, walker, factories, targets, boundaries) {
    if (HydrationMarkup.isElementBoundaryStartMarker(node)) {
        skipToElementBoundaryEndMarker(node, walker);
        return;
    }
    if (HydrationMarkup.isContentBindingStartMarker(node.data)) {
        const parsed = HydrationMarkup.parseContentBindingStartMarker(node.data);
        if (parsed === null) {
            return;
        }
        const [index, id] = parsed;
        const factory = factories[index];
        const nodes = [];
        let current = walker.nextSibling();
        node.data = "";
        const first = current;
        // Search for the binding end marker that closes the binding.
        while (current !== null) {
            if (isComment(current)) {
                const parsed = HydrationMarkup.parseContentBindingEndMarker(current.data);
                if (parsed && parsed[1] === id) {
                    break;
                }
            }
            nodes.push(current);
            current = walker.nextSibling();
        }
        if (current === null) {
            const root = node.getRootNode();
            throw new Error(`Error hydrating Comment node inside "${isShadowRoot(root) ? root.host.nodeName : root.nodeName}".`);
        }
        current.data = "";
        if (nodes.length === 1 && isText(nodes[0])) {
            targetFactory(factory, nodes[0], targets);
        }
        else {
            // If current === first, it means there is no content in
            // the view. This happens when a `when` directive evaluates false,
            // or whenever a content binding returns null or undefined.
            // In that case, there will never be any content
            // to hydrate and Binding can simply create a HTMLView
            // whenever it needs to.
            if (current !== first && current.previousSibling !== null) {
                boundaries[factory.targetNodeId] = {
                    first,
                    last: current.previousSibling,
                };
            }
            // Binding evaluates to null / undefined or a template.
            // If binding revaluates to string, it will replace content in target
            // So we always insert a text node to ensure that
            // text content binding will be written to this text node instead of comment
            const dummyTextNode = current.parentNode.insertBefore(document.createTextNode(""), current);
            targetFactory(factory, dummyTextNode, targets);
        }
    }
}
/**
 * Moves TreeWalker to element boundary end marker
 * @param node - element boundary start marker node
 * @param walker - tree walker
 */
function skipToElementBoundaryEndMarker(node, walker) {
    const id = HydrationMarkup.parseElementBoundaryStartMarker(node.data);
    let current = walker.nextSibling();
    while (current !== null) {
        if (isComment(current)) {
            const parsed = HydrationMarkup.parseElementBoundaryEndMarker(current.data);
            if (parsed && parsed === id) {
                break;
            }
        }
        current = walker.nextSibling();
    }
}
export function targetFactory(factory, node, targets) {
    if (factory.targetNodeId === undefined) {
        // Dev error, this shouldn't ever be thrown
        throw new Error("Factory could not be target to the node");
    }
    targets[factory.targetNodeId] = node;
}
