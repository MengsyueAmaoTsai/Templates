/**
 * Represents a getter/setter property accessor on an object.
 * @public
 */
export declare interface Accessor {
    /**
     * The name of the property.
     */
    name: string;
    /**
     * Gets the value of the property on the source object.
     * @param source - The source object to access.
     */
    getValue(source: any): any;
    /**
     * Sets the value of the property on the source object.
     * @param source - The source object to access.
     * @param value - The value to set the property to.
     */
    setValue(source: any, value: any): void;
}

/**
 * Used to add behaviors when constructing styles.
 * @public
 */
export declare type AddBehavior = (behavior: HostBehavior<HTMLElement>) => void;

/**
 * Used to add behavior factories when constructing templates.
 * @public
 */
export declare type AddViewBehaviorFactory = (factory: ViewBehaviorFactory) => string;

/**
 * An observer for arrays.
 * @public
 */
export declare interface ArrayObserver extends SubscriberSet {
    /**
     * The strategy to use for tracking changes.
     */
    strategy: SpliceStrategy | null;
    /**
     * The length observer for the array.
     */
    readonly lengthObserver: LengthObserver;
    /**
     * Adds a splice to the list of changes.
     * @param splice - The splice to add.
     */
    addSplice(splice: Splice): void;
    /**
     * Indicates that a reset change has occurred.
     * @param oldCollection - The collection as it was before the reset.
     */
    reset(oldCollection: any[] | undefined): void;
    /**
     * Flushes the changes to subscribers.
     */
    flush(): void;
}

/**
 * An observer for arrays.
 * @public
 */
export declare const ArrayObserver: Readonly<{
    /**
     * Enables the array observation mechanism.
     * @remarks
     * Array observation is enabled automatically when using the
     * {@link RepeatDirective}, so calling this API manually is
     * not typically necessary.
     */
    readonly enable: () => void;
}>;

/**
 * Represents something that applies to a specific aspect of the DOM.
 * @public
 */
