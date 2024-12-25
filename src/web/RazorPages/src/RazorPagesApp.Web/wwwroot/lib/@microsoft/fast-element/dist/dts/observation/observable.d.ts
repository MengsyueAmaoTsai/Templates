import { Disposable } from "../interfaces.js";
import type { Notifier, Subscriber } from "./notifier.js";
/**
 * Represents a getter/setter property accessor on an object.
 * @public
 */
export interface Accessor {
    /**
     * The name of the property.
     */
    name: string;
    /**
     * Gets the value of the property on the source object.
     * @param source - The source object to access.
     */
    getValue(source: any): any;
    /**
     * Sets the value of the property on the source object.
     * @param source - The source object to access.
     * @param value - The value to set the property to.
     */
    setValue(source: any, value: any): void;
}
/**
 * The signature of an arrow function capable of being evaluated
 * against source data and within an execution context.
 * @public
 */
export declare type Expression<TSource = any, TReturn = any, TParent = any> = (source: TSource, context: ExecutionContext<TParent>) => TReturn;
/**
 * A record of observable property access.
 * @public
 */
export interface ObservationRecord {
    /**
     * The source object with an observable property that was accessed.
     */
    propertySource: any;
    /**
     * The name of the observable property on {@link ObservationRecord.propertySource} that was accessed.
     */
    propertyName: string;
}
/**
 * Describes how the source's lifetime relates to its controller's lifetime.
 * @public
 */
export declare const SourceLifetime: Readonly<{
    /**
     * The source to controller lifetime relationship is unknown.
     */
    readonly unknown: undefined;
    /**
     * The source and controller lifetimes are coupled to one another.
     * They can/will be GC'd together.
     */
    readonly coupled: 1;
}>;
/**
 * Describes how the source's lifetime relates to its controller's lifetime.
 * @public
 */
export declare type SourceLifetime = (typeof SourceLifetime)[keyof typeof SourceLifetime];
/**
 * Controls the lifecycle of an expression and provides relevant context.
 * @public
 */
export interface ExpressionController<TSource = any, TParent = any> {
    /**
     * The source the expression is evaluated against.
     */
    readonly source: TSource;
    /**
     * Indicates how the source's lifetime relates to the controller's lifetime.
     */
    readonly sourceLifetime?: SourceLifetime;
    /**
     * The context the expression is evaluated against.
     */
    readonly context: ExecutionContext<TParent>;
    /**
     * Indicates whether the controller is bound.
     */
    readonly isBound: boolean;
    /**
     * Registers an unbind handler with the controller.
     * @param behavior - An object to call when the controller unbinds.
     */
    onUnbind(behavior: {
        unbind(controller: ExpressionController<TSource, TParent>): any;
    }): void;
}
/**
 * Observes an expression for changes.
 * @public
 */
export interface ExpressionObserver<TSource = any, TReturn = any, TParent = any> {
    /**
     * Binds the expression to the source.
     * @param controller - The controller that manages the lifecycle and related
     * context for the expression.
     */
    bind(controller: ExpressionController<TSource, TParent>): TReturn;
}
/**
 * Enables evaluation of and subscription to a binding.
 * @public
 */
export interface ExpressionNotifier<TSource = any, TReturn = any, TParent = any> extends Notifier, ExpressionObserver<TSource, TReturn, TParent>, Disposable {
    /**
     * Observes the expression.
     * @param source - The source for the expression.
     * @param context - The context for the expression.
     */
    observe(source: TSource, context?: ExecutionContext): TReturn;
    /**
     * Gets {@link ObservationRecord|ObservationRecords} that the {@link ExpressionNotifier}
     * is observing.
     */
    records(): IterableIterator<ObservationRecord>;
    /**
     * Sets the update mode used by the observer.
     * @param isAsync - Indicates whether updates should be asynchronous.
     * @remarks
     * By default, the update mode is asynchronous, since that provides the best
     * performance for template rendering scenarios. Passing false to setMode will
     * instead cause the observer to notify subscribers immediately when changes occur.
     */
    setMode(isAsync: boolean): void;
}
/**
 * Common Observable APIs.
 * @public
 */
