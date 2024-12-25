import { DOMAspect, DOMPolicy, DOMSink } from "./dom.js";
import { TrustedTypesPolicy } from "./interfaces.js";
/**
 * A specific DOM sink guard for a node aspect.
 * @public
 */
export declare type DOMSinkGuards = Record<string, (tagName: string | null, aspect: DOMAspect, aspectName: string, sink: DOMSink) => DOMSink>;
/**
 * Aspect-specific guards for a DOM Policy.
 * @public
 */
export declare type DOMAspectGuards = {
    /**
     * Guards for attributes.
     */
    [DOMAspect.attribute]?: DOMSinkGuards;
    /**
     * Guards for boolean attributes.
     */
    [DOMAspect.booleanAttribute]?: DOMSinkGuards;
    /**
     * Guards for properties.
     */
    [DOMAspect.property]?: DOMSinkGuards;
    /**
     * Guards for content.
     */
    [DOMAspect.content]?: DOMSinkGuards;
    /**
     * Guards for token list manipulation.
     */
    [DOMAspect.tokenList]?: DOMSinkGuards;
    /**
     * Guards for events.
     */
    [DOMAspect.event]?: DOMSinkGuards;
};
/**
 * Element-specific guards for a DOM Policy.
 * @public
 */
export declare type DOMElementGuards = Record<string, DOMAspectGuards>;
/**
 * Guard configuration for a DOM Policy.
 * @public
 */
export declare type DOMGuards = {
    /**
     * Guards for specific elements.
     */
    elements: DOMElementGuards;
    /**
     * General aspect guards independent of the element type.
     */
    aspects: DOMAspectGuards;
};
/**
 * Options for creating a DOM Policy.
 * @public
 */
export declare type DOMPolicyOptions = {
    /**
     * The trusted type to use for HTML creation.
     */
    trustedType?: TrustedTypesPolicy;
    /**
     * The DOM guards used to override or extend the defaults.
     */
    guards?: Partial<DOMGuards>;
};
/**
 * A helper for creating DOM policies.
 * @public
 */
declare const DOMPolicy: Readonly<{
    /**
     * Creates a new DOM Policy object.
     * @param options The options to use in creating the policy.
     * @returns The newly created DOMPolicy.
     */
    create(options?: DOMPolicyOptions): Readonly<DOMPolicy>;
}>;
export { DOMPolicy };