export declare interface Aspected {
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
 * Decorator: Specifies an HTML attribute.
 * @param config - The configuration for the attribute.
 * @public
 */
export declare function attr(config?: DecoratorAttributeConfiguration): (target: {}, property: string) => void;

/**
 * Decorator:  Specifies an HTML attribute.
 * @param target - The class to define the attribute on.
 * @param prop - The property name to be associated with the attribute.
 * @public
 */
export declare function attr(target: {}, prop: string): void;

/**
 * Metadata used to configure a custom attribute's behavior.
 * @public
 */
export declare type AttributeConfiguration = {
    property: string;
    attribute?: string;
    mode?: AttributeMode;
    converter?: ValueConverter;
};

/**
 * Metadata used to configure a custom attribute's behavior.
 * @public
 */
export declare const AttributeConfiguration: Readonly<{
    /**
     * Locates all attribute configurations associated with a type.
     */
    locate: (target: {}) => AttributeConfiguration[];
}>;

/**
 * An implementation of {@link Accessor} that supports reactivity,
 * change callbacks, attribute reflection, and type conversion for
 * custom elements.
 * @public
 */
export declare class AttributeDefinition implements Accessor {
    private readonly fieldName;
    private readonly callbackName;
    private readonly hasCallback;
    private readonly guards;
    /**
     * The class constructor that owns this attribute.
     */
    readonly Owner: Function;
    /**
     * The name of the property associated with the attribute.
     */
    readonly name: string;
    /**
     * The name of the attribute in HTML.
     */
    readonly attribute: string;
    /**
     * The {@link AttributeMode} that describes the behavior of this attribute.
     */
    readonly mode: AttributeMode;
    /**
     * A {@link ValueConverter} that integrates with the property getter/setter
     * to convert values to and from a DOM string.
     */
    readonly converter?: ValueConverter;
    /**
     * Creates an instance of AttributeDefinition.
     * @param Owner - The class constructor that owns this attribute.
     * @param name - The name of the property associated with the attribute.
     * @param attribute - The name of the attribute in HTML.
     * @param mode - The {@link AttributeMode} that describes the behavior of this attribute.
     * @param converter - A {@link ValueConverter} that integrates with the property getter/setter
     * to convert values to and from a DOM string.
     */
    constructor(Owner: Function, name: string, attribute?: string, mode?: AttributeMode, converter?: ValueConverter);
    /**
     * Sets the value of the attribute/property on the source element.
     * @param source - The source element to access.
     * @param newValue - The value to set the attribute/property to.
     */
    setValue(source: HTMLElement, newValue: any): void;
    /**
     * Gets the value of the attribute/property on the source element.
     * @param source - The source element to access.
     */
    getValue(source: HTMLElement): any;
    /** @internal */
    onAttributeChangedCallback(element: HTMLElement, value: any): void;
    private tryReflectToAttribute;
    /**
     * Collects all attribute definitions associated with the owner.
     * @param Owner - The class constructor to collect attribute for.
     * @param attributeLists - Any existing attributes to collect and merge with those associated with the owner.
     * @internal
     */
    static collect(Owner: Function, ...attributeLists: (ReadonlyArray<string | AttributeConfiguration> | undefined)[]): ReadonlyArray<AttributeDefinition>;
}

/**
 * The mode that specifies the runtime behavior of the attribute.
 * @remarks
 * By default, attributes run in `reflect` mode, propagating their property
 * values to the DOM and DOM values to the property. The `boolean` mode also
 * reflects values, but uses the HTML standard boolean attribute behavior,
 * interpreting the presence of the attribute as `true` and the absence as
 * `false`. The `fromView` behavior only updates the  property value based on
 * changes in the DOM, but does not reflect property changes back.
 * @public
 */
export declare type AttributeMode = typeof reflectMode | typeof booleanMode | "fromView";

/**
 * Captures a binding expression along with related information and capabilities.
 *
 * @public
 */
export declare abstract class Binding<TSource = any, TReturn = any, TParent = any> {
    evaluate: Expression<TSource, TReturn, TParent>;
    policy?: DOMPolicy | undefined;
    isVolatile: boolean;
    /**
     * Options associated with the binding.
     */
    options?: any;
    /**
     * Creates a binding.
     * @param evaluate - Evaluates the binding.
     * @param policy - The security policy to associate with this binding.
     * @param isVolatile - Indicates whether the binding is volatile.
     */
    constructor(evaluate: Expression<TSource, TReturn, TParent>, policy?: DOMPolicy | undefined, isVolatile?: boolean);
    /**
     * Creates an observer capable of notifying a subscriber when the output of a binding changes.
     * @param subscriber - The subscriber to changes in the binding.
     * @param directive - The Binding directive to create the observer for.
     */
    abstract createObserver(subscriber: Subscriber, directive: BindingDirective): ExpressionObserver<TSource, TReturn, TParent>;
}

/**
 * The directive from which a binding originates.
 *
 * @public
 */
export declare interface BindingDirective {
    /**
     * The binding.
     */
    readonly dataBinding: Binding;
    /**
     * The evaluated target aspect.
     */
    readonly targetAspect?: string;
    /**
     * The type of aspect to target.
     */
    readonly aspectType?: DOMAspect;
}

/**
 * A {@link ValueConverter} that converts to and from `boolean` values.
 * @remarks
 * Used automatically when the `boolean` {@link AttributeMode} is selected.
 * @public
 */
export declare const booleanConverter: ValueConverter;

declare const booleanMode = "boolean";

/**
 * Represents a callable type such as a function or an object with a "call" method.
 * @public
 */
export declare type Callable = typeof Function.prototype.call | {
    call(): void;
};

/**
 * A marker interface used to capture types when interpolating Directive helpers
 * into templates.
 * @public
 */
export declare interface CaptureType<TSource, TParent> {
}

/**
 * The options used to configure child list observation.
 * @public
 */
export declare interface ChildListDirectiveOptions<T = any> extends NodeBehaviorOptions<T>, Omit<MutationObserverInit, "subtree" | "childList"> {
}

/**
 * A directive that observes the `childNodes` of an element and updates a property
 * whenever they change.
 * @param propertyOrOptions - The options used to configure child node observation.
 * @public
 */
export declare function children<TSource = any, TParent = any>(propertyOrOptions: (keyof TSource & string) | ChildrenDirectiveOptions<keyof TSource & string>): CaptureType<TSource, TParent>;

/**
 * The runtime behavior for child node observation.
 * @public
 */
export declare class ChildrenDirective extends NodeObservationDirective<ChildrenDirectiveOptions> {
    private observerProperty;
    /**
     * Creates an instance of ChildrenDirective.
     * @param options - The options to use in configuring the child observation behavior.
     */
    constructor(options: ChildrenDirectiveOptions);
    /**
     * Begins observation of the nodes.
     * @param target - The target to observe.
     */
    observe(target: any): void;
    /**
     * Disconnects observation of the nodes.
     * @param target - The target to unobserve.
     */
    disconnect(target: any): void;
    /**
     * Retrieves the raw nodes that should be assigned to the source property.
     * @param target - The target to get the node to.
     */
    getNodes(target: Element): Node[];
    private handleEvent;
}

/**
 * The options used to configure child/subtree node observation.
 * @public
 */
export declare type ChildrenDirectiveOptions<T = any> = ChildListDirectiveOptions<T> | SubtreeDirectiveOptions<T>;

/**
 * Represents a constructable class with a prototype.
 * @public
 */
export declare type Class<T, C = {}> = C & Constructable<T> & {
    /**
     * The class's prototype;
     */
    readonly prototype: T;
};

/**
 * A function capable of compiling a template from the preprocessed form produced
 * by the html template function into a result that can instantiate views.
 * @public
 */
export declare type CompilationStrategy = (
/**
 * The preprocessed HTML string or template to compile.
 */
html: string | HTMLTemplateElement, 
/**
 * The behavior factories used within the html that is being compiled.
 */
factories: Record<string, ViewBehaviorFactory>, 
/**
 * The security policy to compile the html with.
 */
policy: DOMPolicy) => HTMLTemplateCompilationResult;

/**
 * Represents a ViewBehaviorFactory after the compilation process has completed.
 * @public
 */
export declare type CompiledViewBehaviorFactory = Required<ViewBehaviorFactory>;

/**
 * Common APIs related to compilation.
 * @public
 */
export declare const Compiler: {
    /**
     * Compiles a template and associated directives into a compilation
     * result which can be used to create views.
     * @param html - The html string or template element to compile.
     * @param factories - The behavior factories referenced by the template.
     * @param policy - The security policy to compile the html with.
     * @remarks
     * The template that is provided for compilation is altered in-place
     * and cannot be compiled again. If the original template must be preserved,
     * it is recommended that you clone the original and pass the clone to this API.
     * @public
     */
    compile<TSource = any, TParent = any>(html: string | HTMLTemplateElement, factories: Record<string, ViewBehaviorFactory>, policy?: DOMPolicy): HTMLTemplateCompilationResult<TSource, TParent>;
    /**
     * Sets the default compilation strategy that will be used by the ViewTemplate whenever
     * it needs to compile a view preprocessed with the html template function.
     * @param strategy - The compilation strategy to use when compiling templates.
     */
    setDefaultStrategy(strategy: CompilationStrategy): void;
    /**
     * Aggregates an array of strings and directives into a single directive.
     * @param parts - A heterogeneous array of static strings interspersed with
     * directives.
     * @param policy - The security policy to use with the aggregated bindings.
     * @returns A single inline directive that aggregates the behavior of all the parts.
     */
    aggregate(parts: (string | ViewBehaviorFactory)[], policy?: DOMPolicy): ViewBehaviorFactory;
};

/**
 * Represents styles that can be composed into the ShadowDOM of a custom element.
 * @public
 */
export declare type ComposableStyles = string | ElementStyles | CSSStyleSheet;

declare function compose<TType extends Constructable<HTMLElement> = Constructable<HTMLElement>>(this: TType, nameOrDef: string | PartialFASTElementDefinition): FASTElementDefinition<TType>;

declare function compose<TType extends Constructable<HTMLElement> = Constructable<HTMLElement>>(type: TType, nameOrDef?: string | PartialFASTElementDefinition): FASTElementDefinition<TType>;

/**
 * Represents a type which can be constructed with the new operator.
 *
 * @public
 */
export declare type Constructable<T = {}> = {
    new (...args: any[]): T;
};

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
 * A simple template that can create ContentView instances.
 * @public
 */
export declare interface ContentTemplate {
    /**
     * Creates a simple content view instance.
     */
    create(): ContentView;
}

/**
 * A simple View that can be interpolated into HTML content.
 * @public
 */
export declare interface ContentView {
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
 * Transforms a template literal string into styles.
 * @param strings - The string fragments that are interpolated with the values.
 * @param values - The values that are interpolated with the string fragments.
 * @remarks
 * The css helper supports interpolation of strings and ElementStyle instances.
 * @public
 */
export declare const css: CSSTemplateTag;

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

declare type CSSBindingEntry = {
    observer: ExpressionObserver;
    controller: HostController;
};

/**
 * Directive for use in {@link css}.
 *
 * @public
 */
export declare interface CSSDirective {
    /**
     * Creates a CSS fragment to interpolate into the CSS document.
     * @returns - the string to interpolate into CSS
     */
    createCSS(add: AddBehavior): ComposableStyles;
}

/**
 * Instructs the css engine to provide dynamic styles or
 * associate behaviors with styles.
 * @public
 */
export declare const CSSDirective: Readonly<{
    /**
     * Gets the directive definition associated with the instance.
     * @param instance - The directive instance to retrieve the definition for.
     */
    getForInstance: (object: any) => CSSDirectiveDefinition<Constructable<CSSDirective>> | undefined;
    /**
     * Gets the directive definition associated with the specified type.
     * @param type - The directive type to retrieve the definition for.
     */
    getByType: (key: Function) => CSSDirectiveDefinition<Constructable<CSSDirective>> | undefined;
    /**
     * Defines a CSSDirective.
     * @param type - The type to define as a directive.
     */
    define<TType extends Constructable<CSSDirective>>(type: any): TType;
}>;

/**
 * Decorator: Defines a CSSDirective.
 * @public
 */
export declare function cssDirective(): (type: Constructable<CSSDirective>) => void;

/**
 * Defines metadata for a CSSDirective.
 * @public
 */
export declare interface CSSDirectiveDefinition<TType extends Constructable<CSSDirective> = Constructable<CSSDirective>> {
    /**
     * The type that the definition provides metadata for.
     */
    readonly type: TType;
}

/**
 * Transforms a template literal string into styles.
 * @param strings - The string fragments that are interpolated with the values.
 * @param values - The values that are interpolated with the string fragments.
 * @remarks
 * The css helper supports interpolation of strings and ElementStyle instances.
 * Use the .partial method to create partial CSS fragments.
 * @public
 */
export declare type CSSTemplateTag = (<TSource = any, TParent = any>(strings: TemplateStringsArray, ...values: CSSValue<TSource, TParent>[]) => ElementStyles) & {
    /**
     * Transforms a template literal string into partial CSS.
     * @param strings - The string fragments that are interpolated with the values.
     * @param values - The values that are interpolated with the string fragments.
     * @public
     */
    partial<TSource = any, TParent = any>(strings: TemplateStringsArray, ...values: CSSValue<TSource, TParent>[]): CSSDirective;
};

/**
 * Represents the types of values that can be interpolated into a template.
 * @public
 */
export declare type CSSValue<TSource, TParent = any> = Expression<TSource, any, TParent> | Binding<TSource, any, TParent> | ComposableStyles | CSSDirective;

/**
 * Decorator: Defines a platform custom element based on `FASTElement`.
 * @param nameOrDef - The name of the element to define or a definition object
 * that describes the element to define.
 * @public
 */
export declare function customElement(nameOrDef: string | PartialFASTElementDefinition): (type: Constructable<HTMLElement>) => void;

/**
 * Metadata used to configure a custom attribute's behavior through a decorator.
 * @public
 */
export declare type DecoratorAttributeConfiguration = Omit<AttributeConfiguration, "property">;

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

declare function define<TType extends Constructable<HTMLElement> = Constructable<HTMLElement>>(this: TType, nameOrDef: string | PartialFASTElementDefinition): TType;

declare function define<TType extends Constructable<HTMLElement> = Constructable<HTMLElement>>(type: TType, nameOrDef?: string | PartialFASTElementDefinition): TType;

/**
 * Provides a mechanism for releasing resources.
 * @public
 */
export declare interface Disposable {
    /**
     * Disposes the resources.
     */
    dispose(): void;
}

/**
 * Common DOM APIs.
 * @public
 */
export declare const DOM: Readonly<{
    /**
     * Gets the dom policy used by the templating system.
     */
    readonly policy: DOMPolicy;
    /**
     * Sets the dom policy used by the templating system.
     * @param policy - The policy to set.
     * @remarks
     * This API can only be called once, for security reasons. It should be
     * called by the application developer at the start of their program.
     */
    setPolicy(value: DOMPolicy): void;
    /**
     * Sets an attribute value on an element.
     * @param element - The element to set the attribute value on.
     * @param attributeName - The attribute name to set.
     * @param value - The value of the attribute to set.
     * @remarks
     * If the value is `null` or `undefined`, the attribute is removed, otherwise
     * it is set to the provided value using the standard `setAttribute` API.
     */
    setAttribute(element: HTMLElement, attributeName: string, value: any): void;
    /**
     * Sets a boolean attribute value.
     * @param element - The element to set the boolean attribute value on.
     * @param attributeName - The attribute name to set.
     * @param value - The value of the attribute to set.
     * @remarks
     * If the value is true, the attribute is added; otherwise it is removed.
     */
    setBooleanAttribute(element: HTMLElement, attributeName: string, value: boolean): void;
}>;

/**
 * The type of HTML aspect to target.
 * @public
 */
export declare const DOMAspect: Readonly<{
    /**
     * Not aspected.
     */
    readonly none: 0;
    /**
     * An attribute.
     */
    readonly attribute: 1;
    /**
     * A boolean attribute.
     */
    readonly booleanAttribute: 2;
    /**
     * A property.
     */
    readonly property: 3;
    /**
     * Content
     */
    readonly content: 4;
    /**
     * A token list.
     */
    readonly tokenList: 5;
    /**
     * An event.
     */
    readonly event: 6;
}>;

/**
 * The type of HTML aspect to target.
 * @public
 */
export declare type DOMAspect = (typeof DOMAspect)[Exclude<keyof typeof DOMAspect, "none">];

/**
 * A security policy that FAST can use to interact with the DOM.
 * @public
 */
export declare interface DOMPolicy {
    /**
     * Creates safe HTML from the provided value.
     * @param value - The source to convert to safe HTML.
     */
    createHTML(value: string): string;
    /**
     * Protects a DOM sink that intends to write to the DOM.
     * @param tagName - The tag name for the element to write to.
     * @param aspect - The aspect of the DOM to write to.
     * @param aspectName - The name of the aspect to write to.
     * @param sink - The sink that is used to write to the DOM.
     */
    protect(tagName: string | null, aspect: DOMAspect, aspectName: string, sink: DOMSink): DOMSink;
}

/**
 * A function used to send values to a DOM sink.
 * @public
 */
export declare type DOMSink = (target: Node, aspectName: string, value: any, ...args: any[]) => void;

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
 * A type that instantiates an ElementController
 * @public
 */
export declare interface ElementControllerStrategy {
    new (element: HTMLElement, definition: FASTElementDefinition): ElementController;
}

/**
 * Creates a function that can be used to filter a Node array, selecting only elements.
 * @param selector - An optional selector to restrict the filter to.
 * @public
 */
export declare const elements: (selector?: string) => ElementsFilter;

/**
 * Elements filter function type.
 *
 * @public
 */
export declare type ElementsFilter = (value: Node, index?: number, array?: Node[]) => boolean;

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

/**
 * A View representing DOM nodes specifically for rendering the view of a custom element.
 * @public
 */
export declare interface ElementView<TSource = any, TParent = any> extends View<TSource, TParent> {
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
 * A template capable of creating views specifically for rendering custom elements.
 * @public
 */
export declare interface ElementViewTemplate<TSource = any, TParent = any> {
    /**
     * Creates an ElementView instance based on this template definition.
     * @param hostBindingTarget - The element that host behaviors will be bound to.
     */
    create(hostBindingTarget: Element): ElementView<TSource, TParent>;
    /**
     * Creates an HTMLView from this template, binds it to the source, and then appends it to the host.
     * @param source - The data source to bind the template to.
     * @param host - The Element where the template will be rendered.
     * @param hostBindingTarget - An HTML element to target the host bindings at if different from the
     * host that the template is being attached to.
     */
    render(source: TSource, host: Node, hostBindingTarget?: Element): ElementView<TSource, TParent>;
}

/**
 * A readonly, empty array.
 * @remarks
 * Typically returned by APIs that return arrays when there are
 * no actual items to return.
 * @public
 */
export declare const emptyArray: readonly never[];

/**
 * Provides additional contextual information available to behaviors and expressions.
 * @public
 */
export declare interface ExecutionContext<TParent = any> {
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
    parent: TParent;
    /**
     * The parent execution context when in nested context scenarios.
     */
    parentContext: ExecutionContext<TParent>;
    /**
     * The current event within an event handler.
     */
    readonly event: Event;
    /**
     * Indicates whether the current item within a repeat context
     * has an even index.
     */
    readonly isEven: boolean;
    /**
     * Indicates whether the current item within a repeat context
     * has an odd index.
     */
    readonly isOdd: boolean;
    /**
     * Indicates whether the current item within a repeat context
     * is the first item in the collection.
     */
    readonly isFirst: boolean;
    /**
     * Indicates whether the current item within a repeat context
     * is somewhere in the middle of the collection.
     */
    readonly isInMiddle: boolean;
    /**
     * Indicates whether the current item within a repeat context
     * is the last item in the collection.
     */
    readonly isLast: boolean;
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
 * Provides additional contextual information available to behaviors and expressions.
 * @public
 */
export declare const ExecutionContext: Readonly<{
    /**
     * A default execution context.
     */
    default: ExecutionContext<any>;
    /**
     * Gets the current event.
     * @returns An event object.
     */
    getEvent(): Event | null;
    /**
     * Sets the current event.
     * @param event - An event object.
     */
    setEvent(event: Event | null): void;
}>;

/**
 * The signature of an arrow function capable of being evaluated
 * against source data and within an execution context.
 * @public
 */
export declare type Expression<TSource = any, TReturn = any, TParent = any> = (source: TSource, context: ExecutionContext<TParent>) => TReturn;

/**
 * Controls the lifecycle of an expression and provides relevant context.
 * @public
 */
export declare interface ExpressionController<TSource = any, TParent = any> {
    /**
     * The source the expression is evaluated against.
     */
    readonly source: TSource;
    /**
     * Indicates how the source's lifetime relates to the controller's lifetime.
     */
    readonly sourceLifetime?: SourceLifetime;
    /**
     * The context the expression is evaluated against.
     */
    readonly context: ExecutionContext<TParent>;
    /**
     * Indicates whether the controller is bound.
     */
    readonly isBound: boolean;
    /**
     * Registers an unbind handler with the controller.
     * @param behavior - An object to call when the controller unbinds.
     */
    onUnbind(behavior: {
        unbind(controller: ExpressionController<TSource, TParent>): any;
    }): void;
}

/**
 * Enables evaluation of and subscription to a binding.
 * @public
 */
export declare interface ExpressionNotifier<TSource = any, TReturn = any, TParent = any> extends Notifier, ExpressionObserver<TSource, TReturn, TParent>, Disposable {
    /**
     * Observes the expression.
     * @param source - The source for the expression.
     * @param context - The context for the expression.
     */
    observe(source: TSource, context?: ExecutionContext): TReturn;
    /**
     * Gets {@link ObservationRecord|ObservationRecords} that the {@link ExpressionNotifier}
     * is observing.
     */
    records(): IterableIterator<ObservationRecord>;
    /**
     * Sets the update mode used by the observer.
     * @param isAsync - Indicates whether updates should be asynchronous.
     * @remarks
     * By default, the update mode is asynchronous, since that provides the best
     * performance for template rendering scenarios. Passing false to setMode will
     * instead cause the observer to notify subscribers immediately when changes occur.
     */
    setMode(isAsync: boolean): void;
}

/**
 * Observes an expression for changes.
 * @public
 */
export declare interface ExpressionObserver<TSource = any, TReturn = any, TParent = any> {
    /**
     * Binds the expression to the source.
     * @param controller - The controller that manages the lifecycle and related
     * context for the expression.
     */
    bind(controller: ExpressionController<TSource, TParent>): TReturn;
}

/**
 * The FAST global.
 * @public
 */
export declare const FAST: FASTGlobal;

/**
 * Represents a custom element based on the FASTElement infrastructure.
 * @public
 */
export declare interface FASTElement extends HTMLElement {
    /**
     * The underlying controller that handles the lifecycle and rendering of
     * this FASTElement.
     */
    readonly $fastController: ElementController;
    /**
     * Emits a custom HTML event.
     * @param type - The type name of the event.
     * @param detail - The event detail object to send with the event.
     * @param options - The event options. By default bubbles and composed.
     * @remarks
     * Only emits events if the element is connected.
     */
    $emit(type: string, detail?: any, options?: Omit<CustomEventInit, "detail">): boolean | void;
    /**
     * The connected callback for this FASTElement.
     * @remarks
     * This method is invoked by the platform whenever this FASTElement
     * becomes connected to the document.
     */
    connectedCallback(): void;
    /**
     * The disconnected callback for this FASTElement.
     * @remarks
     * This method is invoked by the platform whenever this FASTElement
     * becomes disconnected from the document.
     */
    disconnectedCallback(): void;
    /**
     * The attribute changed callback for this FASTElement.
     * @param name - The name of the attribute that changed.
     * @param oldValue - The previous value of the attribute.
     * @param newValue - The new value of the attribute.
     * @remarks
     * This method is invoked by the platform whenever an observed
     * attribute of FASTElement has a value change.
     */
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}

/**
 * A minimal base class for FASTElements that also provides
 * static helpers for working with FASTElements.
 * @public
 */
export declare const FASTElement: {
    new (): FASTElement;
    define: typeof define;
    compose: typeof compose;
    from: typeof from;
};

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

/**
 * The FAST global.
 * @public
 */
export declare interface FASTGlobal {
    /**
     * The list of loaded versions.
     */
    readonly versions: string[];
    /**
     * Gets a kernel value.
     * @param id - The id to get the value for.
     * @param initialize - Creates the initial value for the id if not already existing.
     */
    getById<T>(id: string | number): T | null;
    getById<T>(id: string | number, initialize: () => T): T;
    /**
     * Sends a warning to the developer.
     * @param code - The warning code to send.
     * @param values - Values relevant for the warning message.
     */
    warn(code: number, values?: Record<string, any>): void;
    /**
     * Creates an error.
     * @param code - The error code to send.
     * @param values - Values relevant for the error message.
     */
    error(code: number, values?: Record<string, any>): Error;
    /**
     * Adds debug messages for errors and warnings.
     * @param messages - The message dictionary to add.
     * @remarks
     * Message can include placeholders like $\{name\} which can be
     * replaced by values passed at runtime.
     */
    addMessages(messages: Record<number, string>): void;
}

declare function from<TBase extends typeof HTMLElement>(BaseType: TBase): new () => InstanceType<TBase> & FASTElement;

/**
 * Represents an object that can contribute behavior to a host.
 * @public
 */
export declare interface HostBehavior<TSource = any> {
    /**
     * Executed when this behavior is attached to a controller.
     * @param controller - Controls the behavior lifecycle.
     */
    addedCallback?(controller: HostController<TSource>): void;
    /**
     * Executed when this behavior is detached from a controller.
     * @param controller - Controls the behavior lifecycle.
     */
    removedCallback?(controller: HostController<TSource>): void;
    /**
     * Executed when this behavior's host is connected.
     * @param controller - Controls the behavior lifecycle.
     */
    connectedCallback?(controller: HostController<TSource>): void;
    /**
     * Executed when this behavior's host is disconnected.
     * @param controller - Controls the behavior lifecycle.
     */
    disconnectedCallback?(controller: HostController<TSource>): void;
}

/**
 * Controls the lifecycle and context of behaviors and styles
 * associated with a component host.
 * @public
 */
export declare interface HostController<TSource = any> extends ExpressionController<TSource> {
    /**
     * Indicates whether the host is connected or not.
     */
    readonly isConnected: boolean;
    /**
     * The main set of styles used for the component, independent
     * of any behavior-specific styles.
     */
    mainStyles: ElementStyles | null;
    /**
     * Adds the behavior to the component.
     * @param behavior - The behavior to add.
     */
    addBehavior(behavior: HostBehavior<TSource>): void;
    /**
     * Removes the behavior from the component.
     * @param behavior - The behavior to remove.
     * @param force - Forces removal even if this behavior was added more than once.
     */
    removeBehavior(behavior: HostBehavior<TSource>, force?: boolean): void;
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
}

/**
 * Transforms a template literal string into a ViewTemplate.
 * @param strings - The string fragments that are interpolated with the values.
 * @param values - The values that are interpolated with the string fragments.
 * @remarks
 * The html helper supports interpolation of strings, numbers, binding expressions,
 * other template instances, and Directive instances.
 * @public
 */
export declare const html: HTMLTemplateTag;

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

/**
 * Instructs the template engine to apply behavior to a node.
 * @public
 */
export declare interface HTMLDirective {
    /**
     * Creates HTML to be used within a template.
     * @param add - Can be used to add  behavior factories to a template.
     */
    createHTML(add: AddViewBehaviorFactory): string;
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
 * Defines metadata for an HTMLDirective.
 * @public
 */
export declare interface HTMLDirectiveDefinition<TType extends Constructable<HTMLDirective> = Constructable<HTMLDirective>> extends Required<PartialHTMLDirectiveDefinition> {
    /**
     * The type that the definition provides metadata for.
     */
    readonly type: TType;
}

/**
 * The result of a template compilation operation.
 * @public
 */
export declare interface HTMLTemplateCompilationResult<TSource = any, TParent = any> {
    /**
     * Creates a view instance.
     * @param hostBindingTarget - The host binding target for the view.
     */
    createView(hostBindingTarget?: Element): HTMLView<TSource, TParent>;
    readonly factories: CompiledViewBehaviorFactory[];
}

/**
 * Transforms a template literal string into a ViewTemplate.
 * @param strings - The string fragments that are interpolated with the values.
 * @param values - The values that are interpolated with the string fragments.
 * @remarks
 * The html helper supports interpolation of strings, numbers, binding expressions,
 * other template instances, and Directive instances.
 * @public
 */
export declare type HTMLTemplateTag = (<TSource = any, TParent = any>(strings: TemplateStringsArray, ...values: TemplateValue<TSource, TParent>[]) => ViewTemplate<TSource, TParent>) & {
    /**
     * Transforms a template literal string into partial HTML.
     * @param html - The HTML string fragment to interpolate.
     * @public
     */
    partial(html: string): InlineTemplateDirective;
};

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

/**
 * @internal
 */
declare const Hydratable: unique symbol;

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

/** @public */
export declare interface HydratableView<TSource = any, TParent = any> extends ElementView, SyntheticView, DefaultExecutionContext<TParent> {
    [Hydratable]: symbol;
    readonly bindingViewBoundaries: Record<string, ViewNodes>;
    readonly hydrationStage: keyof typeof HydrationStage;
}

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

declare const HydrationStage: {
    readonly unhydrated: "unhydrated";
    readonly hydrating: "hydrating";
    readonly hydrated: "hydrated";
};

/**
 * Inlines a template into another template.
 * @public
 */
export declare class InlineTemplateDirective implements HTMLDirective {
    private html;
    private factories;
    /**
     * An empty template partial.
     */
    static readonly empty: InlineTemplateDirective;
    /**
     * Creates an instance of InlineTemplateDirective.
     * @param template - The template to inline.
     */
    constructor(html: string, factories?: Record<string, ViewBehaviorFactory>);
    /**
     * Creates HTML to be used within a template.
     * @param add - Can be used to add  behavior factories to a template.
     */
    createHTML(add: AddViewBehaviorFactory): string;
}

/**
 * Observes array lengths.
 * @public
 */
export declare interface LengthObserver extends Subscriber {
    /**
     * The length of the observed array.
     */
    length: number;
}

/**
 * Enables observing the length of an array.
 * @param array - The array to observe the length of.
 * @returns The length of the array.
 * @public
 */
export declare function lengthOf<T>(array: readonly T[]): number;

/**
 * Creates an event listener binding.
 * @param expression - The binding to invoke when the event is raised.
 * @param options - Event listener options.
 * @returns A binding configuration.
 * @public
 */
export declare function listener<T = any>(expression: Expression<T>, options?: AddEventListenerOptions): Binding<T>;

/**
 * Common APIs related to markup generation.
 * @public
 */
export declare const Markup: Readonly<{
    /**
     * Creates a placeholder string suitable for marking out a location *within*
     * an attribute value or HTML content.
     * @param index - The directive index to create the placeholder for.
     * @remarks
     * Used internally by binding directives.
     */
    interpolation: (id: string) => string;
    /**
     * Creates a placeholder that manifests itself as an attribute on an
     * element.
     * @param attributeName - The name of the custom attribute.
     * @param index - The directive index to create the placeholder for.
     * @remarks
     * Used internally by attribute directives such as `ref`, `slotted`, and `children`.
     */
    attribute: (id: string) => string;
    /**
     * Creates a placeholder that manifests itself as a marker within the DOM structure.
     * @param index - The directive index to create the placeholder for.
     * @remarks
     * Used internally by structural directives such as `repeat`.
     */
    comment: (id: string) => string;
}>;

/**
 * Options for configuring node observation behavior.
 * @public
 */
export declare interface NodeBehaviorOptions<T = any> {
    /**
     * The property to assign the observed nodes to.
     */
    property: T;
    /**
     * Filters nodes that are synced with the property.
     * Called one time for each element in the array.
     * @param value - The Node that is being inspected.
     * @param index - The index of the node within the array.
     * @param array - The Node array that is being filtered.
     */
    filter?: ElementsFilter;
}

/**
 * A base class for node observation.
 * @public
 * @remarks
 * Internally used by the SlottedDirective and the ChildrenDirective.
 */
export declare abstract class NodeObservationDirective<T extends NodeBehaviorOptions> extends StatelessAttachedAttributeDirective<T> {
    private _id;
    private _controllerProperty;
    /**
     * The unique id of the factory.
     */
    get id(): string;
    set id(value: string);
    /**
     * The structural id of the DOM node to which the created behavior will apply.
     */
    targetNodeId: string;
    /**
     * Bind this behavior to the source.
     * @param source - The source to bind to.
     * @param context - The execution context that the binding is operating within.
     * @param targets - The targets that behaviors in a view can attach to.
     */
    bind(controller: ViewController): void;
    /**
     * Unbinds this behavior from the source.
     * @param source - The source to unbind from.
     * @param context - The execution context that the binding is operating within.
     * @param targets - The targets that behaviors in a view can attach to.
     */
    unbind(controller: ViewController): void;
    /**
     * Gets the data source for the target.
     * @param target - The target to get the source for.
     * @returns The source.
     */
    protected getSource(target: Node): any;
    /**
     * Updates the source property with the computed nodes.
     * @param source - The source object to assign the nodes property to.
     * @param value - The nodes to assign to the source object property.
     */
    protected updateTarget(source: any, value: ReadonlyArray<any>): void;
    /**
     * Computes the set of nodes that should be assigned to the source property.
     * @param target - The target to compute the nodes for.
     * @returns The computed nodes.
     * @remarks
     * Applies filters if provided.
     */
    protected computeNodes(target: any): Node[];
    /**
     * Begins observation of the nodes.
     * @param target - The target to observe.
     */
    protected abstract observe(target: any): void;
    /**
     * Disconnects observation of the nodes.
     * @param target - The target to unobserve.
     */
    protected abstract disconnect(target: any): void;
    /**
     * Retrieves the raw nodes that should be assigned to the source property.
     * @param target - The target to get the node to.
     */
    protected abstract getNodes(target: any): Node[];
}

/**
 * Normalizes the input value into a binding.
 * @param value - The value to create the default binding for.
 * @returns A binding configuration for the provided value.
 * @public
 */
export declare function normalizeBinding<TSource = any, TReturn = any, TParent = any>(value: Expression<TSource, TReturn, TParent> | Binding<TSource, TReturn, TParent> | {}): Binding<TSource, TReturn, TParent>;

/**
 * Provides change notifications for an observed subject.
 * @public
 */
export declare interface Notifier {
    /**
     * The object that subscribers will receive notifications for.
     */
    readonly subject: any;
    /**
     * Notifies all subscribers, based on the args.
     * @param args - Data passed along to subscribers during notification.
     * @remarks
     * In some implementations, the args may be used to target specific subscribers.
     * This is usually in the case where a propertyName was passed during subscription.
     */
    notify(args: any): void;
    /**
     * Subscribes to notification of changes in an object's state.
     * @param subscriber - The object that is subscribing for change notification.
     * @param propertyToWatch - The name of the property that the subscriber is interested in watching for changes.
     * @remarks
     * Some implementation may or may not require the propertyToWatch.
     */
    subscribe(subscriber: Subscriber, propertyToWatch?: any): void;
    /**
     * Unsubscribes from notification of changes in an object's state.
     * @param subscriber - The object that is unsubscribing from change notification.
     * @param propertyToUnwatch - The name of the property that the subscriber is no longer interested in watching.
     * @remarks
     * Some implementation may or may not require the propertyToUnwatch.
     */
    unsubscribe(subscriber: Subscriber, propertyToUnwatch?: any): void;
}

/**
 * A {@link ValueConverter} that converts to and from `boolean` values. `null`, `undefined`, `""`,
 * and `void` values are converted to `null`.
 * @public
 */
export declare const nullableBooleanConverter: ValueConverter;

/**
 * A {@link ValueConverter} that converts to and from `number` values.
 * @remarks
 * This converter allows for nullable numbers, returning `null` if the
 * input was `null`, `undefined`, or `NaN`.
 * @public
 */
export declare const nullableNumberConverter: ValueConverter;

/**
 * Common Observable APIs.
 * @public
 */
export declare const Observable: Readonly<{
    /**
     * @internal
     * @param factory - The factory used to create array observers.
     */
    setArrayObserverFactory(factory: (collection: any[]) => Notifier): void;
    /**
     * Gets a notifier for an object or Array.
     * @param source - The object or Array to get the notifier for.
     */
    getNotifier: <T extends Notifier = Notifier>(source: any) => T;
    /**
     * Records a property change for a source object.
     * @param source - The object to record the change against.
     * @param propertyName - The property to track as changed.
     */
    track(source: unknown, propertyName: string): void;
    /**
     * Notifies watchers that the currently executing property getter or function is volatile
     * with respect to its observable dependencies.
     */
    trackVolatile(): void;
    /**
     * Notifies subscribers of a source object of changes.
     * @param source - the object to notify of changes.
     * @param args - The change args to pass to subscribers.
     */
    notify(source: unknown, args: any): void;
    /**
     * Defines an observable property on an object or prototype.
     * @param target - The target object to define the observable on.
     * @param nameOrAccessor - The name of the property to define as observable;
     * or a custom accessor that specifies the property name and accessor implementation.
     */
    defineProperty(target: {}, nameOrAccessor: string | Accessor): void;
    /**
     * Finds all the observable accessors defined on the target,
     * including its prototype chain.
     * @param target - The target object to search for accessor on.
     */
    getAccessors: (target: {}) => Accessor[];
    /**
     * Creates a {@link ExpressionNotifier} that can watch the
     * provided {@link Expression} for changes.
     * @param expression - The binding to observe.
     * @param initialSubscriber - An initial subscriber to changes in the binding value.
     * @param isVolatileBinding - Indicates whether the binding's dependency list must be re-evaluated on every value evaluation.
     */
    binding<TSource = any, TReturn = any>(expression: Expression<TSource, TReturn, any>, initialSubscriber?: Subscriber, isVolatileBinding?: boolean): ExpressionNotifier<TSource, TReturn, any>;
    /**
     * Determines whether a binding expression is volatile and needs to have its dependency list re-evaluated
     * on every evaluation of the value.
     * @param expression - The binding to inspect.
     */
    isVolatileBinding<TSource_1 = any, TReturn_1 = any>(expression: Expression<TSource_1, TReturn_1, any>): boolean;
}>;

/**
 * Decorator: Defines an observable property on the target.
 * @param target - The target to define the observable on.
 * @param nameOrAccessor - The property name or accessor to define the observable as.
 * @public
 */
export declare function observable(target: {}, nameOrAccessor: string | Accessor): void;

/**
 * A record of observable property access.
 * @public
 */
export declare interface ObservationRecord {
    /**
     * The source object with an observable property that was accessed.
     */
    propertySource: any;
    /**
     * The name of the observable property on {@link ObservationRecord.propertySource} that was accessed.
     */
    propertyName: string;
}

/**
 * Creates a one time binding
 * @param expression - The binding to refresh when signaled.
 * @param policy - The security policy to associate with th binding.
 * @returns A binding configuration.
 * @public
 */
export declare function oneTime<T = any>(expression: Expression<T>, policy?: DOMPolicy): Binding<T>;

/**
 * Creates an standard binding.
 * @param expression - The binding to refresh when changed.
 * @param policy - The security policy to associate with th binding.
 * @param isVolatile - Indicates whether the binding is volatile or not.
 * @returns A binding configuration.
 * @public
 */
export declare function oneWay<T = any>(expression: Expression<T>, policy?: DOMPolicy, isVolatile?: boolean): Binding<T>;

/**
 * Common APIs related to content parsing.
 * @public
 */
export declare const Parser: Readonly<{
    /**
     * Parses text content or HTML attribute content, separating out the static strings
     * from the directives.
     * @param value - The content or attribute string to parse.
     * @param factories - A list of directives to search for in the string.
     * @returns A heterogeneous array of static strings interspersed with
     * directives or null if no directives are found in the string.
     */
    parse(value: string, factories: Record<string, ViewBehaviorFactory>): (string | ViewBehaviorFactory)[] | null;
}>;

/**
 * Represents metadata configuration for a custom element.
 * @public
 */
export declare interface PartialFASTElementDefinition {
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
 * Represents metadata configuration for an HTMLDirective.
 * @public
 */
export declare interface PartialHTMLDirectiveDefinition {
    /**
     * Indicates whether the directive needs access to template contextual information
     * such as the sourceAspect, targetAspect, and aspectType.
     */
    aspected?: boolean;
}

/**
 * An implementation of Notifier that allows subscribers to be notified
 * of individual property changes on an object.
 * @public
 */
export declare class PropertyChangeNotifier implements Notifier {
    private subscribers;
    private subjectSubscribers;
    /**
     * The subject that property changes are being notified for.
     */
    readonly subject: any;
    /**
     * Creates an instance of PropertyChangeNotifier for the specified subject.
     * @param subject - The object that subscribers will receive notifications for.
     */
    constructor(subject: any);
    /**
     * Notifies all subscribers, based on the specified property.
     * @param propertyName - The property name, passed along to subscribers during notification.
     */
    notify(propertyName: string): void;
    /**
     * Subscribes to notification of changes in an object's state.
     * @param subscriber - The object that is subscribing for change notification.
     * @param propertyToWatch - The name of the property that the subscriber is interested in watching for changes.
     */
    subscribe(subscriber: Subscriber, propertyToWatch?: string): void;
    /**
     * Unsubscribes from notification of changes in an object's state.
     * @param subscriber - The object that is unsubscribing from change notification.
     * @param propertyToUnwatch - The name of the property that the subscriber is no longer interested in watching.
     */
    unsubscribe(subscriber: Subscriber, propertyToUnwatch?: string): void;
}

/**
 * A directive that observes the updates a property with a reference to the element.
 * @param propertyName - The name of the property to assign the reference to.
 * @public
 */
export declare const ref: <TSource = any, TParent = any>(propertyName: keyof TSource & string) => CaptureType<TSource, TParent>;

/**
 * The runtime behavior for template references.
 * @public
 */
export declare class RefDirective extends StatelessAttachedAttributeDirective<string> {
    /**
     * The structural id of the DOM node to which the created behavior will apply.
     */
    targetNodeId: string;
    /**
     * Bind this behavior.
     * @param controller - The view controller that manages the lifecycle of this behavior.
     */
    bind(controller: ViewController): void;
}

declare const reflectMode = "reflect";

/**
 * Creates a RenderDirective for use in advanced rendering scenarios.
 * @param value - The binding expression that returns the data to be rendered. The expression
 * can also return a Node to render directly.
 * @param template - A template to render the data with
 * or a string to indicate which RenderInstruction to use when looking up a RenderInstruction.
 * Expressions can also be provided to dynamically determine either the template or the name.
 * @returns A RenderDirective suitable for use in a template.
 * @remarks
 * If no binding is provided, then a default binding that returns the source is created.
 * If no template is provided, then a binding is created that will use registered
 * RenderInstructions to determine the view.
 * If the template binding returns a string, then it will be used to look up a
 * RenderInstruction to determine the view.
 * @public
 */
export declare function render<TSource = any, TItem = any, TParent = any>(value?: Expression<TSource, TItem> | Binding<TSource, TItem> | {}, template?: ContentTemplate | string | Expression<TSource, ContentTemplate | string | Node, TParent> | Binding<TSource, ContentTemplate | string | Node, TParent>): CaptureType<TSource, TParent>;

/**
 * A Behavior that enables advanced rendering.
 * @public
 */
export declare class RenderBehavior<TSource = any> implements ViewBehavior, Subscriber {
    private directive;
    private location;
    private controller;
    private view;
    private template;
    private templateBindingObserver;
    private data;
    private dataBindingObserver;
    /**
     * Creates an instance of RenderBehavior.
     * @param directive - The render directive that created this behavior.
     */
    constructor(directive: RenderDirective);
    /**
     * Bind this behavior.
     * @param controller - The view controller that manages the lifecycle of this behavior.
     */
    bind(controller: ViewController): void;
    /**
     * Unbinds this behavior.
     * @param controller - The view controller that manages the lifecycle of this behavior.
     */
    unbind(controller: ViewController): void;
    /** @internal */
    handleChange(source: any, observer: ExpressionObserver): void;
    private bindView;
    private refreshView;
}

/**
 * A Directive that enables use of the RenderBehavior.
 * @public
 */
export declare class RenderDirective<TSource = any> implements HTMLDirective, ViewBehaviorFactory, BindingDirective {
    readonly dataBinding: Binding<TSource>;
    readonly templateBinding: Binding<TSource, ContentTemplate>;
    readonly templateBindingDependsOnData: boolean;
    /**
     * The structural id of the DOM node to which the created behavior will apply.
     */
    targetNodeId: string;
    /**
     * Creates an instance of RenderDirective.
     * @param dataBinding - A binding expression that returns the data to render.
     * @param templateBinding - A binding expression that returns the template to use to render the data.
     */
    constructor(dataBinding: Binding<TSource>, templateBinding: Binding<TSource, ContentTemplate>, templateBindingDependsOnData: boolean);
    /**
     * Creates HTML to be used within a template.
     * @param add - Can be used to add  behavior factories to a template.
     */
    createHTML(add: AddViewBehaviorFactory): string;
    /**
     * Creates a behavior.
     * @param targets - The targets available for behaviors to be attached to.
     */
    createBehavior(): RenderBehavior<TSource>;
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
 * Options for configuring repeat behavior.
 * @public
 */
export declare interface RepeatOptions {
    /**
     * Enables index, length, and dependent positioning updates in item templates.
     */
    positioning?: boolean;
    /**
     * Enables view recycling
     */
    recycle?: boolean;
}

/**
 * Shadow root initialization options.
 * @public
 */
export declare interface ShadowRootOptions extends ShadowRootInit {
    /**
     * A registry that provides the custom elements visible
     * from within this shadow root.
     * @beta
     */
    registry?: CustomElementRegistry;
}

/**
 * A directive that observes the `assignedNodes()` of a slot and updates a property
 * whenever they change.
 * @param propertyOrOptions - The options used to configure slotted node observation.
 * @public
 */
export declare function slotted<TSource = any, TParent = any>(propertyOrOptions: (keyof TSource & string) | SlottedDirectiveOptions<keyof TSource & string>): CaptureType<TSource, TParent>;

/**
 * The runtime behavior for slotted node observation.
 * @public
 */
export declare class SlottedDirective extends NodeObservationDirective<SlottedDirectiveOptions> {
    /**
     * Begins observation of the nodes.
     * @param target - The target to observe.
     */
    observe(target: EventSource): void;
    /**
     * Disconnects observation of the nodes.
     * @param target - The target to unobserve.
     */
    disconnect(target: EventSource): void;
    /**
     * Retrieves the raw nodes that should be assigned to the source property.
     * @param target - The target to get the node to.
     */
    getNodes(target: HTMLSlotElement): Node[];
    /** @internal */
    handleEvent(event: Event): void;
}

/**
 * The options used to configure slotted node observation.
 * @public
 */
export declare interface SlottedDirectiveOptions<T = any> extends NodeBehaviorOptions<T>, AssignedNodesOptions {
}

/**
 * Describes how the source's lifetime relates to its controller's lifetime.
 * @public
 */
export declare const SourceLifetime: Readonly<{
    /**
     * The source to controller lifetime relationship is unknown.
     */
    readonly unknown: undefined;
    /**
     * The source and controller lifetimes are coupled to one another.
     * They can/will be GC'd together.
     */
    readonly coupled: 1;
}>;

/**
 * Describes how the source's lifetime relates to its controller's lifetime.
 * @public
 */
export declare type SourceLifetime = (typeof SourceLifetime)[keyof typeof SourceLifetime];

/**
 * A splice map is a representation of how a previous array of items
 * was transformed into a new array of items. Conceptually it is a list of
 * tuples of
 *
 *   (index, removed, addedCount)
 *
 * which are kept in ascending index order of. The tuple represents that at
 * the |index|, |removed| sequence of items were removed, and counting forward
 * from |index|, |addedCount| items were added.
 * @public
 */
export declare class Splice {
    index: number;
    removed: any[];
    addedCount: number;
    /**
     * Indicates that this splice represents a complete array reset.
     */
    reset?: boolean;
    /**
     * Creates a splice.
     * @param index - The index that the splice occurs at.
     * @param removed - The items that were removed.
     * @param addedCount - The  number of items that were added.
     */
    constructor(index: number, removed: any[], addedCount: number);
    /**
     * Adjusts the splice index based on the provided array.
     * @param array - The array to adjust to.
     * @returns The same splice, mutated based on the reference array.
     */
    adjustTo(array: any[]): this;
}

/**
 * An approach to tracking changes in an array.
 * @public
 */
export declare interface SpliceStrategy {
    /**
     * The level of feature support the splice strategy provides.
     */
    readonly support: SpliceStrategySupport;
    /**
     * Normalizes the splices before delivery to array change subscribers.
     * @param previous - The previous version of the array if a reset has taken place.
     * @param current - The current version of the array.
     * @param changes - The set of changes tracked against the array.
     */
    normalize(previous: unknown[] | undefined, current: unknown[], changes: Splice[] | undefined): readonly Splice[];
    /**
     * Performs and tracks a pop operation on an array.
     * @param array - The array to track the change for.
     * @param observer - The observer to register the change with.
     * @param pop - The operation to perform.
     * @param args - The arguments for the operation.
     */
    pop(array: any[], observer: ArrayObserver, pop: typeof Array.prototype.pop, args: any[]): any;
    /**
     * Performs and tracks a push operation on an array.
     * @param array - The array to track the change for.
     * @param observer - The observer to register the change with.
     * @param push - The operation to perform.
     * @param args - The arguments for the operation.
     */
    push(array: any[], observer: ArrayObserver, push: typeof Array.prototype.push, args: any[]): any;
    /**
     * Performs and tracks a reverse operation on an array.
     * @param array - The array to track the change for.
     * @param observer - The observer to register the change with.
     * @param reverse - The operation to perform.
     * @param args - The arguments for the operation.
     */
    reverse(array: any[], observer: ArrayObserver, reverse: typeof Array.prototype.reverse, args: any[]): any;
    /**
     * Performs and tracks a shift operation on an array.
     * @param array - The array to track the change for.
     * @param observer - The observer to register the change with.
     * @param shift - The operation to perform.
     * @param args - The arguments for the operation.
     */
    shift(array: any[], observer: ArrayObserver, shift: typeof Array.prototype.shift, args: any[]): any;
    /**
     * Performs and tracks a sort operation on an array.
     * @param array - The array to track the change for.
     * @param observer - The observer to register the change with.
     * @param sort - The operation to perform.
     * @param args - The arguments for the operation.
     */
    sort(array: any[], observer: ArrayObserver, sort: typeof Array.prototype.sort, args: any[]): any[];
    /**
     * Performs and tracks a splice operation on an array.
     * @param array - The array to track the change for.
     * @param observer - The observer to register the change with.
     * @param splice - The operation to perform.
     * @param args - The arguments for the operation.
     */
    splice(array: any[], observer: ArrayObserver, splice: typeof Array.prototype.splice, args: any[]): any;
    /**
     * Performs and tracks an unshift operation on an array.
     * @param array - The array to track the change for.
     * @param observer - The observer to register the change with.
     * @param unshift - The operation to perform.
     * @param args - The arguments for the operation.
     */
    unshift(array: any[], observer: ArrayObserver, unshift: typeof Array.prototype.unshift, args: any[]): any[];
}

/**
 * Functionality related to tracking changes in arrays.
 * @public
 */
export declare const SpliceStrategy: Readonly<{
    /**
     * A set of changes that represent a full array reset.
     */
    readonly reset: Splice[];
    /**
     * Sets the default strategy to use for array observers.
     * @param strategy - The splice strategy to use.
     */
    readonly setDefaultStrategy: (strategy: SpliceStrategy) => void;
}>;

/**
 * Indicates what level of feature support the splice
 * strategy provides.
 * @public
 */
export declare const SpliceStrategySupport: Readonly<{
    /**
     * Only supports resets.
     */
    readonly reset: 1;
    /**
     * Supports tracking splices and resets.
     */
    readonly splice: 2;
    /**
     * Supports tracking splices and resets, while applying some form
     * of optimization, such as merging, to the splices.
     */
    readonly optimized: 3;
}>;

/**
 * The available values for SpliceStrategySupport.
 * @public
 */
export declare type SpliceStrategySupport = (typeof SpliceStrategySupport)[keyof typeof SpliceStrategySupport];

declare const enum Stages {
    connecting = 0,
    connected = 1,
    disconnecting = 2,
    disconnected = 3
}

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

/**
 * Implemented to provide specific behavior when adding/removing styles
 * for elements.
 * @public
 */
export declare interface StyleStrategy {
    /**
     * Adds styles to the target.
     * @param target - The target to add the styles to.
     */
    addStylesTo(target: StyleTarget): void;
    /**
     * Removes styles from the target.
     * @param target - The target to remove the styles from.
     */
    removeStylesFrom(target: StyleTarget): void;
}

/**
 * A node that can be targeted by styles.
 * @public
 */
export declare interface StyleTarget extends Pick<Node, "getRootNode"> {
    /**
     * Stylesheets to be adopted by the node.
     */
    adoptedStyleSheets?: CSSStyleSheet[];
    /**
     * Adds styles to the target by appending the styles.
     * @param styles - The styles element to add.
     */
    append(styles: HTMLStyleElement): void;
    /**
     * Removes styles from the target.
     * @param styles - The styles element to remove.
     */
    removeChild(styles: HTMLStyleElement): void;
    /**
     * Returns all element descendants of node that match selectors.
     * @param selectors - The CSS selector to use for the query.
     */
    querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E>;
}

/**
 * Implemented by objects that are interested in change notifications.
 * @public
 */
export declare interface Subscriber {
    /**
     * Called when a subject this instance has subscribed to changes.
     * @param subject - The subject of the change.
     * @param args - The event args detailing the change that occurred.
     */
    handleChange(subject: any, args: any): void;
}

/**
 * An implementation of {@link Notifier} that efficiently keeps track of
 * subscribers interested in a specific change notification on an
 * observable subject.
 *
 * @remarks
 * This set is optimized for the most common scenario of 1 or 2 subscribers.
 * With this in mind, it can store a subscriber in an internal field, allowing it to avoid Array#push operations.
 * If the set ever exceeds two subscribers, it upgrades to an array automatically.
 * @public
 */
export declare class SubscriberSet implements Notifier {
    private sub1;
    private sub2;
    private spillover;
    /**
     * The object that subscribers will receive notifications for.
     */
    readonly subject: any;
    /**
     * Creates an instance of SubscriberSet for the specified subject.
     * @param subject - The subject that subscribers will receive notifications from.
     * @param initialSubscriber - An initial subscriber to changes.
     */
    constructor(subject: any, initialSubscriber?: Subscriber);
    /**
     * Checks whether the provided subscriber has been added to this set.
     * @param subscriber - The subscriber to test for inclusion in this set.
     */
    has(subscriber: Subscriber): boolean;
    /**
     * Subscribes to notification of changes in an object's state.
     * @param subscriber - The object that is subscribing for change notification.
     */
    subscribe(subscriber: Subscriber): void;
    /**
     * Unsubscribes from notification of changes in an object's state.
     * @param subscriber - The object that is unsubscribing from change notification.
     */
    unsubscribe(subscriber: Subscriber): void;
    /**
     * Notifies all subscribers.
     * @param args - Data passed along to subscribers during notification.
     */
    notify(args: any): void;
}

/**
 * The options used to configure subtree observation.
 * @public
 */
export declare interface SubtreeDirectiveOptions<T = any> extends NodeBehaviorOptions<T>, Omit<MutationObserverInit, "subtree" | "childList"> {
    /**
     * Indicates that child subtrees should be observed for changes.
     */
    subtree: boolean;
    /**
     * When subtrees are observed, a query selector is required to indicate
     * which of potentially many nodes should be assigned to the property.
     */
    selector: string;
}

/**
 * A view representing a range of DOM nodes which can be added/removed ad hoc.
 * @public
 */
export declare interface SyntheticView<TSource = any, TParent = any> extends View<TSource, TParent> {
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

/**
 * A template capable of rendering views not specifically connected to custom elements.
 * @public
 */
export declare interface SyntheticViewTemplate<TSource = any, TParent = any> {
    /**
     * Creates a SyntheticView instance based on this template definition.
     */
    create(): SyntheticView<TSource, TParent>;
    /**
     * Returns a directive that can inline the template.
     */
    inline(): CaptureType<TSource, TParent>;
}

/**
 * Represents the types of values that can be interpolated into a template.
 * @public
 */
export declare type TemplateValue<TSource, TParent = any> = Expression<TSource, any, TParent> | Binding<TSource, any, TParent> | HTMLDirective | CaptureType<TSource, TParent>;

/**
 * A policy for use with the standard trustedTypes platform API.
 * @public
 */
export declare type TrustedTypesPolicy = {
    /**
     * Creates trusted HTML.
     * @param html - The HTML to clear as trustworthy.
     */
    createHTML(html: string): string;
};

/**
 * A work queue used to synchronize writes to the DOM.
 * @public
 */
export declare interface UpdateQueue {
    /**
     * Schedules DOM update work in the next batch.
     * @param callable - The callable function or object to queue.
     */
    enqueue(callable: Callable): void;
    /**
     * Resolves with the next DOM update.
     */
    next(): Promise<void>;
    /**
     * Immediately processes all work previously scheduled
     * through enqueue.
     * @remarks
     * This also forces next() promises
     * to resolve.
     */
    process(): void;
    /**
     * Sets the update mode used by enqueue.
     * @param isAsync - Indicates whether DOM updates should be asynchronous.
     * @remarks
     * By default, the update mode is asynchronous, since that provides the best
     * performance in the browser. Passing false to setMode will instead cause
     * the queue to be immediately processed for each call to enqueue. However,
     * ordering will still be preserved so that nested tasks do not run until
     * after parent tasks complete.
     */
    setMode(isAsync: boolean): void;
}

/**
 * The default UpdateQueue.
 * @public
 */
export declare const Updates: UpdateQueue;

/**
 * Represents objects that can convert values to and from
 * view or model representations.
 * @public
 */
export declare interface ValueConverter {
    /**
     * Converts a value from its representation in the model, to a representation for the view.
     * @param value - The value to convert to a view representation.
     */
    toView(value: any): any;
    /**
     * Converts a value from its representation in the view, to a representation for the model.
     * @param value - The value to convert to a model representation.
     */
    fromView(value: any): any;
}

/**
 * Represents a collection of DOM nodes which can be bound to a data source.
 * @public
 */
export declare interface View<TSource = any, TParent = any> extends Disposable {
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
 * Represents an object that can contribute behavior to a view.
 * @public
 */
export declare interface ViewBehavior<TSource = any, TParent = any> {
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
export declare interface ViewBehaviorFactory {
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
export declare interface ViewController<TSource = any, TParent = any> extends ExpressionController<TSource, TParent> {
    /**
     * The parts of the view that are targeted by view behaviors.
     */
    readonly targets: ViewBehaviorTargets;
}

declare interface ViewNodes {
    first: Node;
    last: Node;
}

/**
 * A template capable of creating HTMLView instances or rendering directly to DOM.
 * @public
 */
export declare class ViewTemplate<TSource = any, TParent = any> implements ElementViewTemplate<TSource, TParent>, SyntheticViewTemplate<TSource, TParent> {
    private policy?;
    private result;
    /**
     * The html representing what this template will
     * instantiate, including placeholders for directives.
     */
    readonly html: string | HTMLTemplateElement;
    /**
     * The directives that will be connected to placeholders in the html.
     */
    readonly factories: Record<string, ViewBehaviorFactory>;
    /**
     * Creates an instance of ViewTemplate.
     * @param html - The html representing what this template will instantiate, including placeholders for directives.
     * @param factories - The directives that will be connected to placeholders in the html.
     * @param policy - The security policy to use when compiling this template.
     */
    constructor(html: string | HTMLTemplateElement, factories?: Record<string, ViewBehaviorFactory>, policy?: DOMPolicy | undefined);
    /**
     * @internal
     */
    compile(): HTMLTemplateCompilationResult<TSource, TParent>;
    /**
     * Creates an HTMLView instance based on this template definition.
     * @param hostBindingTarget - The element that host behaviors will be bound to.
     */
    create(hostBindingTarget?: Element): HTMLView<TSource, TParent>;
    /**
     * Returns a directive that can inline the template.
     */
    inline(): CaptureType<TSource, TParent>;
    /**
     * Sets the DOMPolicy for this template.
     * @param policy - The policy to associated with this template.
     * @returns The modified template instance.
     * @remarks
     * The DOMPolicy can only be set once for a template and cannot be
     * set after the template is compiled.
     */
    withPolicy(policy: DOMPolicy): this;
    /**
     * Creates an HTMLView from this template, binds it to the source, and then appends it to the host.
     * @param source - The data source to bind the template to.
     * @param host - The Element where the template will be rendered.
     * @param hostBindingTarget - An HTML element to target the host bindings at if different from the
     * host that the template is being attached to.
     */
    render(source: TSource, host: Node, hostBindingTarget?: Element): HTMLView<TSource, TParent>;
    /**
     * Creates a template based on a set of static strings and dynamic values.
     * @param strings - The static strings to create the template with.
     * @param values - The dynamic values to create the template with.
     * @param policy - The DOMPolicy to associated with the template.
     * @returns A ViewTemplate.
     * @remarks
     * This API should not be used directly under normal circumstances because constructing
     * a template in this way, if not done properly, can open up the application to XSS
     * attacks. When using this API, provide a strong DOMPolicy that can properly sanitize
     * and also be sure to manually sanitize all static strings particularly if they can
     * come from user input.
     */
    static create<TSource = any, TParent = any>(strings: string[], values: TemplateValue<TSource, TParent>[], policy?: DOMPolicy): ViewTemplate<TSource, TParent>;
}

/**
 * Decorator: Marks a property getter as having volatile observable dependencies.
 * @param target - The target that the property is defined on.
 * @param name - The property name.
 * @param name - The existing descriptor.
 * @public
 */
export declare function volatile(target: {}, name: string | Accessor, descriptor: PropertyDescriptor): PropertyDescriptor;

/**
 * A directive that enables basic conditional rendering in a template.
 * @param condition - The condition to test for rendering.
 * @param templateOrTemplateBinding - The template or a binding that gets
 * the template to render when the condition is true.
 * @param elseTemplateOrTemplateBinding - Optional template or binding that that
 * gets the template to render when the conditional is false.
 * @public
 */
export declare function when<TSource = any, TReturn = any, TParent = any>(condition: Expression<TSource, TReturn, TParent> | boolean, templateOrTemplateBinding: SyntheticViewTemplate<TSource, TParent> | Expression<TSource, SyntheticViewTemplate<TSource, TParent>, TParent>, elseTemplateOrTemplateBinding?: SyntheticViewTemplate<TSource, TParent> | Expression<TSource, SyntheticViewTemplate<TSource, TParent>, TParent>): CaptureType<TSource, TParent>;

export { }
