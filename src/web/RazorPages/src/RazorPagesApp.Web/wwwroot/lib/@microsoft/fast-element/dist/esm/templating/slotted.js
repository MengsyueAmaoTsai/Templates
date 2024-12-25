import { isString } from "../interfaces.js";
import { HTMLDirective } from "./html-directive.js";
import { NodeObservationDirective } from "./node-observation.js";
const slotEvent = "slotchange";
/**
 * The runtime behavior for slotted node observation.
 * @public
 */
export class SlottedDirective extends NodeObservationDirective {
    /**
     * Begins observation of the nodes.
     * @param target - The target to observe.
     */
    observe(target) {
        target.addEventListener(slotEvent, this);
    }
    /**
     * Disconnects observation of the nodes.
     * @param target - The target to unobserve.
     */
    disconnect(target) {
        target.removeEventListener(slotEvent, this);
    }
    /**
     * Retrieves the raw nodes that should be assigned to the source property.
     * @param target - The target to get the node to.
     */
    getNodes(target) {
        return target.assignedNodes(this.options);
    }
    /** @internal */
    handleEvent(event) {
        const target = event.currentTarget;
        this.updateTarget(this.getSource(target), this.computeNodes(target));
    }
}
HTMLDirective.define(SlottedDirective);
/**
 * A directive that observes the `assignedNodes()` of a slot and updates a property
 * whenever they change.
 * @param propertyOrOptions - The options used to configure slotted node observation.
 * @public
 */
export function slotted(propertyOrOptions) {
    if (isString(propertyOrOptions)) {
        propertyOrOptions = { property: propertyOrOptions };
    }
    return new SlottedDirective(propertyOrOptions);
}
