import type { HostBehavior } from "./styles/host.js";
import type { ViewBehavior, ViewBehaviorFactory, ViewController } from "./templating/html-directive.js";
/**
 * Retrieves the "composed parent" element of a node, ignoring DOM tree boundaries.
 * When the parent of a node is a shadow-root, it will return the host
 * element of the shadow root. Otherwise it will return the parent node or null if
 * no parent node exists.
 * @param element - The element for which to retrieve the composed parent
 *
 * @public
 */
export declare function composedParent<T extends HTMLElement>(element: T): HTMLElement | null;
/**
 * Determines if the reference element contains the test element in a "composed" DOM tree that
 * ignores shadow DOM boundaries.
 *
 * Returns true of the test element is a descendent of the reference, or exists in
 * a shadow DOM that is a logical descendent of the reference. Otherwise returns false.
 * @param reference - The element to test for containment against.
 * @param test - The element being tested for containment.
 *
 * @public
 */
export declare function composedContains(reference: HTMLElement, test: HTMLElement): boolean;
/**
 * An extension of MutationObserver that supports unobserving nodes.
 * @internal
 */
export declare class UnobservableMutationObserver extends MutationObserver {
    private readonly callback;
    private observedNodes;
    /**
     * Creates an instance of UnobservableMutationObserver.
     * @param callback - The callback to invoke when observed nodes are changed.
     */
    constructor(callback: MutationCallback);
    observe(target: Node, options?: MutationObserverInit | undefined): void;
    unobserve(target: Node): void;
}
/**
 * Bridges between ViewBehaviors and HostBehaviors, enabling a host to
 * control ViewBehaviors.
 * @public
 */
export interface ViewBehaviorOrchestrator<TSource = any, TParent = any> extends ViewController<TSource, TParent>, HostBehavior<TSource> {
    /**
     *
     * @param nodeId - The structural id of the DOM node to which a behavior will apply.
     * @param target - The DOM node associated with the id.
     */
    addTarget(nodeId: string, target: Node): void;
    /**
     * Adds a behavior.
     * @param behavior - The behavior to add.
     */
    addBehavior(behavior: ViewBehavior): void;
    /**
     * Adds a behavior factory.
     * @param factory - The behavior factory to add.
     * @param target - The target the factory will create behaviors for.
     */
    addBehaviorFactory(factory: ViewBehaviorFactory, target: Node): void;
}
/**
 * Bridges between ViewBehaviors and HostBehaviors, enabling a host to
 * control ViewBehaviors.
 * @public
 */
export declare const ViewBehaviorOrchestrator: Readonly<{
    /**
     * Creates a ViewBehaviorOrchestrator.
     * @param source - The source to to associate behaviors with.
     * @returns A ViewBehaviorOrchestrator.
     */
    create<TSource = any, TParent = any>(source: TSource): ViewBehaviorOrchestrator<TSource, TParent>;
}>;