export declare const Observable: Readonly<{
    /**
     * @internal
     * @param factory - The factory used to create array observers.
     */
    setArrayObserverFactory(factory: (collection: any[]) => Notifier): void;
    /**
     * Gets a notifier for an object or Array.
     * @param source - The object or Array to get the notifier for.
     */
    getNotifier: <T extends Notifier = Notifier>(source: any) => T;
    /**
     * Records a property change for a source object.
     * @param source - The object to record the change against.
     * @param propertyName - The property to track as changed.
     */
    track(source: unknown, propertyName: string): void;
    /**
     * Notifies watchers that the currently executing property getter or function is volatile
     * with respect to its observable dependencies.
     */
    trackVolatile(): void;
    /**
     * Notifies subscribers of a source object of changes.
     * @param source - the object to notify of changes.
     * @param args - The change args to pass to subscribers.
     */
    notify(source: unknown, args: any): void;
    /**
     * Defines an observable property on an object or prototype.
     * @param target - The target object to define the observable on.
     * @param nameOrAccessor - The name of the property to define as observable;
     * or a custom accessor that specifies the property name and accessor implementation.
     */
    defineProperty(target: {}, nameOrAccessor: string | Accessor): void;
    /**
     * Finds all the observable accessors defined on the target,
     * including its prototype chain.
     * @param target - The target object to search for accessor on.
     */
    getAccessors: (target: {}) => Accessor[];
    /**
     * Creates a {@link ExpressionNotifier} that can watch the
     * provided {@link Expression} for changes.
     * @param expression - The binding to observe.
     * @param initialSubscriber - An initial subscriber to changes in the binding value.
     * @param isVolatileBinding - Indicates whether the binding's dependency list must be re-evaluated on every value evaluation.
     */
    binding<TSource = any, TReturn = any>(expression: Expression<TSource, TReturn, any>, initialSubscriber?: Subscriber, isVolatileBinding?: boolean): ExpressionNotifier<TSource, TReturn, any>;
    /**
     * Determines whether a binding expression is volatile and needs to have its dependency list re-evaluated
     * on every evaluation of the value.
     * @param expression - The binding to inspect.
     */
    isVolatileBinding<TSource_1 = any, TReturn_1 = any>(expression: Expression<TSource_1, TReturn_1, any>): boolean;
}>;
/**
 * Decorator: Defines an observable property on the target.
 * @param target - The target to define the observable on.
 * @param nameOrAccessor - The property name or accessor to define the observable as.
 * @public
 */
export declare function observable(target: {}, nameOrAccessor: string | Accessor): void;
/**
 * Decorator: Marks a property getter as having volatile observable dependencies.
 * @param target - The target that the property is defined on.
 * @param name - The property name.
 * @param name - The existing descriptor.
 * @public
 */
export declare function volatile(target: {}, name: string | Accessor, descriptor: PropertyDescriptor): PropertyDescriptor;
/**
 * Provides additional contextual information available to behaviors and expressions.
 * @public
 */
export interface ExecutionContext<TParent = any> {
    /**
     * The index of the current item within a repeat context.
     */
    index: number;
    /**
     * The length of the current collection within a repeat context.
     */
    length: number;
    /**
     * The parent data source within a nested context.
     */
    parent: TParent;
    /**
     * The parent execution context when in nested context scenarios.
     */
    parentContext: ExecutionContext<TParent>;
    /**
     * The current event within an event handler.
     */
    readonly event: Event;
    /**
     * Indicates whether the current item within a repeat context
     * has an even index.
     */
    readonly isEven: boolean;
    /**
     * Indicates whether the current item within a repeat context
     * has an odd index.
     */
    readonly isOdd: boolean;
    /**
     * Indicates whether the current item within a repeat context
     * is the first item in the collection.
     */
    readonly isFirst: boolean;
    /**
     * Indicates whether the current item within a repeat context
     * is somewhere in the middle of the collection.
     */
    readonly isInMiddle: boolean;
    /**
     * Indicates whether the current item within a repeat context
     * is the last item in the collection.
     */
    readonly isLast: boolean;
    /**
     * Returns the typed event detail of a custom event.
     */
    eventDetail<TDetail>(): TDetail;
    /**
     * Returns the typed event target of the event.
     */
    eventTarget<TTarget extends EventTarget>(): TTarget;
}
/**
 * Provides additional contextual information available to behaviors and expressions.
 * @public
 */
export declare const ExecutionContext: Readonly<{
    /**
     * A default execution context.
     */
    default: ExecutionContext<any>;
    /**
     * Gets the current event.
     * @returns An event object.
     */
    getEvent(): Event | null;
    /**
     * Sets the current event.
     * @param event - An event object.
     */
    setEvent(event: Event | null): void;
}>;
