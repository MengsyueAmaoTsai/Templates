import { PropertyChangeNotifier } from "../observation/notifier.js";
import { ExecutionContext, ExpressionController, SourceLifetime } from "../observation/observable.js";
import { ElementStyles } from "../styles/element-styles.js";
import type { HostBehavior, HostController } from "../styles/host.js";
import type { StyleStrategy, StyleTarget } from "../styles/style-strategy.js";
import type { ElementViewTemplate } from "../templating/template.js";
import type { ElementView } from "../templating/view.js";
import { FASTElementDefinition } from "./fast-definitions.js";
/**
 * A type that instantiates an ElementController
 * @public
 */
export interface ElementControllerStrategy {
    new (element: HTMLElement, definition: FASTElementDefinition): ElementController;
}
declare const enum Stages {
    connecting = 0,
    connected = 1,
    disconnecting = 2,
    disconnected = 3
}
/**
 * Controls the lifecycle and rendering of a `FASTElement`.
 * @public
 */
export declare class ElementController<TElement extends HTMLElement = HTMLElement> extends PropertyChangeNotifier implements HostController<TElement> {
    private boundObservables;
    protected needsInitialization: boolean;
    private hasExistingShadowRoot;
    private _template;
    protected stage: Stages;
    /**
     * A guard against connecting behaviors multiple times
     * during connect in scenarios where a behavior adds
     * another behavior during it's connectedCallback
     */
    private guardBehaviorConnection;
    protected behaviors: Map<HostBehavior<TElement>, number> | null;
    /**
     * Tracks whether behaviors are connected so that
     * behaviors cant be connected multiple times
     */
    private behaviorsConnected;
    private _mainStyles;
    /**
     * This allows Observable.getNotifier(...) to return the Controller
     * when the notifier for the Controller itself is being requested. The
     * result is that the Observable system does not need to create a separate
     * instance of Notifier for observables on the Controller. The component and
     * the controller will now share the same notifier, removing one-object construct
     * per web component instance.
     */
    private readonly $fastController;
    /**
     * The element being controlled by this controller.
     */
    readonly source: TElement;
    /**
     * The element definition that instructs this controller
     * in how to handle rendering and other platform integrations.
     */
    readonly definition: FASTElementDefinition;
    /**
     * The view associated with the custom element.
     * @remarks
     * If `null` then the element is managing its own rendering.
     */
    readonly view: ElementView<TElement> | null;
    /**
     * Indicates whether or not the custom element has been
     * connected to the document.
     */
    get isConnected(): boolean;
    /**
     * The context the expression is evaluated against.
     */
    get context(): ExecutionContext;
    /**
     * Indicates whether the controller is bound.
     */
    get isBound(): boolean;
    /**
     * Indicates how the source's lifetime relates to the controller's lifetime.
     */
    get sourceLifetime(): SourceLifetime | undefined;
    /**
     * Gets/sets the template used to render the component.
     * @remarks
     * This value can only be accurately read after connect but can be set at any time.
     */
    get template(): ElementViewTemplate<TElement> | null;
    set template(value: ElementViewTemplate<TElement> | null);
    /**
     * The main set of styles used for the component, independent
     * of any dynamically added styles.
     */
    get mainStyles(): ElementStyles | null;
    set mainStyles(value: ElementStyles | null);
    /**
     * Creates a Controller to control the specified element.
     * @param element - The element to be controlled by this controller.
     * @param definition - The element definition metadata that instructs this
     * controller in how to handle rendering and other platform integrations.
     * @internal
     */
    constructor(element: TElement, definition: FASTElementDefinition);
    /**
     * Registers an unbind handler with the controller.
     * @param behavior - An object to call when the controller unbinds.
     */
    onUnbind(behavior: {
        unbind(controller: ExpressionController<TElement>): any;
    }): void;
    /**
     * Adds the behavior to the component.
     * @param behavior - The behavior to add.
     */
    addBehavior(behavior: HostBehavior<TElement>): void;
    /**
     * Removes the behavior from the component.
     * @param behavior - The behavior to remove.
     * @param force - Forces removal even if this behavior was added more than once.
     */
    removeBehavior(behavior: HostBehavior<TElement>, force?: boolean): void;
    /**
     * Adds styles to this element. Providing an HTMLStyleElement will attach the element instance to the shadowRoot.
     * @param styles - The styles to add.
     */
    addStyles(styles: ElementStyles | HTMLStyleElement | null | undefined): void;
    /**
     * Removes styles from this element. Providing an HTMLStyleElement will detach the element instance from the shadowRoot.
     * @param styles - the styles to remove.
     */
    removeStyles(styles: ElementStyles | HTMLStyleElement | null | undefined): void;
    /**
     * Runs connected lifecycle behavior on the associated element.
     */
    connect(): void;
    protected bindObservables(): void;
    protected connectBehaviors(): void;
    protected disconnectBehaviors(): void;
    /**
     * Runs disconnected lifecycle behavior on the associated element.
     */
    disconnect(): void;
    /**
     * Runs the attribute changed callback for the associated element.
     * @param name - The name of the attribute that changed.
     * @param oldValue - The previous value of the attribute.
     * @param newValue - The new value of the attribute.
     */
    onAttributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    /**
     * Emits a custom HTML event.
     * @param type - The type name of the event.
     * @param detail - The event detail object to send with the event.
     * @param options - The event options. By default bubbles and composed.
     * @remarks
     * Only emits events if connected.
     */
    emit(type: string, detail?: any, options?: Omit<CustomEventInit, "detail">): void | boolean;
    protected renderTemplate(template: ElementViewTemplate | null | undefined): void;
    /**
     * Locates or creates a controller for the specified element.
     * @param element - The element to return the controller for.
     * @remarks
     * The specified element must have a {@link FASTElementDefinition}
     * registered either through the use of the {@link customElement}
     * decorator or a call to `FASTElement.define`.
     */
    static forCustomElement(element: HTMLElement): ElementController;
    /**
     * Sets the strategy that ElementController.forCustomElement uses to construct
     * ElementController instances for an element.
     * @param strategy - The strategy to use.
     */
    static setStrategy(strategy: ElementControllerStrategy): void;
}
/**
 * https://wicg.github.io/construct-stylesheets/
 * https://developers.google.com/web/updates/2019/02/constructable-stylesheets
 *
 * @internal
 */
export declare class AdoptedStyleSheetsStrategy implements StyleStrategy {
    private static styleSheetCache;
    /** @internal */
    readonly sheets: CSSStyleSheet[];
    constructor(styles: (string | CSSStyleSheet)[]);
    addStylesTo(target: StyleTarget): void;
    removeStylesFrom(target: StyleTarget): void;
}
/**
 * @internal
 */
export declare class StyleElementStrategy implements StyleStrategy {
    private readonly styles;
    private readonly styleClass;
    constructor(styles: string[]);
    addStylesTo(target: StyleTarget): void;
    removeStylesFrom(target: StyleTarget): void;
}
/**
 * An ElementController capable of hydrating FAST elements from
 * Declarative Shadow DOM.
 *
 * @beta
 */
export declare class HydratableElementController<TElement extends HTMLElement = HTMLElement> extends ElementController<TElement> {
    /**
     * Controls whether the controller will hydrate during the connect() method.
     * Initialized during the first connect() call to true when the `needs-hydration`
     * attribute is present on the element.
     */
    protected needsHydration?: boolean;
    private static hydrationObserver;
    private static hydrationObserverHandler;
    connect(): void;
    disconnect(): void;
    static install(): void;
}
export {};
