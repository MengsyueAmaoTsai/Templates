import type { DOMPolicy } from "../dom.js";
import { Expression } from "../observation/observable.js";
import { Binding, BindingDirective } from "./binding.js";
/**
 * The twoWay binding options.
 * @public
 */
export declare type TwoWayBindingOptions = {
    changeEvent?: string;
    fromView?: (value: any) => any;
};
/**
 * The settings required to enable two-way binding.
 * @public
 */
export interface TwoWaySettings {
    /**
     * Determines which event to listen to, to detect changes in the view.
     * @param bindingSource - The directive to determine the change event for.
     * @param target - The target element to determine the change event for.
     */
    determineChangeEvent(bindingSource: BindingDirective, target: HTMLElement): string;
}
/**
 * Enables configuring two-way binding settings.
 */
export declare const TwoWaySettings: Readonly<{
    /**
     * Configures two-way binding.
     * @param settings - The settings to use for the two-way binding system.
     */
    configure(settings: TwoWaySettings): void;
}>;
/**
 * Creates a default binding.
 * @param expression - The binding to refresh when changed.
 * @param optionsOrChangeEvent - The binding options or the name of the change event to use.
 * @param policy - The security policy to associate with the binding.
 * @param isBindingVolatile - Indicates whether the binding is volatile or not.
 * @returns A binding.
 * @public
 */
export declare function twoWay<T = any>(expression: Expression<T>, optionsOrChangeEvent?: TwoWayBindingOptions | string, policy?: DOMPolicy, isBindingVolatile?: boolean): Binding<T>;
