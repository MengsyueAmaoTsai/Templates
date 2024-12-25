import { NodeBehaviorOptions, NodeObservationDirective } from "./node-observation.js";
import type { CaptureType } from "./template.js";
/**
 * The options used to configure child list observation.
 * @public
 */
export interface ChildListDirectiveOptions<T = any> extends NodeBehaviorOptions<T>, Omit<MutationObserverInit, "subtree" | "childList"> {
}
/**
 * The options used to configure subtree observation.
 * @public
 */
export interface SubtreeDirectiveOptions<T = any> extends NodeBehaviorOptions<T>, Omit<MutationObserverInit, "subtree" | "childList"> {
    /**
     * Indicates that child subtrees should be observed for changes.
     */
    subtree: boolean;
    /**
     * When subtrees are observed, a query selector is required to indicate
     * which of potentially many nodes should be assigned to the property.
     */
    selector: string;
}
/**
 * The options used to configure child/subtree node observation.
 * @public
 */
export declare type ChildrenDirectiveOptions<T = any> = ChildListDirectiveOptions<T> | SubtreeDirectiveOptions<T>;
/**
 * The runtime behavior for child node observation.
 * @public
 */
export declare class ChildrenDirective extends NodeObservationDirective<ChildrenDirectiveOptions> {
    private observerProperty;
    /**
     * Creates an instance of ChildrenDirective.
     * @param options - The options to use in configuring the child observation behavior.
     */
    constructor(options: ChildrenDirectiveOptions);
    /**
     * Begins observation of the nodes.
     * @param target - The target to observe.
     */
    observe(target: any): void;
    /**
     * Disconnects observation of the nodes.
     * @param target - The target to unobserve.
     */
    disconnect(target: any): void;
    /**
     * Retrieves the raw nodes that should be assigned to the source property.
     * @param target - The target to get the node to.
     */
    getNodes(target: Element): Node[];
    private handleEvent;
}
/**
 * A directive that observes the `childNodes` of an element and updates a property
 * whenever they change.
 * @param propertyOrOptions - The options used to configure child node observation.
 * @public
 */
export declare function children<TSource = any, TParent = any>(propertyOrOptions: (keyof TSource & string) | ChildrenDirectiveOptions<keyof TSource & string>): CaptureType<TSource, TParent>;
