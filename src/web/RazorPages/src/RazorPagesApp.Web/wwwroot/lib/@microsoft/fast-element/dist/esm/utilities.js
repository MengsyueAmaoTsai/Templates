import { DOM } from "./dom.js";
import { ExecutionContext } from "./observation/observable.js";
import { nextId } from "./templating/markup.js";
/**
 * Retrieves the "composed parent" element of a node, ignoring DOM tree boundaries.
 * When the parent of a node is a shadow-root, it will return the host
 * element of the shadow root. Otherwise it will return the parent node or null if
 * no parent node exists.
 * @param element - The element for which to retrieve the composed parent
 *
 * @public
 */
export function composedParent(element) {
    const parentNode = element.parentElement;
    if (parentNode) {
        return parentNode;
    }
    else {
        const rootNode = element.getRootNode();
        if (rootNode.host instanceof HTMLElement) {
            // this is shadow-root
            return rootNode.host;
        }
    }
    return null;
}
/**
 * Determines if the reference element contains the test element in a "composed" DOM tree that
 * ignores shadow DOM boundaries.
 *
 * Returns true of the test element is a descendent of the reference, or exists in
 * a shadow DOM that is a logical descendent of the reference. Otherwise returns false.
 * @param reference - The element to test for containment against.
 * @param test - The element being tested for containment.
 *
 * @public
 */
export function composedContains(reference, test) {
    let current = test;
    while (current !== null) {
        if (current === reference) {
            return true;
        }
        current = composedParent(current);
    }
    return false;
}
/**
 * An extension of MutationObserver that supports unobserving nodes.
 * @internal
 */
export class UnobservableMutationObserver extends MutationObserver {
    /**
     * Creates an instance of UnobservableMutationObserver.
     * @param callback - The callback to invoke when observed nodes are changed.
     */
    constructor(callback) {
        function handler(mutations) {
            this.callback.call(null, mutations.filter(record => this.observedNodes.has(record.target)));
        }
        super(handler);
        this.callback = callback;
        this.observedNodes = new Set();
    }
    observe(target, options) {
        this.observedNodes.add(target);
        super.observe(target, options);
    }
    unobserve(target) {
        this.observedNodes.delete(target);
        if (this.observedNodes.size < 1) {
            this.disconnect();
        }
    }
}
/**
 * Bridges between ViewBehaviors and HostBehaviors, enabling a host to
 * control ViewBehaviors.
 * @public
 */
export const ViewBehaviorOrchestrator = Object.freeze({
    /**
     * Creates a ViewBehaviorOrchestrator.
     * @param source - The source to to associate behaviors with.
     * @returns A ViewBehaviorOrchestrator.
     */
    create(source) {
        const behaviors = [];
        const targets = {};
        let unbindables = null;
        let isConnected = false;
        return {
            source,
            context: ExecutionContext.default,
            targets,
            get isBound() {
                return isConnected;
            },
            addBehaviorFactory(factory, target) {
                var _a, _b, _c, _d;
                const compiled = factory;
                compiled.id = (_a = compiled.id) !== null && _a !== void 0 ? _a : nextId();
                compiled.targetNodeId = (_b = compiled.targetNodeId) !== null && _b !== void 0 ? _b : nextId();
                compiled.targetTagName = (_c = target.tagName) !== null && _c !== void 0 ? _c : null;
                compiled.policy = (_d = compiled.policy) !== null && _d !== void 0 ? _d : DOM.policy;
                this.addTarget(compiled.targetNodeId, target);
                this.addBehavior(compiled.createBehavior());
            },
            addTarget(nodeId, target) {
                targets[nodeId] = target;
            },
            addBehavior(behavior) {
                behaviors.push(behavior);
                if (isConnected) {
                    behavior.bind(this);
                }
            },
            onUnbind(unbindable) {
                if (unbindables === null) {
                    unbindables = [];
                }
                unbindables.push(unbindable);
            },
            connectedCallback(controller) {
                if (!isConnected) {
                    isConnected = true;
                    behaviors.forEach(x => x.bind(this));
                }
            },
            disconnectedCallback(controller) {
                if (isConnected) {
                    isConnected = false;
                    if (unbindables !== null) {
                        unbindables.forEach(x => x.unbind(this));
                    }
                }
            },
        };
    },
});
