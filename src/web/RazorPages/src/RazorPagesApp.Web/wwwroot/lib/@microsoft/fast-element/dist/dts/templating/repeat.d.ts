import { Splice } from "../observation/arrays.js";
import type { Subscriber } from "../observation/notifier.js";
import { Expression, ExpressionObserver } from "../observation/observable.js";
import type { Binding, BindingDirective } from "../binding/binding.js";
import { AddViewBehaviorFactory, HTMLDirective, ViewBehavior, ViewBehaviorFactory, ViewController } from "./html-directive.js";
import type { CaptureType, SyntheticViewTemplate, ViewTemplate } from "./template.js";
import { SyntheticView } from "./view.js";
/**
 * Options for configuring repeat behavior.
 * @public
 */
export interface RepeatOptions {
    /**
     * Enables index, length, and dependent positioning updates in item templates.
     */
    positioning?: boolean;
    /**
     * Enables view recycling
     */
    recycle?: boolean;
}
export declare class HydrationRepeatError extends Error {
    readonly propertyBag: {
        index: number;
        hydrationStage: string;
        itemsLength?: number;
        viewsState: string[];
        viewTemplateString?: string;
        rootNodeContent: string;
    };
    constructor(
    /**
     * The error message
     */
    message: string | undefined, propertyBag: {
        index: number;
        hydrationStage: string;
        itemsLength?: number;
        viewsState: string[];
        viewTemplateString?: string;
        rootNodeContent: string;
    });
}
/**
 * A behavior that renders a template for each item in an array.
 * @public
 */
export declare class RepeatBehavior<TSource = any> implements ViewBehavior, Subscriber {
    private directive;
    private location;
    private controller;
    private template;
    private templateBindingObserver;
    private items;
    private itemsObserver;
    private itemsBindingObserver;
    private bindView;
    /** @internal */
    views: SyntheticView[];
    /**
     * Creates an instance of RepeatBehavior.
     * @param location - The location in the DOM to render the repeat.
     * @param dataBinding - The array to render.
     * @param isItemsBindingVolatile - Indicates whether the items binding has volatile dependencies.
     * @param templateBinding - The template to render for each item.
     * @param isTemplateBindingVolatile - Indicates whether the template binding has volatile dependencies.
     * @param options - Options used to turn on special repeat features.
     */
    constructor(directive: RepeatDirective);
    /**
     * Bind this behavior.
     * @param controller - The view controller that manages the lifecycle of this behavior.
     */
    bind(controller: ViewController): void;
    /**
     * Unbinds this behavior.
     */
    unbind(): void;
    /**
     * Handles changes in the array, its items, and the repeat template.
     * @param source - The source of the change.
     * @param args - The details about what was changed.
     */
    handleChange(source: any, args: Splice[] | ExpressionObserver): void;
    private observeItems;
    private updateViews;
    private refreshAllViews;
    private unbindAllViews;
    private hydrateViews;
}
/**
 * A directive that configures list rendering.
 * @public
 */
export declare class RepeatDirective<TSource = any> implements HTMLDirective, ViewBehaviorFactory, BindingDirective {
    readonly dataBinding: Binding<TSource>;
    readonly templateBinding: Binding<TSource, SyntheticViewTemplate>;
    readonly options: RepeatOptions;
    /**
     * The structural id of the DOM node to which the created behavior will apply.
     */
    targetNodeId: string;
    /**
     * Creates a placeholder string based on the directive's index within the template.
     * @param index - The index of the directive within the template.
     */
    createHTML(add: AddViewBehaviorFactory): string;
    /**
     * Creates an instance of RepeatDirective.
     * @param dataBinding - The binding that provides the array to render.
     * @param templateBinding - The template binding used to obtain a template to render for each item in the array.
     * @param options - Options used to turn on special repeat features.
     */
    constructor(dataBinding: Binding<TSource>, templateBinding: Binding<TSource, SyntheticViewTemplate>, options: RepeatOptions);
    /**
     * Creates a behavior for the provided target node.
     * @param target - The node instance to create the behavior for.
     */
    createBehavior(): RepeatBehavior<TSource>;
}
/**
 * A directive that enables list rendering.
 * @param items - The array to render.
 * @param template - The template or a template binding used obtain a template
 * to render for each item in the array.
 * @param options - Options used to turn on special repeat features.
 * @public
 */
export declare function repeat<TSource = any, TArray extends ReadonlyArray<any> = ReadonlyArray<any>, TParent = any>(items: Expression<TSource, TArray, TParent> | Binding<TSource, TArray, TParent> | ReadonlyArray<any>, template: Expression<TSource, ViewTemplate<any, TSource>> | Binding<TSource, ViewTemplate<any, TSource>> | ViewTemplate<any, TSource>, options?: RepeatOptions): CaptureType<TSource, TParent>;
