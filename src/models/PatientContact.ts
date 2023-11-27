export default interface PatientContact {
  asHl7String: (separator: string) => string
  get code (): string
}
