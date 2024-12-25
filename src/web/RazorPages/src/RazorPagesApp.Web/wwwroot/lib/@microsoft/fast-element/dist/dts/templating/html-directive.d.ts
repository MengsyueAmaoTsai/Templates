import { DOMAspect, DOMPolicy } from "../dom.js";
import type { Constructable } from "../interfaces.js";
import type { Binding } from "../binding/binding.js";
import type { ExpressionController } from "../observation/observable.js";
/**
 * The target nodes available to a behavior.
 * @public
 */
export declare type ViewBehaviorTargets = {
    [id: string]: Node;
};
/**
 * Controls the lifecycle of a view and provides relevant context.
 * @public
 */
export interface ViewController<TSource = any, TParent = any> extends ExpressionController<TSource, TParent> {
    /**
     * The parts of the view that are targeted by view behaviors.
     */
    readonly targets: ViewBehaviorTargets;
}
/**
 * Represents an object that can contribute behavior to a view.
 * @public
 */
export interface ViewBehavior<TSource = any, TParent = any> {
    /**
     * Bind this behavior.
     * @param controller - The view controller that manages the lifecycle of this behavior.
     */
    bind(controller: ViewController<TSource, TParent>): void;
}
/**
 * A factory that can create a {@link ViewBehavior} associated with a particular
 * location within a DOM fragment.
 * @public
 */
export interface ViewBehaviorFactory {
    /**
     * The unique id of the factory.
     */
    id?: string;
    /**
     * The structural id of the DOM node to which the created behavior will apply.
     */
    targetNodeId?: string;
    /**
     * The tag name of the DOM node to which the created behavior will apply.
     */
    targetTagName?: string | null;
    /**
     * The policy that the created behavior must run under.
     */
    policy?: DOMPolicy;
    /**
     * Creates a behavior.
     */
    createBehavior(): ViewBehavior;
}
/**
 * Represents a ViewBehaviorFactory after the compilation process has completed.
 * @public
 */
export declare type CompiledViewBehaviorFactory = Required<ViewBehaviorFactory>;
/**
 * Used to add behavior factories when constructing templates.
 * @public
 */
export declare type AddViewBehaviorFactory = (factory: ViewBehaviorFactory) => string;
/**
 * Instructs the template engine to apply behavior to a node.
 * @public
 */
export interface HTMLDirective {
    /**
     * Creates HTML to be used within a template.
     * @param add - Can be used to add  behavior factories to a template.
     */
    createHTML(add: AddViewBehaviorFactory): string;
}
/**
 * Represents something that applies to a specific aspect of the DOM.
 * @public
 */
export interface Aspected {
    /**
     * The original source aspect exactly as represented in markup.
     */
    sourceAspect: string;
    /**
     * The evaluated target aspect, determined after processing the source.
     */
    targetAspect: string;
    /**
     * The type of aspect to target.
     */
    aspectType: DOMAspect;
    /**
     * A binding if one is associated with the aspect.
     */
    dataBinding?: Binding;
}
/**
 * Represents metadata configuration for an HTMLDirective.
 * @public
 */
export interface PartialHTMLDirectiveDefinition {
    /**
     * Indicates whether the directive needs access to template contextual information
     * such as the sourceAspect, targetAspect, and aspectType.
     */
    aspected?: boolean;
}
/**
 * Defines metadata for an HTMLDirective.
 * @public
 */
export interface HTMLDirectiveDefinition<TType extends Constructable<HTMLDirective> = Constructable<HTMLDirective>> extends Required<PartialHTMLDirectiveDefinition> {
    /**
     * The type that the definition provides metadata for.
     */
    readonly type: TType;
}
/**
 * Instructs the template engine to apply behavior to a node.
 * @public
 */
export declare const HTMLDirective: Readonly<{
    /**
     * Gets the directive definition associated with the instance.
     * @param instance - The directive instance to retrieve the definition for.
     */
    getForInstance: (object: any) => HTMLDirectiveDefinition<Constructable<HTMLDirective>> | undefined;
    /**
     * Gets the directive definition associated with the specified type.
     * @param type - The directive type to retrieve the definition for.
     */
    getByType: (key: Function) => HTMLDirectiveDefinition<Constructable<HTMLDirective>> | undefined;
    /**
     * Defines an HTMLDirective based on the options.
     * @param type - The type to define as a directive.
     * @param options - Options that specify the directive's application.
     */
    define<TType extends Constructable<HTMLDirective>>(type: TType, options?: PartialHTMLDirectiveDefinition): TType;
    /**
     *
     * @param directive - The directive to assign the aspect to.
     * @param value - The value to base the aspect determination on.
     * @remarks
     * If a falsy value is provided, then the content aspect will be assigned.
     */
    assignAspect(directive: Aspected, value?: string): void;
}>;
/**
 * Decorator: Defines an HTMLDirective.
 * @param options - Provides options that specify the directive's application.
 * @public
 */
export declare function htmlDirective(options?: PartialHTMLDirectiveDefinition): (type: Constructable<HTMLDirective>) => void;
/**
 * A base class used for attribute directives that don't need internal state.
 * @public
 */
export declare abstract class StatelessAttachedAttributeDirective<TOptions> implements HTMLDirective, ViewBehaviorFactory, ViewBehavior {
    protected options: TOptions;
    /**
     * Creates an instance of RefDirective.
     * @param options - The options to use in configuring the directive.
     */
    constructor(options: TOptions);
    /**
     * Creates a placeholder string based on the directive's index within the template.
     * @param index - The index of the directive within the template.
     * @remarks
     * Creates a custom attribute placeholder.
     */
    createHTML(add: AddViewBehaviorFactory): string;
    /**
     * Creates a behavior.
     * @param targets - The targets available for behaviors to be attached to.
     */
    createBehavior(): ViewBehavior;
    /**
     * Bind this behavior.
     * @param controller - The view controller that manages the lifecycle of this behavior.
     */
    abstract bind(controller: ViewController): void;
}
