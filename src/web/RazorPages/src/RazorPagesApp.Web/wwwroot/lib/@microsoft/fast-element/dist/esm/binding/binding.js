/**
 * Captures a binding expression along with related information and capabilities.
 *
 * @public
 */
export class Binding {
    /**
     * Creates a binding.
     * @param evaluate - Evaluates the binding.
     * @param policy - The security policy to associate with this binding.
     * @param isVolatile - Indicates whether the binding is volatile.
     */
    constructor(evaluate, policy, isVolatile = false) {
        this.evaluate = evaluate;
        this.policy = policy;
        this.isVolatile = isVolatile;
    }
}
