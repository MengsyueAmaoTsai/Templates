import { StatelessAttachedAttributeDirective, ViewController } from "./html-directive.js";
import type { CaptureType } from "./template.js";
/**
 * The runtime behavior for template references.
 * @public
 */
export declare class RefDirective extends StatelessAttachedAttributeDirective<string> {
    /**
     * The structural id of the DOM node to which the created behavior will apply.
     */
    targetNodeId: string;
    /**
     * Bind this behavior.
     * @param controller - The view controller that manages the lifecycle of this behavior.
     */
    bind(controller: ViewController): void;
}
/**
 * A directive that observes the updates a property with a reference to the element.
 * @param propertyName - The name of the property to assign the reference to.
 * @public
 */
export declare const ref: <TSource = any, TParent = any>(propertyName: keyof TSource & string) => CaptureType<TSource, TParent>;
