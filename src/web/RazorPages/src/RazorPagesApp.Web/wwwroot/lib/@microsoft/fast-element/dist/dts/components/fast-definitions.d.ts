import { Constructable } from "../interfaces.js";
import { ComposableStyles, ElementStyles } from "../styles/element-styles.js";
import type { ElementViewTemplate } from "../templating/template.js";
import { AttributeConfiguration, AttributeDefinition } from "./attributes.js";
/**
 * Shadow root initialization options.
 * @public
 */
export interface ShadowRootOptions extends ShadowRootInit {
    /**
     * A registry that provides the custom elements visible
     * from within this shadow root.
     * @beta
     */
    registry?: CustomElementRegistry;
}
/**
 * Represents metadata configuration for a custom element.
 * @public
 */
export interface PartialFASTElementDefinition {
    /**
     * The name of the custom element.
     */
    readonly name: string;
    /**
     * The template to render for the custom element.
     */
    readonly template?: ElementViewTemplate;
    /**
     * The styles to associate with the custom element.
     */
    readonly styles?: ComposableStyles | ComposableStyles[];
    /**
     * The custom attributes of the custom element.
     */
    readonly attributes?: (AttributeConfiguration | string)[];
    /**
     * Options controlling the creation of the custom element's shadow DOM.
     * @remarks
     * If not provided, defaults to an open shadow root. Provide null
     * to render to the associated template to the light DOM instead.
     */
    readonly shadowOptions?: Partial<ShadowRootOptions> | null;
    /**
     * Options controlling how the custom element is defined with the platform.
     */
    readonly elementOptions?: ElementDefinitionOptions;
    /**
     * The registry to register this component in by default.
     * @remarks
     * If not provided, defaults to the global registry.
     */
    readonly registry?: CustomElementRegistry;
}
/**
 * Defines metadata for a FASTElement.
 * @public
 */
export declare class FASTElementDefinition<TType extends Constructable<HTMLElement> = Constructable<HTMLElement>> {
    private platformDefined;
    /**
     * The type this element definition describes.
     */
    readonly type: TType;
    /**
     * Indicates if this element has been defined in at least one registry.
     */
    get isDefined(): boolean;
    /**
     * The name of the custom element.
     */
    readonly name: string;
    /**
     * The custom attributes of the custom element.
     */
    readonly attributes: ReadonlyArray<AttributeDefinition>;
    /**
     * A map enabling lookup of attribute by associated property name.
     */
    readonly propertyLookup: Record<string, AttributeDefinition>;
    /**
     * A map enabling lookup of property by associated attribute name.
     */
    readonly attributeLookup: Record<string, AttributeDefinition>;
    /**
     * The template to render for the custom element.
     */
    readonly template?: ElementViewTemplate;
    /**
     * The styles to associate with the custom element.
     */
    readonly styles?: ElementStyles;
    /**
     * Options controlling the creation of the custom element's shadow DOM.
     */
    readonly shadowOptions?: ShadowRootOptions;
    /**
     * Options controlling how the custom element is defined with the platform.
     */
    readonly elementOptions: ElementDefinitionOptions;
    /**
     * The registry to register this component in by default.
     */
    readonly registry: CustomElementRegistry;
    private constructor();
    /**
     * Defines a custom element based on this definition.
     * @param registry - The element registry to define the element in.
     * @remarks
     * This operation is idempotent per registry.
     */
    define(registry?: CustomElementRegistry): this;
    /**
     * Creates an instance of FASTElementDefinition.
     * @param type - The type this definition is being created for.
     * @param nameOrDef - The name of the element to define or a config object
     * that describes the element to define.
     */
    static compose<TType extends Constructable<HTMLElement> = Constructable<HTMLElement>>(type: TType, nameOrDef?: string | PartialFASTElementDefinition): FASTElementDefinition<TType>;
    /**
     * Registers a FASTElement base type.
     * @param type - The type to register as a base type.
     * @internal
     */
    static registerBaseType(type: Function): void;
    /**
     * Gets the element definition associated with the specified type.
     * @param type - The custom element type to retrieve the definition for.
     */
    static readonly getByType: (key: Function) => FASTElementDefinition<Constructable<HTMLElement>> | undefined;
    /**
     * Gets the element definition associated with the instance.
     * @param instance - The custom element instance to retrieve the definition for.
     */
    static readonly getForInstance: (object: any) => FASTElementDefinition<Constructable<HTMLElement>> | undefined;
}
