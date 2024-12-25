import { Callable } from "../interfaces.js";
/**
 * A work queue used to synchronize writes to the DOM.
 * @public
 */
export interface UpdateQueue {
    /**
     * Schedules DOM update work in the next batch.
     * @param callable - The callable function or object to queue.
     */
    enqueue(callable: Callable): void;
    /**
     * Resolves with the next DOM update.
     */
    next(): Promise<void>;
    /**
     * Immediately processes all work previously scheduled
     * through enqueue.
     * @remarks
     * This also forces next() promises
     * to resolve.
     */
    process(): void;
    /**
     * Sets the update mode used by enqueue.
     * @param isAsync - Indicates whether DOM updates should be asynchronous.
     * @remarks
     * By default, the update mode is asynchronous, since that provides the best
     * performance in the browser. Passing false to setMode will instead cause
     * the queue to be immediately processed for each call to enqueue. However,
     * ordering will still be preserved so that nested tasks do not run until
     * after parent tasks complete.
     */
    setMode(isAsync: boolean): void;
}
/**
 * The default UpdateQueue.
 * @public
 */
export declare const Updates: UpdateQueue;
