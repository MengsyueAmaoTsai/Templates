/**
 * A timeout helper for use in tests.
 * @param timeout The length of the timeout.
 * @returns A promise that resolves once the configured time has elapsed.
 * @public
 */
export declare function timeout(timeout?: number): Promise<void>;
