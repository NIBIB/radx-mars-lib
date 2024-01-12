import type CodingSystem from './CodingSystem'

/* Encapsulates a code and descrption inside an HL7 Coding System
*/
export default class CodedValue {
  private readonly _code: string
  private readonly _description: string
  private readonly _codingSystem: CodingSystem

  /**
   * Creates a coded value object used to encapsulate a code and description
   * into the coding system as defined by the {codingSytem} parameter.
   * @param {string} code  The code to encapsulate in the value.
   * @param {string} description the description of the code to be encapsulated.
   * @param {CodingSystem} codingSystem the known supported coding system into
   * which the code and description should be indexed.
   */
  constructor (
    code: string,
    description: string,
    codingSystem: CodingSystem
  ) {
    this._code = code
    this._description = description
    this._codingSystem = codingSystem
  }

  public get code (): string {
    return this._code
  }

  public get description (): string {
    return this._description
  }

  public get codingSystem (): CodingSystem {
    return this._codingSystem
  }

  /**
   * Returns an HL7 string representation of the {@link CodedValue}.
   * @param separator The separator to use.  Defaults to '^'.  Ensure you are
   * using the appropriate separator for the level at which the value is being
   * encoded in an HL7 segment.
   * @returns An HL7 encoded string of the {@link CodedValue} object.
   */
  public asHl7String (separator: string = '^'): string {
    return [
      this._code,
      this._description,
      this._codingSystem.asHl7String(separator)
    ].join(separator)
  }
}
