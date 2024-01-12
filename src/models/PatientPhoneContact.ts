import type PatientContact from './PatientContact'

export default class PatientPhoneContact implements PatientContact {
  private readonly _areaCode: string
  private readonly _localNumber: string

  /**
   * Constructs a {@link PatientPhoneContact} encapsulating a patient's phone
   * contact information.
   * @param areaCode area code of the phone number
   * @param localNumber the phone number w/o area code
   */
  constructor (
    areaCode: string,
    localNumber: string
  ) {
    this._areaCode = areaCode
    this._localNumber = localNumber
  }

  /** Identfies the {@link PatientContact} as a phone number */
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

  /** A static object used to indicate the patient has no phone contact */
  static readonly NoPhoneContact: PatientContact = new PatientPhoneContact(
    '111',
    '1111111'
  )
}
