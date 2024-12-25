import { Disposable } from "../interfaces.js";
import type { Subscriber } from "../observation/notifier.js";
/**
 * Deeply subscribes to changes in existing observable objects.
 * @param object - The observable object to watch.
 * @param subscriber - The handler to call when changes are made to the object.
 * @returns A disposable that can be used to unsubscribe from change updates.
 * @beta
 */
export declare function watch(object: any, subscriber: Subscriber | ((subject: any, args: any) => void)): Disposable;
