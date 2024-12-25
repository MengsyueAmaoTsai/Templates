import { noop } from "../interfaces.js";
import { ExecutionContext } from "../observation/observable.js";
export const Fake = Object.freeze({
    executionContext(parent, parentContext) {
        return {
            /**
             * The index of the current item within a repeat context.
             */
            index: 0,
            /**
             * The length of the current collection within a repeat context.
             */
            length: 0,
            /**
             * The parent data source within a nested context.
             */
            parent: parent,
            /**
             * The parent execution context when in nested context scenarios.
             */
            parentContext: parentContext,
            /**
             * The current event within an event handler.
             */
            get event() {
                return ExecutionContext.getEvent();
            },
            /**
             * Indicates whether the current item within a repeat context
             * has an even index.
             */
            get isEven() {
                return this.index % 2 === 0;
            },
            /**
             * Indicates whether the current item within a repeat context
             * has an odd index.
             */
            get isOdd() {
                return this.index % 2 !== 0;
            },
            /**
             * Indicates whether the current item within a repeat context
             * is the first item in the collection.
             */
            get isFirst() {
                return this.index === 0;
            },
            /**
             * Indicates whether the current item within a repeat context
             * is somewhere in the middle of the collection.
             */
            get isInMiddle() {
                return !this.isFirst && !this.isLast;
            },
            /**
             * Indicates whether the current item within a repeat context
             * is the last item in the collection.
             */
            get isLast() {
                return this.index === this.length - 1;
            },
            /**
             * Returns the typed event detail of a custom event.
             */
            eventDetail() {
                return this.event.detail;
            },
            /**
             * Returns the typed event target of the event.
             */
            eventTarget() {
                return this.event.target;
            },
        };
    },
    viewController(targets = {}, ...behaviors) {
        const unbindables = new Set();
        return {
            isBound: false,
            context: null,
            onUnbind(object) {
                unbindables.add(object);
            },
            source: null,
            targets,
            toJSON: noop,
            bind(source, context = Fake.executionContext()) {
                if (this.isBound) {
                    return;
                }
                this.source = source;
                this.context = context;
                behaviors.forEach(x => x.bind(this));
                this.isBound = true;
            },
            unbind() {
                if (this.isBound) {
                    unbindables.forEach(x => x.unbind(this));
                    this.source = null;
                    this.context = null;
                    this.isBound = false;
                }
            },
        };
    },
});
