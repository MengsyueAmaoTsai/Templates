import { emptyArray } from "./platform.js";
// Tiny polyfill for TypeScript's Reflect metadata API.
const metadataByTarget = new Map();
if (!("metadata" in Reflect)) {
    Reflect.metadata = function (key, value) {
        return function (target) {
            Reflect.defineMetadata(key, value, target);
        };
    };
    Reflect.defineMetadata = function (key, value, target) {
        let metadata = metadataByTarget.get(target);
        if (metadata === void 0) {
            metadataByTarget.set(target, (metadata = new Map()));
        }
        metadata.set(key, value);
    };
    Reflect.getOwnMetadata = function (key, target) {
        const metadata = metadataByTarget.get(target);
        if (metadata !== void 0) {
            return metadata.get(key);
        }
        return void 0;
    };
}
const annotationParamTypesKey = "annotation:paramtypes";
const designParamTypesKey = "design:paramtypes";
/**
 * Provides basic metadata capabilities used by Context and Dependency Injection.
 * @public
 */
export const Metadata = Object.freeze({
    /**
     * Gets the "design:paramtypes" metadata for the specified type.
     * @param Type - The type to get the metadata for.
     * @returns The metadata array or a frozen empty array if no metadata is found.
     */
    getDesignParamTypes: (Type) => {
        var _a;
        return ((_a = Reflect.getOwnMetadata(designParamTypesKey, Type)) !== null && _a !== void 0 ? _a : emptyArray);
    },
    /**
     * Gets the "annotation:paramtypes" metadata for the specified type.
     * @param Type - The type to get the metadata for.
     * @returns The metadata array or a frozen empty array if no metadata is found.
     */
    getAnnotationParamTypes: (Type) => {
        var _a;
        return ((_a = Reflect.getOwnMetadata(annotationParamTypesKey, Type)) !== null && _a !== void 0 ? _a : emptyArray);
    },
    /**
     * Gets the "annotation:paramtypes" metadata for the specified type. If none is found,
     * an empty, mutable metadata array is created and added.
     * @param Type - The type to get or create the metadata for.
     * @returns A mutable metadata array.
     */
    getOrCreateAnnotationParamTypes(Type) {
        let types = this.getAnnotationParamTypes(Type);
        if (types === emptyArray) {
            Reflect.defineMetadata(annotationParamTypesKey, (types = []), Type);
        }
        return types;
    },
});
