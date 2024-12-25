import type { FASTElement } from "../components/fast-element.js";
import type { DOMPolicy } from "../dom.js";
import { Constructable } from "../interfaces.js";
import { Binding, BindingDirective } from "../binding/binding.js";
import type { Subscriber } from "../observation/notifier.js";
import type { ExecutionContext, Expression, ExpressionObserver } from "../observation/observable.js";
import type { ContentTemplate, ContentView } from "./html-binding-directive.js";
import { AddViewBehaviorFactory, HTMLDirective, ViewBehavior, ViewBehaviorFactory, ViewController } from "./html-directive.js";
import { CaptureType, SyntheticViewTemplate, TemplateValue, ViewTemplate } from "./template.js";
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
 * Provides instructions for how to render a type.
 * @public
 */
export interface RenderInstruction {
    /**
     * Identifies this as a RenderInstruction.
     */
    brand: symbol;
    /**
     * The type this instruction is associated with.
     */
    type: Constructable;
    /**
     * The template to use when rendering.
     */
    template: ContentTemplate;
    /**
     * A name that can be used to identify the instruction.
     */
    name: string;
}
/**
 * Render options that are common to all configurations.
 * @public
 */
export declare type CommonRenderOptions = {
    /**
     * The type this instruction is associated with.
     */
    type: Constructable;
    /**
     * A name that can be used to identify the instruction.
     */
    name?: string;
};
/**
 * Render options used to specify a template.
 * @public
 */
export declare type TemplateRenderOptions = CommonRenderOptions & {
    /**
     * The template to use when rendering.
     */
    template: ContentTemplate;
};
/**
 * Render options that are common to all element render instructions.
 * @public
 */
export declare type BaseElementRenderOptions<TSource = any, TParent = any> = CommonRenderOptions & {
    /**
     * Attributes to use when creating the element template.
     * @remarks
     * This API should be used with caution. When providing attributes, if not done properly,
     * you can open up the application to XSS attacks. When using this API, provide a strong
     * DOMPolicy that can properly sanitize and also be sure to manually sanitize attribute
     * values particularly if they can come from user input.
     */
    attributes?: Record<string, string | TemplateValue<TSource, TParent>>;
    /**
     * Content to use when creating the element template.
     * @remarks
     * This API should be used with caution. When providing content, if not done properly,
     * you can open up the application to XSS attacks. When using this API, provide a strong
     * DOMPolicy that can properly sanitize and also be sure to manually sanitize content
     * particularly if it can come from user input. Prefer passing a template
     * created by the the html tag helper rather than passing a raw string, as that will
     * enable the JS runtime to help secure the static strings.
     */
    content?: string | SyntheticViewTemplate;
    /**
     * The DOMPolicy to create the render instruction with.
     */
    policy?: DOMPolicy;
};
/**
 * Render options for directly creating an element with {@link RenderInstruction.createElementTemplate}
 * @public
 */
export declare type ElementCreateOptions<TSource = any, TParent = any> = Omit<BaseElementRenderOptions, "type" | "name"> & {
    /**
     * Directives to use when creating the element template. These directives are applied directly to the specified tag.
     *
     * @remarks
     * Directives supported by this API are: `ref`, `children`, `slotted`, or any custom `HTMLDirective` that can be used on a HTML tag.
     */
    directives?: TemplateValue<TSource, TParent>[];
};
/**
 * Render options used to specify an element.
 * @public
 */
export declare type ElementConstructorRenderOptions<TSource = any, TParent = any> = BaseElementRenderOptions<TSource, TParent> & {
    /**
     * The element to use when rendering.
     */
    element: Constructable<FASTElement>;
};
/**
 * Render options use to specify an element by tag name.
 * @public
 */
export declare type TagNameRenderOptions<TSource = any, TParent = any> = BaseElementRenderOptions<TSource, TParent> & {
    /**
     * The tag name to use when rendering.
     */
    tagName: string;
};
declare function createElementTemplate<TSource = any, TParent = any>(tagName: string, options?: ElementCreateOptions): ViewTemplate<TSource, TParent>;
declare function create(options: TagNameRenderOptions): RenderInstruction;
declare function create(options: ElementConstructorRenderOptions): RenderInstruction;
declare function create(options: TemplateRenderOptions): RenderInstruction;
declare function instanceOf(object: any): object is RenderInstruction;
declare function register(options: TagNameRenderOptions): RenderInstruction;
declare function register(options: ElementConstructorRenderOptions): RenderInstruction;
declare function register(options: TemplateRenderOptions): RenderInstruction;
declare function register(instruction: RenderInstruction): RenderInstruction;
declare function getByType(type: Constructable, name?: string): RenderInstruction | undefined;
declare function getForInstance(object: any, name?: string): RenderInstruction | undefined;
/**
 * Provides APIs for creating and interacting with render instructions.
 * @public
 */
