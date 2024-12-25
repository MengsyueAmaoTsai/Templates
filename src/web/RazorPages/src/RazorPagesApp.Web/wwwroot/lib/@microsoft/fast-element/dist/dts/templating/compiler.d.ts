import { DOMPolicy } from "../dom.js";
import { ViewBehaviorFactory } from "./html-directive.js";
import type { HTMLTemplateCompilationResult as TemplateCompilationResult } from "./template.js";
/**
 * A function capable of compiling a template from the preprocessed form produced
 * by the html template function into a result that can instantiate views.
 * @public
 */
export declare type CompilationStrategy = (
/**
 * The preprocessed HTML string or template to compile.
 */
html: string | HTMLTemplateElement, 
/**
 * The behavior factories used within the html that is being compiled.
 */
factories: Record<string, ViewBehaviorFactory>, 
/**
 * The security policy to compile the html with.
 */
policy: DOMPolicy) => TemplateCompilationResult;
/**
 * Common APIs related to compilation.
 * @public
 */
export declare const Compiler: {
    /**
     * Compiles a template and associated directives into a compilation
     * result which can be used to create views.
     * @param html - The html string or template element to compile.
     * @param factories - The behavior factories referenced by the template.
     * @param policy - The security policy to compile the html with.
     * @remarks
     * The template that is provided for compilation is altered in-place
     * and cannot be compiled again. If the original template must be preserved,
     * it is recommended that you clone the original and pass the clone to this API.
     * @public
     */
    compile<TSource = any, TParent = any>(html: string | HTMLTemplateElement, factories: Record<string, ViewBehaviorFactory>, policy?: DOMPolicy): TemplateCompilationResult<TSource, TParent>;
    /**
     * Sets the default compilation strategy that will be used by the ViewTemplate whenever
     * it needs to compile a view preprocessed with the html template function.
     * @param strategy - The compilation strategy to use when compiling templates.
     */
    setDefaultStrategy(strategy: CompilationStrategy): void;
    /**
     * Aggregates an array of strings and directives into a single directive.
     * @param parts - A heterogeneous array of static strings interspersed with
     * directives.
     * @param policy - The security policy to use with the aggregated bindings.
     * @returns A single inline directive that aggregates the behavior of all the parts.
     */
    aggregate(parts: (string | ViewBehaviorFactory)[], policy?: DOMPolicy): ViewBehaviorFactory;
};
