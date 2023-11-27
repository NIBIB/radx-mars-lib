/**
 * Constructs a patient name object, usually flattened into a single field in
 * an HL7 segment.
 */

export default class PatientName {
  private readonly _firstName: string
  private readonly _middleNameOrInitial: string
  private readonly _lastName: string

  constructor (
    lastName: string,
    firstName: string,
    middleNameOrInitial: string
  ) {
    this._lastName = lastName
    this._firstName = firstName
    this._middleNameOrInitial = middleNameOrInitial
  }

  public get lastName (): string {
    return this._lastName
  }

  public get firstName (): string {
    return this._firstName
  }

  public get middleNameOrInitial (): string {
    return this._middleNameOrInitial
  }

  public asHl7String (separator: string = '^'): string {
    return [
      this._lastName,
      this._firstName,
      this._middleNameOrInitial
    ].join(separator)
  }
}
