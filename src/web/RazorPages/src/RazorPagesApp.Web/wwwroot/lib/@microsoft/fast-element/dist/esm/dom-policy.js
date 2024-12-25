import { DOMAspect } from "./dom.js";
import { isString } from "./interfaces.js";
import { FAST } from "./platform.js";
function safeURL(tagName, aspect, aspectName, sink) {
    return (target, name, value, ...rest) => {
        if (isString(value)) {
            value = value.replace(/(javascript:|vbscript:|data:)/, "");
        }
        sink(target, name, value, ...rest);
    };
}
function block(tagName, aspect, aspectName, sink) {
    throw FAST.error(1209 /* Message.blockedByDOMPolicy */, {
        aspectName,
        tagName: tagName !== null && tagName !== void 0 ? tagName : "text",
    });
}
const defaultDOMElementGuards = {
    a: {
        [DOMAspect.attribute]: {
            href: safeURL,
        },
        [DOMAspect.property]: {
            href: safeURL,
        },
    },
    area: {
        [DOMAspect.attribute]: {
            href: safeURL,
        },
        [DOMAspect.property]: {
            href: safeURL,
        },
    },
    button: {
        [DOMAspect.attribute]: {
            formaction: safeURL,
        },
        [DOMAspect.property]: {
            formAction: safeURL,
        },
    },
    embed: {
        [DOMAspect.attribute]: {
            src: block,
        },
        [DOMAspect.property]: {
            src: block,
        },
    },
    form: {
        [DOMAspect.attribute]: {
            action: safeURL,
        },
        [DOMAspect.property]: {
            action: safeURL,
        },
    },
    frame: {
        [DOMAspect.attribute]: {
            src: safeURL,
        },
        [DOMAspect.property]: {
            src: safeURL,
        },
    },
    iframe: {
        [DOMAspect.attribute]: {
            src: safeURL,
        },
        [DOMAspect.property]: {
            src: safeURL,
            srcdoc: block,
        },
    },
    input: {
        [DOMAspect.attribute]: {
            formaction: safeURL,
        },
        [DOMAspect.property]: {
            formAction: safeURL,
        },
    },
    link: {
        [DOMAspect.attribute]: {
            href: block,
        },
        [DOMAspect.property]: {
            href: block,
        },
    },
    object: {
        [DOMAspect.attribute]: {
            codebase: block,
            data: block,
        },
        [DOMAspect.property]: {
            codeBase: block,
            data: block,
        },
    },
    script: {
        [DOMAspect.attribute]: {
            src: block,
            text: block,
        },
        [DOMAspect.property]: {
            src: block,
            text: block,
            innerText: block,
            textContent: block,
        },
    },
    style: {
        [DOMAspect.property]: {
            innerText: block,
            textContent: block,
        },
    },
};
const blockedEvents = {
    onabort: block,
    onauxclick: block,
    onbeforeinput: block,
    onbeforematch: block,
    onblur: block,
    oncancel: block,
    oncanplay: block,
    oncanplaythrough: block,
    onchange: block,
    onclick: block,
    onclose: block,
    oncontextlost: block,
    oncontextmenu: block,
    oncontextrestored: block,
    oncopy: block,
    oncuechange: block,
    oncut: block,
    ondblclick: block,
    ondrag: block,
    ondragend: block,
    ondragenter: block,
    ondragleave: block,
    ondragover: block,
    ondragstart: block,
    ondrop: block,
    ondurationchange: block,
    onemptied: block,
    onended: block,
    onerror: block,
    onfocus: block,
    onformdata: block,
    oninput: block,
    oninvalid: block,
    onkeydown: block,
    onkeypress: block,
    onkeyup: block,
    onload: block,
    onloadeddata: block,
    onloadedmetadata: block,
    onloadstart: block,
    onmousedown: block,
    onmouseenter: block,
    onmouseleave: block,
    onmousemove: block,
    onmouseout: block,
    onmouseover: block,
    onmouseup: block,
    onpaste: block,
    onpause: block,
    onplay: block,
    onplaying: block,
    onprogress: block,
    onratechange: block,
    onreset: block,
    onresize: block,
    onscroll: block,
    onsecuritypolicyviolation: block,
    onseeked: block,
    onseeking: block,
    onselect: block,
    onslotchange: block,
    onstalled: block,
    onsubmit: block,
    onsuspend: block,
    ontimeupdate: block,
    ontoggle: block,
    onvolumechange: block,
    onwaiting: block,
    onwebkitanimationend: block,
    onwebkitanimationiteration: block,
    onwebkitanimationstart: block,
    onwebkittransitionend: block,
    onwheel: block,
};
const defaultDOMGuards = {
    elements: defaultDOMElementGuards,
    aspects: {
        [DOMAspect.attribute]: Object.assign({}, blockedEvents),
        [DOMAspect.property]: Object.assign({ innerHTML: block }, blockedEvents),
        [DOMAspect.event]: Object.assign({}, blockedEvents),
    },
};
function createDomSinkGuards(config, defaults) {
    const result = {};
    for (const name in defaults) {
        const overrideValue = config[name];
        const defaultValue = defaults[name];
        switch (overrideValue) {
            case null:
                // remove the default
                break;
            case undefined:
                // keep the default
                result[name] = defaultValue;
                break;
            default:
                // override the default
                result[name] = overrideValue;
                break;
        }
    }
    // add any new sinks that were not overrides
    for (const name in config) {
        if (!(name in result)) {
            result[name] = config[name];
        }
    }
    return Object.freeze(result);
}
function createDOMAspectGuards(config, defaults) {
    const result = {};
    for (const aspect in defaults) {
        const overrideValue = config[aspect];
        const defaultValue = defaults[aspect];
        switch (overrideValue) {
            case null:
                // remove the default
                break;
            case undefined:
                // keep the default
                result[aspect] = createDomSinkGuards(defaultValue, {});
                break;
            default:
                // override the default
                result[aspect] = createDomSinkGuards(overrideValue, defaultValue);
                break;
        }
    }
    // add any new aspect guards that were not overrides
    for (const aspect in config) {
        if (!(aspect in result)) {
            result[aspect] = createDomSinkGuards(config[aspect], {});
        }
    }
    return Object.freeze(result);
}
function createElementGuards(config, defaults) {
    const result = {};
    for (const tag in defaults) {
        const overrideValue = config[tag];
        const defaultValue = defaults[tag];
        switch (overrideValue) {
            case null:
                // remove the default
                break;
            case undefined:
                // keep the default
                result[tag] = createDOMAspectGuards(overrideValue, {});
                break;
            default:
                // override the default aspects
                result[tag] = createDOMAspectGuards(overrideValue, defaultValue);
                break;
        }
    }
    // Add any new element guards that were not overrides
    for (const tag in config) {
        if (!(tag in result)) {
            result[tag] = createDOMAspectGuards(config[tag], {});
        }
    }
    return Object.freeze(result);
}
function createDOMGuards(config, defaults) {
    return Object.freeze({
        elements: config.elements
            ? createElementGuards(config.elements, defaults.elements)
            : defaults.elements,
        aspects: config.aspects
            ? createDOMAspectGuards(config.aspects, defaults.aspects)
            : defaults.aspects,
    });
}
function createTrustedType() {
    const createHTML = html => html;
    return globalThis.trustedTypes
        ? globalThis.trustedTypes.createPolicy("fast-html", { createHTML })
        : { createHTML };
}
function tryGuard(aspectGuards, tagName, aspect, aspectName, sink) {
    const sinkGuards = aspectGuards[aspect];
    if (sinkGuards) {
        const guard = sinkGuards[aspectName];
        if (guard) {
            return guard(tagName, aspect, aspectName, sink);
        }
    }
}
/**
 * A helper for creating DOM policies.
 * @public
 */
const DOMPolicy = Object.freeze({
    /**
     * Creates a new DOM Policy object.
     * @param options The options to use in creating the policy.
     * @returns The newly created DOMPolicy.
     */
    create(options = {}) {
        var _a, _b;
        const trustedType = (_a = options.trustedType) !== null && _a !== void 0 ? _a : createTrustedType();
        const guards = createDOMGuards((_b = options.guards) !== null && _b !== void 0 ? _b : {}, defaultDOMGuards);
        return Object.freeze({
            createHTML(value) {
                return trustedType.createHTML(value);
            },
            protect(tagName, aspect, aspectName, sink) {
                var _a;
                // Check for element-specific guards.
                const key = (tagName !== null && tagName !== void 0 ? tagName : "").toLowerCase();
                const elementGuards = guards.elements[key];
                if (elementGuards) {
                    const guard = tryGuard(elementGuards, tagName, aspect, aspectName, sink);
                    if (guard) {
                        return guard;
                    }
                }
                // Check for guards applicable to all nodes.
                return ((_a = tryGuard(guards.aspects, tagName, aspect, aspectName, sink)) !== null && _a !== void 0 ? _a : sink);
            },
        });
    },
});
export { DOMPolicy };
