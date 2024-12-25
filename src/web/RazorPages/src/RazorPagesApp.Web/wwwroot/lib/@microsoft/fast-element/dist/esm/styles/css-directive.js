import { createTypeRegistry } from "../platform.js";
const registry = createTypeRegistry();
/**
 * Instructs the css engine to provide dynamic styles or
 * associate behaviors with styles.
 * @public
 */
export const CSSDirective = Object.freeze({
    /**
     * Gets the directive definition associated with the instance.
     * @param instance - The directive instance to retrieve the definition for.
     */
    getForInstance: registry.getForInstance,
    /**
     * Gets the directive definition associated with the specified type.
     * @param type - The directive type to retrieve the definition for.
     */
    getByType: registry.getByType,
    /**
     * Defines a CSSDirective.
     * @param type - The type to define as a directive.
     */
    define(type) {
        registry.register({ type });
        return type;
    },
});
/**
 * Decorator: Defines a CSSDirective.
 * @public
 */
export function cssDirective() {
    /* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */
    return function (type) {
        CSSDirective.define(type);
    };
}
