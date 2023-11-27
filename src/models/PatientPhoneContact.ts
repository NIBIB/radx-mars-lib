import type PatientContact from './PatientContact'

export default class PatientPhoneContact implements PatientContact {
  private readonly _areaCode: string
  private readonly _localNumber: string

  constructor (
    areaCode: string,
    localNumber: string
  ) {
    this._areaCode = areaCode
    this._localNumber = localNumber
  }

  public readonly code = 'PH'

  public get areaCode (): string {
    return this._areaCode
  }

  public get localNumber (): string {
    return this._localNumber
  }

  public asHl7String (separator: string): string {
    return [
      '',
      '',
      this.code,
      '',
      '',
      this._areaCode,
      this._localNumber
    ].join(separator)
  }

  static readonly NoPhoneContact: PatientContact = new PatientPhoneContact(
    '111',
    '1111111'
  )
}
