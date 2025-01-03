import { directionByIsDark } from '../utilities/direction-by-is-dark';
/**
 * Color algorithm using a delta from the reference color.
 *
 * @param palette - The palette to operate on
 * @param reference - The reference color
 * @param delta - The offset from the reference
 *
 * @internal
 */
export function deltaSwatch(palette, reference, delta) {
    return palette.get(palette.closestIndexOf(reference) + directionByIsDark(reference) * delta);
}
