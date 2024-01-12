/**
 * An interface to define a patient contact method.
 */
export default interface PatientContact {
  asHl7String: (separator: string) => string
  get code (): string
}
