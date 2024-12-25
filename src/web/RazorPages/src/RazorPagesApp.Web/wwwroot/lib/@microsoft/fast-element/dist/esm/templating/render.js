import { FASTElementDefinition } from "../components/fast-definitions.js";
import { isHydratable } from "../components/hydration.js";
import { isFunction, isString } from "../interfaces.js";
import { Binding } from "../binding/binding.js";
import { oneTime } from "../binding/one-time.js";
import { oneWay } from "../binding/one-way.js";
import { normalizeBinding } from "../binding/normalize.js";
import { HTMLDirective, } from "./html-directive.js";
import { Markup } from "./markup.js";
import { html, ViewTemplate, } from "./template.js";
import { HydrationStage } from "./view.js";
/**
 * A Behavior that enables advanced rendering.
 * @public
 */
export class RenderBehavior {
    /**
     * Creates an instance of RenderBehavior.
     * @param directive - The render directive that created this behavior.
     */
    constructor(directive) {
        this.directive = directive;
        this.location = null;
        this.controller = null;
        this.view = null;
        this.data = null;
        this.dataBindingObserver = directive.dataBinding.createObserver(this, directive);
        this.templateBindingObserver = directive.templateBinding.createObserver(this, directive);
    }
    /**
     * Bind this behavior.
     * @param controller - The view controller that manages the lifecycle of this behavior.
     */
    bind(controller) {
        this.location = controller.targets[this.directive.targetNodeId];
        this.controller = controller;
        this.data = this.dataBindingObserver.bind(controller);
        this.template = this.templateBindingObserver.bind(controller);
        controller.onUnbind(this);
        if (isHydratable(this.template) &&
            isHydratable(controller) &&
            controller.hydrationStage !== HydrationStage.hydrated &&
            !this.view) {
            const viewNodes = controller.bindingViewBoundaries[this.directive.targetNodeId];
            if (viewNodes) {
                this.view = this.template.hydrate(viewNodes.first, viewNodes.last);
                this.bindView(this.view);
            }
        }
        else {
            this.refreshView();
        }
    }
    /**
     * Unbinds this behavior.
     * @param controller - The view controller that manages the lifecycle of this behavior.
     */
    unbind(controller) {
        const view = this.view;
        if (view !== null && view.isComposed) {
            view.unbind();
            view.needsBindOnly = true;
        }
    }
    /** @internal */
    handleChange(source, observer) {
        if (observer === this.dataBindingObserver) {
            this.data = this.dataBindingObserver.bind(this.controller);
        }
        if (this.directive.templateBindingDependsOnData ||
            observer === this.templateBindingObserver) {
            this.template = this.templateBindingObserver.bind(this.controller);
        }
        this.refreshView();
    }
    bindView(view) {
        // It's possible that the value is the same as the previous template
        // and that there's actually no need to compose it.
        if (!view.isComposed) {
            view.isComposed = true;
            view.bind(this.data);
            view.insertBefore(this.location);
            view.$fastTemplate = this.template;
        }
        else if (view.needsBindOnly) {
            view.needsBindOnly = false;
            view.bind(this.data);
        }
    }
    refreshView() {
        let view = this.view;
        const template = this.template;
        if (view === null) {
            this.view = view = template.create();
            this.view.context.parent = this.controller.source;
            this.view.context.parentContext = this.controller.context;
        }
        else {
            // If there is a previous view, but it wasn't created
            // from the same template as the new value, then we
            // need to remove the old view if it's still in the DOM
            // and create a new view from the template.
            if (view.$fastTemplate !== template) {
                if (view.isComposed) {
                    view.remove();
                    view.unbind();
                }
                this.view = view = template.create();
                this.view.context.parent = this.controller.source;
                this.view.context.parentContext = this.controller.context;
            }
        }
        this.bindView(view);
    }
}
/**
 * A Directive that enables use of the RenderBehavior.
 * @public
 */
