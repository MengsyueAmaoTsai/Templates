import { FASTGlobal } from "./interfaces.js";
import "./polyfills.js";
/**
 * The FAST global.
 * @public
 */
export declare const FAST: FASTGlobal;
/**
 * A readonly, empty array.
 * @remarks
 * Typically returned by APIs that return arrays when there are
 * no actual items to return.
 * @public
 */
export declare const emptyArray: readonly never[];
/**
 * Do not change. Part of shared kernel contract.
 * @internal
 */
export interface TypeDefinition {
    type: Function;
}
/**
 * Do not change. Part of shared kernel contract.
 * @internal
 */
export interface TypeRegistry<TDefinition extends TypeDefinition> {
    register(definition: TDefinition): boolean;
    getByType(key: Function): TDefinition | undefined;
    getForInstance(object: any): TDefinition | undefined;
}
/**
 * Do not change. Part of shared kernel contract.
 * @internal
 */
export declare function createTypeRegistry<TDefinition extends TypeDefinition>(): TypeRegistry<TDefinition>;
/**
 * Creates a function capable of locating metadata associated with a type.
 * @returns A metadata locator function.
 * @internal
 */
export declare function createMetadataLocator<TMetadata>(): (target: {}) => TMetadata[];
/**
 * Makes a type noop for JSON serialization.
 * @param type - The type to make noop for JSON serialization.
 * @internal
 */
export declare function makeSerializationNoop(type: {
    readonly prototype: any;
}): void;
