import { HTMLDirective, StatelessAttachedAttributeDirective, } from "./html-directive.js";
/**
 * The runtime behavior for template references.
 * @public
 */
export class RefDirective extends StatelessAttachedAttributeDirective {
    /**
     * Bind this behavior.
     * @param controller - The view controller that manages the lifecycle of this behavior.
     */
    bind(controller) {
        controller.source[this.options] = controller.targets[this.targetNodeId];
    }
}
HTMLDirective.define(RefDirective);
/**
 * A directive that observes the updates a property with a reference to the element.
 * @param propertyName - The name of the property to assign the reference to.
 * @public
 */
export const ref = (propertyName) => new RefDirective(propertyName);
