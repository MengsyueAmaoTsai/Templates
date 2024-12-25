import { Hydratable } from "../components/hydration.js";
import { ViewBehaviorBoundaries } from "../hydration/target-builder.js";
import type { ViewTemplate } from "../templating/template.js";
import type { Disposable } from "../interfaces.js";
import { ExecutionContext, SourceLifetime } from "../observation/observable.js";
import type { CompiledViewBehaviorFactory, ViewBehaviorFactory, ViewBehaviorTargets, ViewController } from "./html-directive.js";
/**
 * Represents a collection of DOM nodes which can be bound to a data source.
 * @public
 */
export interface View<TSource = any, TParent = any> extends Disposable {
    /**
     * The execution context the view is running within.
     */
    readonly context: ExecutionContext<TParent>;
    /**
     * The data that the view is bound to.
     */
    readonly source: TSource | null;
    /**
     * Indicates whether the controller is bound.
     */
    readonly isBound: boolean;
    /**
     * Binds a view's behaviors to its binding source.
     * @param source - The binding source for the view's binding behaviors.
     */
    bind(source: TSource, context?: ExecutionContext<TParent>): void;
    /**
     * Unbinds a view's behaviors from its binding source and context.
     */
    unbind(): void;
}
/**
 * A View representing DOM nodes specifically for rendering the view of a custom element.
 * @public
 */
export interface ElementView<TSource = any, TParent = any> extends View<TSource, TParent> {
    /**
     * Indicates how the source's lifetime relates to the controller's lifetime.
     */
    readonly sourceLifetime?: SourceLifetime;
    /**
     * Registers an unbind handler with the controller.
     * @param behavior - An object to call when the controller unbinds.
     */
    onUnbind(behavior: {
        unbind(controller: ViewController<TSource, TParent>): any;
    }): void;
    /**
     * Appends the view's DOM nodes to the referenced node.
     * @param node - The parent node to append the view's DOM nodes to.
     */
    appendTo(node: Node): void;
}
/**
 * A view representing a range of DOM nodes which can be added/removed ad hoc.
 * @public
 */
