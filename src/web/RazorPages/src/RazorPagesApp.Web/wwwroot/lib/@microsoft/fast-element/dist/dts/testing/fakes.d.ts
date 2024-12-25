import { ExecutionContext } from "../observation/observable.js";
import type { ViewBehavior, ViewBehaviorTargets } from "../templating/html-directive.js";
export declare const Fake: Readonly<{
    executionContext<TParent = any>(parent?: TParent | undefined, parentContext?: ExecutionContext<TParent> | undefined): ExecutionContext<TParent>;
    viewController<TSource = any, TParent_1 = any>(targets?: ViewBehaviorTargets, ...behaviors: ViewBehavior<TSource, TParent_1>[]): {
        isBound: boolean;
        context: ExecutionContext<TParent_1>;
        onUnbind(object: any): void;
        source: TSource;
        targets: ViewBehaviorTargets;
        toJSON: () => undefined;
        bind(source: TSource, context?: ExecutionContext<TParent_1>): void;
        unbind(): void;
    };
}>;
