let kernelMode;
const kernelAttr = "fast-kernel";
try {
    if (document.currentScript) {
        kernelMode = document.currentScript.getAttribute(kernelAttr);
    }
    else {
        const scripts = document.getElementsByTagName("script");
        const currentScript = scripts[scripts.length - 1];
        kernelMode = currentScript.getAttribute(kernelAttr);
    }
}
catch (e) {
    kernelMode = "isolate";
}
let KernelServiceId;
switch (kernelMode) {
    case "share": // share the kernel across major versions
        KernelServiceId = Object.freeze({
            updateQueue: 1,
            observable: 2,
            contextEvent: 3,
            elementRegistry: 4,
        });
        break;
    case "share-v2": // only share the kernel with other v2 instances
        KernelServiceId = Object.freeze({
            updateQueue: 1.2,
            observable: 2.2,
            contextEvent: 3.2,
            elementRegistry: 4.2,
        });
        break;
    default:
        // fully isolate the kernel from all other FAST instances
        const postfix = `-${Math.random().toString(36).substring(2, 8)}`;
        KernelServiceId = Object.freeze({
            updateQueue: `1.2${postfix}`,
            observable: `2.2${postfix}`,
            contextEvent: `3.2${postfix}`,
            elementRegistry: `4.2${postfix}`,
        });
        break;
}
export { KernelServiceId };
/**
 * Determines whether or not an object is a function.
 * @public
 */
export const isFunction = (object) => typeof object === "function";
/**
 * Determines whether or not an object is a string.
 * @public
 */
export const isString = (object) => typeof object === "string";
/**
 * A function which does nothing.
 * @public
 */
export const noop = () => void 0;
