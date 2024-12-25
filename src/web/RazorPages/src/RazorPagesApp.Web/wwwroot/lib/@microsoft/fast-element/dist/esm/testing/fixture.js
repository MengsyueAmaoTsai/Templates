var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FASTElementDefinition } from "../components/fast-definitions.js";
import { ViewTemplate } from "../templating/template.js";
function findElement(view) {
    let current = view.firstChild;
    while (current !== null && current.nodeType !== 1) {
        current = current.nextSibling;
    }
    return current;
}
/**
 * Creates a random, unique name suitable for use as a Custom Element name.
 * @public
 */
export function uniqueElementName(prefix = "fast-unique") {
    return `${prefix}-${Math.random().toString(36).substring(7)}`;
}
/**
 * Creates a test fixture suitable for testing custom elements, templates, and bindings.
 * @param templateNameOrType An HTML template or single element name to create the fixture for.
 * @param options Enables customizing fixture creation behavior.
 * @remarks
 * Yields control to the caller one Microtask later, in order to
 * ensure that the DOM has settled.
 * @public
 */
export function fixture(templateNameOrType, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const document = options.document || globalThis.document;
        const parent = options.parent || document.createElement("div");
        const source = options.source || {};
        if (typeof templateNameOrType === "function") {
            const def = FASTElementDefinition.getByType(templateNameOrType);
            if (!def) {
                throw new Error("Missing FASTElement definition.");
            }
            templateNameOrType = def.name;
        }
        if (typeof templateNameOrType === "string") {
            const html = `<${templateNameOrType}></${templateNameOrType}>`;
            templateNameOrType = new ViewTemplate(html);
        }
        const view = templateNameOrType.create();
        const element = findElement(view);
        let isConnected = false;
        view.bind(source);
        view.appendTo(parent);
        customElements.upgrade(parent);
        // Hook into the Microtask Queue to ensure the DOM is settled
        // before yielding control to the caller.
        yield Promise.resolve();
        const connect = () => __awaiter(this, void 0, void 0, function* () {
            if (isConnected) {
                return;
            }
            isConnected = true;
            document.body.appendChild(parent);
            yield Promise.resolve();
        });
        const disconnect = () => __awaiter(this, void 0, void 0, function* () {
            if (!isConnected) {
                return;
            }
            isConnected = false;
            document.body.removeChild(parent);
            yield Promise.resolve();
        });
        return {
            document,
            template: templateNameOrType,
            view,
            parent,
            element,
            connect,
            disconnect,
        };
    });
}
