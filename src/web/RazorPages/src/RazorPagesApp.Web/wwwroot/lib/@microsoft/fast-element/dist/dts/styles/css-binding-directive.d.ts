import type { Binding, BindingDirective } from "../binding/binding.js";
import type { Subscriber } from "../observation/notifier.js";
import type { ExpressionObserver } from "../observation/observable.js";
import { AddBehavior, CSSDirective } from "./css-directive.js";
import type { ComposableStyles } from "./element-styles.js";
import type { HostBehavior, HostController } from "./host.js";
declare type CSSBindingEntry = {
    observer: ExpressionObserver;
    controller: HostController;
};
/**
 * Enables bindings in CSS.
 *
 * @public
 */
export declare class CSSBindingDirective implements HostBehavior, Subscriber, CSSDirective, BindingDirective {
    readonly dataBinding: Binding;
    readonly targetAspect: string;
    /**
     * Creates an instance of CSSBindingDirective.
     * @param dataBinding - The binding to use in CSS.
     * @param targetAspect - The CSS property to target.
     */
    constructor(dataBinding: Binding, targetAspect: string);
    /**
     * Creates a CSS fragment to interpolate into the CSS document.
     * @returns - the string to interpolate into CSS
     */
    createCSS(add: AddBehavior): ComposableStyles;
    /**
     * Executed when this behavior is attached to a controller.
     * @param controller - Controls the behavior lifecycle.
     */
    addedCallback(controller: HostController<HTMLElement & {
        $cssBindings: Map<CSSBindingDirective, CSSBindingEntry>;
    }>): void;
    /**
     * Executed when this behavior's host is connected.
     * @param controller - Controls the behavior lifecycle.
     */
    connectedCallback(controller: HostController<HTMLElement & {
        $cssBindings: Map<CSSBindingDirective, CSSBindingEntry>;
    }>): void;
    /**
     * Executed when this behavior is detached from a controller.
     * @param controller - Controls the behavior lifecycle.
     */
    removedCallback(controller: HostController<HTMLElement & {
        $cssBindings: Map<CSSBindingDirective, CSSBindingEntry>;
    }>): void;
    /**
     * Called when a subject this instance has subscribed to changes.
     * @param subject - The subject of the change.
     * @param args - The event args detailing the change that occurred.
     *
     * @internal
     */
    handleChange(_: any, observer: ExpressionObserver): void;
}
export {};
