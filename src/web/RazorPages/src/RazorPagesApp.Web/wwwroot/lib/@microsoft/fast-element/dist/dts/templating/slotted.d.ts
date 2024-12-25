import { NodeBehaviorOptions, NodeObservationDirective } from "./node-observation.js";
import type { CaptureType } from "./template.js";
/**
 * The options used to configure slotted node observation.
 * @public
 */
export interface SlottedDirectiveOptions<T = any> extends NodeBehaviorOptions<T>, AssignedNodesOptions {
}
/**
 * The runtime behavior for slotted node observation.
 * @public
 */
export declare class SlottedDirective extends NodeObservationDirective<SlottedDirectiveOptions> {
    /**
     * Begins observation of the nodes.
     * @param target - The target to observe.
     */
    observe(target: EventSource): void;
    /**
     * Disconnects observation of the nodes.
     * @param target - The target to unobserve.
     */
    disconnect(target: EventSource): void;
    /**
     * Retrieves the raw nodes that should be assigned to the source property.
     * @param target - The target to get the node to.
     */
    getNodes(target: HTMLSlotElement): Node[];
    /** @internal */
    handleEvent(event: Event): void;
}
/**
 * A directive that observes the `assignedNodes()` of a slot and updates a property
 * whenever they change.
 * @param propertyOrOptions - The options used to configure slotted node observation.
 * @public
 */
export declare function slotted<TSource = any, TParent = any>(propertyOrOptions: (keyof TSource & string) | SlottedDirectiveOptions<keyof TSource & string>): CaptureType<TSource, TParent>;