export declare const RenderInstruction: Readonly<{
    /**
     * Checks whether the provided object is a RenderInstruction.
     * @param object - The object to check.
     * @returns true if the object is a RenderInstruction; false otherwise
     */
    instanceOf: typeof instanceOf;
    /**
     * Creates a RenderInstruction for a set of options.
     * @param options - The options to use when creating the RenderInstruction.
     * @remarks
     * This API should be used with caution. When providing attributes or content,
     * if not done properly, you can open up the application to XSS attacks. When using this API,
     * provide a strong DOMPolicy that can properly sanitize and also be sure to manually sanitize
     * content and attribute values particularly if they can come from user input.
     */
    create: typeof create;
    /**
     * Creates a template based on a tag name.
     * @param tagName - The tag name to use when creating the template.
     * @param attributes - The attributes to apply to the element.
     * @param content - The content to insert into the element.
     * @param policy - The DOMPolicy to create the template with.
     * @returns A template based on the provided specifications.
     * @remarks
     * This API should be used with caution. When providing attributes or content,
     * if not done properly, you can open up the application to XSS attacks. When using this API,
     * provide a strong DOMPolicy that can properly sanitize and also be sure to manually sanitize
     * content and attribute values particularly if they can come from user input.
     */
    createElementTemplate: typeof createElementTemplate;
    /**
     * Creates and registers an instruction.
     * @param options The options to use when creating the RenderInstruction.
     * @remarks
     * A previously created RenderInstruction can also be registered.
     */
    register: typeof register;
    /**
     * Finds a previously registered RenderInstruction by type and optionally by name.
     * @param type - The type to retrieve the RenderInstruction for.
     * @param name - An optional name used in differentiating between multiple registered instructions.
     * @returns The located RenderInstruction that matches the criteria or undefined if none is found.
     */
    getByType: typeof getByType;
    /**
     * Finds a previously registered RenderInstruction for the instance's type and optionally by name.
     * @param object - The instance to retrieve the RenderInstruction for.
     * @param name - An optional name used in differentiating between multiple registered instructions.
     * @returns The located RenderInstruction that matches the criteria or undefined if none is found.
     */
    getForInstance: typeof getForInstance;
}>;
/**
 * Decorates a type with render instruction metadata.
 * @param options - The options used in creating the RenderInstruction.
 * @public
 */
export declare function renderWith(options: Omit<TagNameRenderOptions, "type">): ClassDecorator;
/**
 * Decorates a type with render instruction metadata.
 * @param options - The options used in creating the RenderInstruction.
 * @public
 */
export declare function renderWith(options: Omit<ElementConstructorRenderOptions, "type">): ClassDecorator;
/**
 * Decorates a type with render instruction metadata.
 * @param options - The options used in creating the RenderInstruction.
 * @public
 */
export declare function renderWith(options: Omit<TemplateRenderOptions, "type">): ClassDecorator;
/**
 * Decorates a type with render instruction metadata.
 * @param element - The element to use to render the decorated class.
 * @param name - An optional name to differentiate the render instruction.
 * @public
 */
export declare function renderWith(element: Constructable<FASTElement>, name?: string): ClassDecorator;
/**
 * Decorates a type with render instruction metadata.
 * @param template - The template to use to render the decorated class.
 * @param name - An optional name to differentiate the render instruction.
 * @public
 */
export declare function renderWith(template: ContentTemplate, name?: string): ClassDecorator;
/**
 * @internal
 */
export declare class NodeTemplate implements ContentTemplate, ContentView {
    readonly node: Node;
    constructor(node: Node);
    get context(): ExecutionContext<any>;
    bind(source: any): void;
    unbind(): void;
    insertBefore(refNode: Node): void;
    remove(): void;
    create(): ContentView;
    hydrate(first: Node, last: Node): ContentView;
}
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
export {};
