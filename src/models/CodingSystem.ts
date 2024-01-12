/**
 * The CodingSystem class is used to encapsulate the known coding systems
 * specific to the MARs hubs and to thus simplify the implementation of correct
 * HL7 messages.
 */
export default class CodingSystem {
  private readonly _code: string
  private readonly _version: string

  /**
   * Constructs a CodingSystem object.  Known CodingSystem objects are
   * represented as static properties of the CodingSystem class.
   * @param code The short-hand definition of the coding type.
   * @param version The version of the coding type
   */
  constructor (code: string, version: string) {
    this._code = code
    this._version = version
  }

  public get code (): string {
    return this._code
  }

  public get version (): string {
    return this._version
  }

  static readonly LOINC_271: CodingSystem = new CodingSystem('LN', '2.71')
  static readonly SCT_20210301: CodingSystem = new CodingSystem('SCT', '20210301')
  static readonly HL70005_251: CodingSystem = new CodingSystem('HL70005', '2.5.1')
  static readonly HL70078_251: CodingSystem = new CodingSystem('HL70078', '2.5.1')
  static readonly HL70189_251: CodingSystem = new CodingSystem('HL70189', '2.5.1')
  // eslint-disable-next-line max-len
  static readonly N99ELR_VUNKNOWN: CodingSystem = new CodingSystem('99ELR', 'Vunknown')
  static readonly HL720005_300: CodingSystem = new CodingSystem('HL720005', '3.0.0')
  static readonly HL720189_210: CodingSystem = new CodingSystem('HL720189', '2.1.0')
  /**
   * Generates an HL7 compatible string of the code system.  BEWARE, this
   * representation assumes there are 3 fields/subfields separating the code
   * system identifier and the version.  Do NOT use this if you are unsure of
   * the gapping.
   *
   * @param separator the separator between the elements.  Typically '^'
   * @returns S string representation of the code system.
   */
  public asHl7String (separator: string = '^'): string {
    return [
      this._code,
      '',
      '',
      '',
      this._version
    ].join(separator)
  }
}
