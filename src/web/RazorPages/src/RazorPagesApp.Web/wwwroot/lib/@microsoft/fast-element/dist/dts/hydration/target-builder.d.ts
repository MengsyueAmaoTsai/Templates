import type { CompiledViewBehaviorFactory, ViewBehaviorFactory, ViewBehaviorTargets } from "../templating/html-directive.js";
export declare class HydrationTargetElementError extends Error {
    /**
     * The Compiled View Behavior Factories that belong to the view.
     */
    readonly factories: CompiledViewBehaviorFactory[];
    /**
     * The node to target factory.
     */
    readonly node: Element;
    /**
     * String representation of the HTML in the template that
     * threw the target element error.
     */
    templateString?: string;
    constructor(
    /**
     * The error message
     */
    message: string | undefined, 
    /**
     * The Compiled View Behavior Factories that belong to the view.
     */
    factories: CompiledViewBehaviorFactory[], 
    /**
     * The node to target factory.
     */
    node: Element);
}
/**
 * Represents the DOM boundaries controlled by a view
 */
export interface ViewBoundaries {
    first: Node;
    last: Node;
}
/**
 * Stores relationships between a {@link ViewBehaviorFactory} and
 * the {@link ViewBoundaries} the factory created.
 */
export interface ViewBehaviorBoundaries {
    [factoryId: string]: ViewBoundaries;
}
/**
 * Returns a range object inclusive of all nodes including and between the
 * provided first and last node.
 * @param first - The first node
 * @param last - This last node
 * @returns
 */
export declare function createRangeForNodes(first: Node, last: Node): Range;
/**
 * Maps {@link CompiledViewBehaviorFactory} ids to the corresponding node targets for the view.
 * @param firstNode - The first node of the view.
 * @param lastNode -  The last node of the view.
 * @param factories - The Compiled View Behavior Factories that belong to the view.
 * @returns - A {@link ViewBehaviorTargets } object for the factories in the view.
 */
export declare function buildViewBindingTargets(firstNode: Node, lastNode: Node, factories: CompiledViewBehaviorFactory[]): {
    targets: ViewBehaviorTargets;
    boundaries: ViewBehaviorBoundaries;
};
export declare function targetFactory(factory: ViewBehaviorFactory, node: Node, targets: ViewBehaviorTargets): void;
