/**
 * Converts a plain object to a reactive, observable object.
 * @param object - The object to make reactive.
 * @param deep - Indicates whether or not to deeply convert the oject.
 * @returns The converted object.
 * @beta
 */
export declare function reactive<T>(object: T, deep?: boolean): T;
