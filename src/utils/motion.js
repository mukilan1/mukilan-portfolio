/**
 * Wraps a number between min and max values
 * This replaces the functionality from @motionone/utils
 */
export function wrap(min, max, v) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}