export class RenderDirective {
    /**
     * Creates an instance of RenderDirective.
     * @param dataBinding - A binding expression that returns the data to render.
     * @param templateBinding - A binding expression that returns the template to use to render the data.
     */
    constructor(dataBinding, templateBinding, templateBindingDependsOnData) {
        this.dataBinding = dataBinding;
        this.templateBinding = templateBinding;
        this.templateBindingDependsOnData = templateBindingDependsOnData;
    }
    /**
     * Creates HTML to be used within a template.
     * @param add - Can be used to add  behavior factories to a template.
     */
    createHTML(add) {
        return Markup.comment(add(this));
    }
    /**
     * Creates a behavior.
     * @param targets - The targets available for behaviors to be attached to.
     */
    createBehavior() {
        return new RenderBehavior(this);
    }
}
HTMLDirective.define(RenderDirective);
function isElementRenderOptions(object) {
    return !!object.element || !!object.tagName;
}
const typeToInstructionLookup = new Map();
/* eslint @typescript-eslint/naming-convention: "off"*/
const defaultAttributes = { ":model": (x) => x };
const brand = Symbol("RenderInstruction");
const defaultViewName = "default-view";
const nullTemplate = html `
    &nbsp;
`;
function instructionToTemplate(def) {
    if (def === void 0) {
        return nullTemplate;
    }
    return def.template;
}
function createElementTemplate(tagName, options) {
    const markup = [];
    const values = [];
    const { attributes, directives, content, policy } = options !== null && options !== void 0 ? options : {};
    markup.push(`<${tagName}`);
    if (attributes) {
        const attrNames = Object.getOwnPropertyNames(attributes);
        for (let i = 0, ii = attrNames.length; i < ii; ++i) {
            const name = attrNames[i];
            if (i === 0) {
                markup[0] = `${markup[0]} ${name}="`;
            }
            else {
                markup.push(`" ${name}="`);
            }
            values.push(attributes[name]);
        }
        markup.push(`"`);
    }
    if (directives) {
        markup[markup.length - 1] += " ";
        for (let i = 0, ii = directives.length; i < ii; ++i) {
            const directive = directives[i];
            markup.push(i > 0 ? "" : " ");
            values.push(directive);
        }
    }
    markup[markup.length - 1] += ">";
    if (content && isFunction(content.create)) {
        values.push(content);
        markup.push(`</${tagName}>`);
    }
    else {
        const lastIndex = markup.length - 1;
        markup[lastIndex] = `${markup[lastIndex]}${content !== null && content !== void 0 ? content : ""}</${tagName}>`;
    }
    return ViewTemplate.create(markup, values, policy);
}
function create(options) {
    var _a;
    const name = (_a = options.name) !== null && _a !== void 0 ? _a : defaultViewName;
    let template;
    if (isElementRenderOptions(options)) {
        let tagName = options.tagName;
        if (!tagName) {
            const def = FASTElementDefinition.getByType(options.element);
            if (def) {
                tagName = def.name;
            }
            else {
                throw new Error("Invalid element for model rendering.");
            }
        }
        if (!options.attributes) {
            options.attributes = defaultAttributes;
        }
        template = createElementTemplate(tagName, options);
    }
    else {
        template = options.template;
    }
    return {
        brand,
        type: options.type,
        name,
        template,
    };
}
function instanceOf(object) {
    return object && object.brand === brand;
}
function register(optionsOrInstruction) {
    let lookup = typeToInstructionLookup.get(optionsOrInstruction.type);
    if (lookup === void 0) {
        typeToInstructionLookup.set(optionsOrInstruction.type, (lookup = Object.create(null)));
    }
    const instruction = instanceOf(optionsOrInstruction)
        ? optionsOrInstruction
        : create(optionsOrInstruction);
    return (lookup[instruction.name] = instruction);
}
function getByType(type, name) {
    const entries = typeToInstructionLookup.get(type);
    if (entries === void 0) {
        return void 0;
    }
    return entries[name !== null && name !== void 0 ? name : defaultViewName];
}
function getForInstance(object, name) {
    if (object) {
        return getByType(object.constructor, name);
    }
    return void 0;
}
/**
 * Provides APIs for creating and interacting with render instructions.
 * @public
 */
