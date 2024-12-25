import { Constructable } from "../interfaces.js";
import { ElementController } from "./element-controller.js";
import { FASTElementDefinition, PartialFASTElementDefinition } from "./fast-definitions.js";
/**
 * Represents a custom element based on the FASTElement infrastructure.
 * @public
 */
export interface FASTElement extends HTMLElement {
    /**
     * The underlying controller that handles the lifecycle and rendering of
     * this FASTElement.
     */
    readonly $fastController: ElementController;
    /**
     * Emits a custom HTML event.
     * @param type - The type name of the event.
     * @param detail - The event detail object to send with the event.
     * @param options - The event options. By default bubbles and composed.
     * @remarks
     * Only emits events if the element is connected.
     */
    $emit(type: string, detail?: any, options?: Omit<CustomEventInit, "detail">): boolean | void;
    /**
     * The connected callback for this FASTElement.
     * @remarks
     * This method is invoked by the platform whenever this FASTElement
     * becomes connected to the document.
     */
    connectedCallback(): void;
    /**
     * The disconnected callback for this FASTElement.
     * @remarks
     * This method is invoked by the platform whenever this FASTElement
     * becomes disconnected from the document.
     */
    disconnectedCallback(): void;
    /**
     * The attribute changed callback for this FASTElement.
     * @param name - The name of the attribute that changed.
     * @param oldValue - The previous value of the attribute.
     * @param newValue - The new value of the attribute.
     * @remarks
     * This method is invoked by the platform whenever an observed
     * attribute of FASTElement has a value change.
     */
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}
declare function compose<TType extends Constructable<HTMLElement> = Constructable<HTMLElement>>(this: TType, nameOrDef: string | PartialFASTElementDefinition): FASTElementDefinition<TType>;
declare function compose<TType extends Constructable<HTMLElement> = Constructable<HTMLElement>>(type: TType, nameOrDef?: string | PartialFASTElementDefinition): FASTElementDefinition<TType>;
declare function define<TType extends Constructable<HTMLElement> = Constructable<HTMLElement>>(this: TType, nameOrDef: string | PartialFASTElementDefinition): TType;
declare function define<TType extends Constructable<HTMLElement> = Constructable<HTMLElement>>(type: TType, nameOrDef?: string | PartialFASTElementDefinition): TType;
declare function from<TBase extends typeof HTMLElement>(BaseType: TBase): new () => InstanceType<TBase> & FASTElement;
/**
 * A minimal base class for FASTElements that also provides
 * static helpers for working with FASTElements.
 * @public
 */
export declare const FASTElement: {
    new (): FASTElement;
    define: typeof define;
    compose: typeof compose;
    from: typeof from;
};
/**
 * Decorator: Defines a platform custom element based on `FASTElement`.
 * @param nameOrDef - The name of the element to define or a definition object
 * that describes the element to define.
 * @public
 */
export declare function customElement(nameOrDef: string | PartialFASTElementDefinition): (type: Constructable<HTMLElement>) => void;
export {};
