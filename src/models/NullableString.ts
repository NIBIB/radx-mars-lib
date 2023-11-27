export type NullableString = string | null

export function safeNullableString (
  input: NullableString,
  defaultValue: string = ''
): string {
  return input ?? defaultValue
}
