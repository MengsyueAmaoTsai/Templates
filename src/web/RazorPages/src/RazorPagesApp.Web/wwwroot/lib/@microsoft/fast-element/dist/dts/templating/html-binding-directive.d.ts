import { DOMAspect, DOMPolicy } from "../dom.js";
import { ExecutionContext, Expression, ExpressionObserver } from "../observation/observable.js";
import type { Binding, BindingDirective } from "../binding/binding.js";
import { AddViewBehaviorFactory, Aspected, HTMLDirective, ViewBehavior, ViewBehaviorFactory, ViewController } from "./html-directive.js";
/**
 * A simple View that can be interpolated into HTML content.
 * @public
 */
export interface ContentView {
    readonly context: ExecutionContext;
    /**
     * Binds a view's behaviors to its binding source.
     * @param source - The binding source for the view's binding behaviors.
     * @param context - The execution context to run the view within.
     */
    bind(source: any, context?: ExecutionContext): void;
    /**
     * Unbinds a view's behaviors from its binding source and context.
     */
    unbind(): void;
    /**
     * Inserts the view's DOM nodes before the referenced node.
     * @param node - The node to insert the view's DOM before.
     */
    insertBefore(node: Node): void;
    /**
     * Removes the view's DOM nodes.
     * The nodes are not disposed and the view can later be re-inserted.
     */
    remove(): void;
}
/**
 * A simple template that can create ContentView instances.
 * @public
 */
export interface ContentTemplate {
    /**
     * Creates a simple content view instance.
     */
    create(): ContentView;
}
export interface HydratableContentTemplate extends ContentTemplate {
    /**
     * Hydrates a content view from first/last nodes.
     */
    hydrate(first: Node, last: Node): ContentView;
}
/**
 * A directive that applies bindings.
 * @public
 */
export declare class HTMLBindingDirective implements HTMLDirective, ViewBehaviorFactory, ViewBehavior, Aspected, BindingDirective {
    dataBinding: Binding;
    private data;
    private updateTarget;
    /**
     * The unique id of the factory.
     */
    id: string;
    /**
     * The structural id of the DOM node to which the created behavior will apply.
     */
    targetNodeId: string;
    /**
     * The tagname associated with the target node.
     */
    targetTagName: string | null;
    /**
     * The policy that the created behavior must run under.
     */
    policy: DOMPolicy;
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
     * Creates an instance of HTMLBindingDirective.
     * @param dataBinding - The binding configuration to apply.
     */
    constructor(dataBinding: Binding);
    /**
     * Creates HTML to be used within a template.
     * @param add - Can be used to add  behavior factories to a template.
     */
    createHTML(add: AddViewBehaviorFactory): string;
    /**
     * Creates a behavior.
     */
    createBehavior(): ViewBehavior;
    /** @internal */
    bind(controller: ViewController): void;
    /** @internal */
    unbind(controller: ViewController): void;
    /** @internal */
    handleEvent(event: Event): void;
    /** @internal */
    handleChange(binding: Expression, observer: ExpressionObserver): void;
}
