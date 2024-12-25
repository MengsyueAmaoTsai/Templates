import type { StyleStrategy, StyleTarget } from "./style-strategy.js";
import type { HostBehavior } from "./host.js";
/**
 * Represents styles that can be composed into the ShadowDOM of a custom element.
 * @public
 */
export declare type ComposableStyles = string | ElementStyles | CSSStyleSheet;
/**
 * A type that instantiates a StyleStrategy.
 * @public
 */
export declare type ConstructibleStyleStrategy = {
    /**
     * Creates an instance of the strategy.
     * @param styles - The styles to initialize the strategy with.
     */
    new (styles: (string | CSSStyleSheet)[]): StyleStrategy;
};
/**
 * Represents styles that can be applied to a custom element.
 * @public
 */
export declare class ElementStyles {
    readonly styles: ReadonlyArray<ComposableStyles>;
    private targets;
    private _strategy;
    /**
     * The behaviors associated with this set of styles.
     */
    readonly behaviors: ReadonlyArray<HostBehavior<HTMLElement>> | null;
    /**
     * Gets the StyleStrategy associated with these element styles.
     */
    get strategy(): StyleStrategy;
    /**
     * Creates an instance of ElementStyles.
     * @param styles - The styles that will be associated with elements.
     */
    constructor(styles: ReadonlyArray<ComposableStyles>);
    /** @internal */
    addStylesTo(target: StyleTarget): void;
    /** @internal */
    removeStylesFrom(target: StyleTarget): void;
    /** @internal */
    isAttachedTo(target: StyleTarget): boolean;
    /**
     * Associates behaviors with this set of styles.
     * @param behaviors - The behaviors to associate.
     */
    withBehaviors(...behaviors: HostBehavior<HTMLElement>[]): this;
    /**
     * Sets the strategy that handles adding/removing these styles for an element.
     * @param strategy - The strategy to use.
     */
    withStrategy(Strategy: ConstructibleStyleStrategy): this;
    /**
     * Sets the default strategy type to use when creating style strategies.
     * @param Strategy - The strategy type to construct.
     */
    static setDefaultStrategy(Strategy: ConstructibleStyleStrategy): void;
    /**
     * Normalizes a set of composable style options.
     * @param styles - The style options to normalize.
     * @returns A singular ElementStyles instance or undefined.
     */
    static normalize(styles: ComposableStyles | ComposableStyles[] | undefined): ElementStyles | undefined;
    /**
     * Indicates whether the DOM supports the adoptedStyleSheets feature.
     */
    static readonly supportsAdoptedStyleSheets: boolean;
}