export const RenderInstruction = Object.freeze({
    /**
     * Checks whether the provided object is a RenderInstruction.
     * @param object - The object to check.
     * @returns true if the object is a RenderInstruction; false otherwise
     */
    instanceOf,
    /**
     * Creates a RenderInstruction for a set of options.
     * @param options - The options to use when creating the RenderInstruction.
     * @remarks
     * This API should be used with caution. When providing attributes or content,
     * if not done properly, you can open up the application to XSS attacks. When using this API,
     * provide a strong DOMPolicy that can properly sanitize and also be sure to manually sanitize
     * content and attribute values particularly if they can come from user input.
     */
    create,
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
    createElementTemplate,
    /**
     * Creates and registers an instruction.
     * @param options The options to use when creating the RenderInstruction.
     * @remarks
     * A previously created RenderInstruction can also be registered.
     */
    register,
    /**
     * Finds a previously registered RenderInstruction by type and optionally by name.
     * @param type - The type to retrieve the RenderInstruction for.
     * @param name - An optional name used in differentiating between multiple registered instructions.
     * @returns The located RenderInstruction that matches the criteria or undefined if none is found.
     */
    getByType,
    /**
     * Finds a previously registered RenderInstruction for the instance's type and optionally by name.
     * @param object - The instance to retrieve the RenderInstruction for.
     * @param name - An optional name used in differentiating between multiple registered instructions.
     * @returns The located RenderInstruction that matches the criteria or undefined if none is found.
     */
    getForInstance,
});
export function renderWith(value, name) {
    return function (type) {
        if (isFunction(value)) {
            register({ type, element: value, name });
        }
        else if (isFunction(value.create)) {
            register({ type, template: value, name });
        }
        else {
            register(Object.assign({ type }, value));
        }
    };
}
/**
 * @internal
 */
export class NodeTemplate {
    constructor(node) {
        this.node = node;
        node.$fastTemplate = this;
    }
    get context() {
        // HACK
        return this;
    }
    bind(source) { }
    unbind() { }
    insertBefore(refNode) {
        refNode.parentNode.insertBefore(this.node, refNode);
    }
    remove() {
        this.node.parentNode.removeChild(this.node);
    }
    create() {
        return this;
    }
    hydrate(first, last) {
        return this;
    }
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
export function render(value, template) {
    let dataBinding;
    if (value === void 0) {
        dataBinding = oneTime((source) => source);
    }
    else {
        dataBinding = normalizeBinding(value);
    }
    let templateBinding;
    let templateBindingDependsOnData = false;
    if (template === void 0) {
        templateBindingDependsOnData = true;
        templateBinding = oneTime((s, c) => {
            var _a;
            const data = dataBinding.evaluate(s, c);
            if (data instanceof Node) {
                return (_a = data.$fastTemplate) !== null && _a !== void 0 ? _a : new NodeTemplate(data);
            }
            return instructionToTemplate(getForInstance(data));
        });
    }
    else if (isFunction(template)) {
        templateBinding = oneWay((s, c) => {
            var _a;
            let result = template(s, c);
            if (isString(result)) {
                result = instructionToTemplate(getForInstance(dataBinding.evaluate(s, c), result));
            }
            else if (result instanceof Node) {
                result = (_a = result.$fastTemplate) !== null && _a !== void 0 ? _a : new NodeTemplate(result);
            }
            return result;
        }, void 0, true);
    }
    else if (isString(template)) {
        templateBindingDependsOnData = true;
        templateBinding = oneTime((s, c) => {
            var _a;
            const data = dataBinding.evaluate(s, c);
            if (data instanceof Node) {
                return (_a = data.$fastTemplate) !== null && _a !== void 0 ? _a : new NodeTemplate(data);
            }
            return instructionToTemplate(getForInstance(data, template));
        });
    }
    else if (template instanceof Binding) {
        const evaluateTemplate = template.evaluate;
        template.evaluate = (s, c) => {
            var _a;
            let result = evaluateTemplate(s, c);
            if (isString(result)) {
                result = instructionToTemplate(getForInstance(dataBinding.evaluate(s, c), result));
            }
            else if (result instanceof Node) {
                result = (_a = result.$fastTemplate) !== null && _a !== void 0 ? _a : new NodeTemplate(result);
            }
            return result;
        };
        templateBinding = template;
    }
    else {
        templateBinding = oneTime((s, c) => template);
    }
    return new RenderDirective(dataBinding, templateBinding, templateBindingDependsOnData);
}
