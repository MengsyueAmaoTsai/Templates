/**
 * A concrete implementation of {@link PendingTask}
 * @public
 */
export class PendingTaskEvent extends Event {
    /**
     * Creates an instance of PendingTaskEvent.
     * @param complete - A promise that resolves when the pending task is complete.
     */
    constructor(complete) {
        super(PendingTaskEvent.type, { bubbles: true, composed: true });
        this.complete = complete;
    }
    /**
     * Determines whether a value is a PendingTaskEvent.
     * @param value - The value to check.
     * @returns True if the value is a PendingTaskEvent; false otherwise.
     */
    static isPendingTask(value) {
        var _a;
        return (value.type === PendingTaskEvent.type &&
            typeof ((_a = value.complete) === null || _a === void 0 ? void 0 : _a.then) === "function");
    }
}
/**
 * The type of the pending task event.
 */
PendingTaskEvent.type = "pending-task";