export interface SyntheticView<TSource = any, TParent = any> extends View<TSource, TParent> {
    /**
     * The first DOM node in the range of nodes that make up the view.
     */
    readonly firstChild: Node;
    /**
     * The last DOM node in the range of nodes that make up the view.
     */
    readonly lastChild: Node;
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
declare class DefaultExecutionContext<TParent> implements ExecutionContext<TParent> {
    /**
     * The index of the current item within a repeat context.
     */
    index: number;
    /**
     * The length of the current collection within a repeat context.
     */
    length: number;
    /**
     * The parent data source within a nested context.
     */
    readonly parent: TParent;
    /**
     * The parent execution context when in nested context scenarios.
     */
    readonly parentContext: ExecutionContext<TParent>;
    /**
     * The current event within an event handler.
     */
    get event(): Event;
    /**
     * Indicates whether the current item within a repeat context
     * has an even index.
     */
    get isEven(): boolean;
    /**
     * Indicates whether the current item within a repeat context
     * has an odd index.
     */
    get isOdd(): boolean;
    /**
     * Indicates whether the current item within a repeat context
     * is the first item in the collection.
     */
    get isFirst(): boolean;
    /**
     * Indicates whether the current item within a repeat context
     * is somewhere in the middle of the collection.
     */
    get isInMiddle(): boolean;
    /**
     * Indicates whether the current item within a repeat context
     * is the last item in the collection.
     */
    get isLast(): boolean;
    /**
     * Returns the typed event detail of a custom event.
     */
    eventDetail<TDetail>(): TDetail;
    /**
     * Returns the typed event target of the event.
     */
    eventTarget<TTarget extends EventTarget>(): TTarget;
}
/**
 * The standard View implementation, which also implements ElementView and SyntheticView.
 * @public
 */
export declare class HTMLView<TSource = any, TParent = any> extends DefaultExecutionContext<TParent> implements ElementView<TSource, TParent>, SyntheticView<TSource, TParent>, ExecutionContext<TParent> {
    private fragment;
    private factories;
    readonly targets: ViewBehaviorTargets;
    private behaviors;
    private unbindables;
    /**
     * The data that the view is bound to.
     */
    source: TSource | null;
    /**
     * Indicates whether the controller is bound.
     */
    isBound: boolean;
    /**
     * Indicates how the source's lifetime relates to the controller's lifetime.
     */
    readonly sourceLifetime: SourceLifetime;
    /**
     * The execution context the view is running within.
     */
    context: ExecutionContext<TParent>;
    /**
     * The first DOM node in the range of nodes that make up the view.
     */
    firstChild: Node;
    /**
     * The last DOM node in the range of nodes that make up the view.
     */
    lastChild: Node;
    /**
     * Constructs an instance of HTMLView.
     * @param fragment - The html fragment that contains the nodes for this view.
     * @param behaviors - The behaviors to be applied to this view.
     */
    constructor(fragment: DocumentFragment, factories: ReadonlyArray<CompiledViewBehaviorFactory>, targets: ViewBehaviorTargets);
    /**
     * Appends the view's DOM nodes to the referenced node.
     * @param node - The parent node to append the view's DOM nodes to.
     */
    appendTo(node: Node): void;
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
    /**
     * Removes the view and unbinds its behaviors, disposing of DOM nodes afterward.
     * Once a view has been disposed, it cannot be inserted or bound again.
     */
    dispose(): void;
    onUnbind(behavior: {
        unbind(controller: ViewController<TSource, TParent>): void;
    }): void;
    /**
     * Binds a view's behaviors to its binding source.
     * @param source - The binding source for the view's binding behaviors.
     * @param context - The execution context to run the behaviors within.
     */
    bind(source: TSource, context?: ExecutionContext<TParent>): void;
    /**
     * Unbinds a view's behaviors from its binding source.
     */
    unbind(): void;
    private evaluateUnbindables;
    /**
     * Efficiently disposes of a contiguous range of synthetic view instances.
     * @param views - A contiguous range of views to be disposed.
     */
    static disposeContiguousBatch(views: SyntheticView[]): void;
}
/** @public */
export interface HydratableView<TSource = any, TParent = any> extends ElementView, SyntheticView, DefaultExecutionContext<TParent> {
    [Hydratable]: symbol;
    readonly bindingViewBoundaries: Record<string, ViewNodes>;
    readonly hydrationStage: keyof typeof HydrationStage;
}
export interface ViewNodes {
    first: Node;
    last: Node;
}
export declare const HydrationStage: {
    readonly unhydrated: "unhydrated";
    readonly hydrating: "hydrating";
    readonly hydrated: "hydrated";
};
/** @public */
export declare class HydrationBindingError extends Error {
    /**
     * The factory that was unable to be bound
     */
    readonly factory: ViewBehaviorFactory;
    /**
     * A DocumentFragment containing a clone of the
     * view's Nodes.
     */
    readonly fragment: DocumentFragment;
    /**
     * String representation of the HTML in the template that
     * threw the binding error.
     */
    readonly templateString: string;
    constructor(
    /**
     * The error message
     */
    message: string | undefined, 
    /**
     * The factory that was unable to be bound
     */
    factory: ViewBehaviorFactory, 
    /**
     * A DocumentFragment containing a clone of the
     * view's Nodes.
     */
    fragment: DocumentFragment, 
    /**
     * String representation of the HTML in the template that
     * threw the binding error.
     */
    templateString: string);
}
export declare class HydrationView<TSource = any, TParent = any> extends DefaultExecutionContext<TParent> implements HydratableView {
    readonly firstChild: Node;
    readonly lastChild: Node;
    private sourceTemplate;
    private hostBindingTarget?;
    [Hydratable]: symbol;
    context: ExecutionContext<any>;
    source: TSource | null;
    isBound: boolean;
    get hydrationStage(): "unhydrated" | "hydrating" | "hydrated";
    get targets(): ViewBehaviorTargets;
    get bindingViewBoundaries(): ViewBehaviorBoundaries;
    readonly sourceLifetime: SourceLifetime;
    private unbindables;
    private fragment;
    private behaviors;
    private factories;
    private _hydrationStage;
    private _bindingViewBoundaries;
    private _targets;
    constructor(firstChild: Node, lastChild: Node, sourceTemplate: ViewTemplate, hostBindingTarget?: Element | undefined);
    /**
     * no-op. Hydrated views are don't need to be moved from a documentFragment
     * to the target node.
     */
    insertBefore(node: Node): void;
    /**
     * Appends the view to a node. In cases where this is called before the
     * view has been removed, the method will no-op.
     * @param node - the node to append the view to.
     */
    appendTo(node: Node): void;
    remove(): void;
    bind(source: TSource, context?: ExecutionContext<any>): void;
    unbind(): void;
    /**
     * Removes the view and unbinds its behaviors, disposing of DOM nodes afterward.
     * Once a view has been disposed, it cannot be inserted or bound again.
     */
    dispose(): void;
    onUnbind(behavior: {
        unbind(controller: ViewController<TSource, TParent>): void;
    }): void;
    private evaluateUnbindables;
}
export {};
