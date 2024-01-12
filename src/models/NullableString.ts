/**
 * A helper class to shorthand string | null and to provide a couple of helper
 * methods on the type.
 */
export type NullableString = string | null

/**
 * A method to safely work with nullable string.
 * @param input nullable string from which we're going to get a safe value.
 * @param defaultValue value to return if input is null.
 * @returns the value of input if it's not null, otherwise the default value.
 */
export function safeNullableString (
  input: NullableString,
  defaultValue: string = ''
): string {
  return input ?? defaultValue
}
