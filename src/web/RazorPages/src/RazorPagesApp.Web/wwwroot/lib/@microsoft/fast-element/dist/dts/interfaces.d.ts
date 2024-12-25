/**
 * Represents a callable type such as a function or an object with a "call" method.
 * @public
 */
export declare type Callable = typeof Function.prototype.call | {
    call(): void;
};
/**
 * Represents a type which can be constructed with the new operator.
 *
 * @public
 */
export declare type Constructable<T = {}> = {
    new (...args: any[]): T;
};
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
 * Provides a mechanism for releasing resources.
 * @public
 */
export interface Disposable {
    /**
     * Disposes the resources.
     */
    dispose(): void;
}
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
 * Reverses all readonly members, making them mutable.
 * @public
 */
export declare type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
/**
 * A temporary type as a workaround for the TS compiler's erroneous built-in ParameterDecorator type.
 * @public
 */
export declare type ParameterDecorator = (target: Object, propertyKey: string | undefined, parameterIndex: number) => void;
/**
 * The FAST global.
 * @public
 */
export interface FASTGlobal {
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
/**
 * Core services that can be shared across FAST instances.
 * @internal
 */
declare type KernelServiceId = {
    readonly updateQueue: string | number;
    readonly observable: string | number;
    readonly contextEvent: string | number;
    readonly elementRegistry: string | number;
};
declare let KernelServiceId: KernelServiceId;
export { KernelServiceId };
/**
 * Warning and error messages.
 * @internal
 */
export declare const enum Message {
    needsArrayObservation = 1101,
    onlySetDOMPolicyOnce = 1201,
    bindingInnerHTMLRequiresTrustedTypes = 1202,
    twoWayBindingRequiresObservables = 1203,
    hostBindingWithoutHost = 1204,
    unsupportedBindingBehavior = 1205,
    directCallToHTMLTagNotAllowed = 1206,
    onlySetTemplatePolicyOnce = 1207,
    cannotSetTemplatePolicyAfterCompilation = 1208,
    blockedByDOMPolicy = 1209,
    missingElementDefinition = 1401,
    noRegistrationForContext = 1501,
    noFactoryForResolver = 1502,
    invalidResolverStrategy = 1503,
    cannotAutoregisterDependency = 1504,
    cannotResolveKey = 1505,
    cannotConstructNativeFunction = 1506,
    cannotJITRegisterNonConstructor = 1507,
    cannotJITRegisterIntrinsic = 1508,
    cannotJITRegisterInterface = 1509,
    invalidResolver = 1510,
    invalidKey = 1511,
    noDefaultResolver = 1512,
    cyclicDependency = 1513,
    connectUpdateRequiresController = 1514
}
/**
 * Determines whether or not an object is a function.
 * @public
 */
export declare const isFunction: (object: any) => object is Function;
/**
 * Determines whether or not an object is a string.
 * @public
 */
export declare const isString: (object: any) => object is string;
/**
 * A function which does nothing.
 * @public
 */
export declare const noop: () => undefined;
