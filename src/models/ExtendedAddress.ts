import { type NullableString, safeNullableString } from './NullableString'

/**
 * Represents an HL7 ExtendedAddress object.  Supports construction and
 * serialization of said object.
 */
export default class ExtendedAddress {
  private readonly _street: NullableString
  private readonly _street2: NullableString
  private readonly _city: NullableString
  private readonly _state: NullableString
  private readonly _zip: string
  private readonly _county: NullableString

  /**
   * Represents an HL7 ExtendedAddress object.  Supports construction and
   * serialization of said object.
   *
   * @param zip - Required zipcode of the address.
   * @param street - Optional line 1 of the street address.
   * @param street2 - Optional line 2 of the street address.
   * @param city - optional city of the address.
   * @param state - optional state of the adderss.
   * @param county - optional county for the user.  This is to be chosen
   * based on zipcode and matched against the PHINVADS table to find the
   * appropriate value field.
   */
  constructor (
    zip: string,
    street: NullableString,
    street2: NullableString,
    city: NullableString,
    state: NullableString,
    county: NullableString
  ) {
    this._street = street
    this._street2 = street2
    this._city = city
    this._state = state
    this._zip = zip
    this._county = county
  }

  public get street (): NullableString {
    return this._street
  }

  public get street2 (): NullableString {
    return this._street2
  }

  public get city (): NullableString {
    return this._city
  }

  public get state (): NullableString {
    return this._state
  }

  public get zip (): string {
    return this._zip
  }

  public get county (): NullableString {
    return this._county
  }

  public asHl7String (separator: string = '^'): string {
    if (this._zip == null || this._zip.trim().length === 0) {
      throw Error('Address missing required zip code')
    }

    return [
      safeNullableString(this._street),
      safeNullableString(this._street2),
      safeNullableString(this._city),
      safeNullableString(this._state),
      this._zip,
      '',
      '',
      '',
      safeNullableString(this._county)
    ].join(separator)
  }

  static MinExtendedAddress (zip: string): ExtendedAddress {
    return new ExtendedAddress(zip, null, null, null, null, null)
  }
}
