/**
 * Omit the key-value pair if the value equals the default value.
 *
 * @param key - The key of the key-value pair.
 * @param value - The value of the key-value pair.
 * @param defaultValue - The default value to compare with.
 * @returns An object with the key-value pair if the value does not equal the default value.
 */
export function omitDefault<T, K extends string>(
  key: K,
  value: T,
  defaultValue: T,
): { [P in K]?: T } {
  return value !== defaultValue ? { [key as any]: value } : {};
}

/**
 * Restore the value to the default value if it is undefined.
 *
 * @param value - The value to restore.
 * @param defaultValue - The default value to use if the value is undefined.
 * @returns The restored value.
 */
export function restoreDefault<T>(value: T | undefined, defaultValue: T): T {
  if (typeof value === "undefined") {
    return defaultValue;
  }
  return value;
}
