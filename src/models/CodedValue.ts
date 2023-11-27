import type CodingSystem from './CodingSystem'

export default class CodedValue {
  private readonly _code: string
  private readonly _description: string
  private readonly _codingSystem: CodingSystem

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

  public asHl7String (separator: string = '^'): string {
    return [
      this._code,
      this._description,
      this._codingSystem.asHl7String(separator)
    ].join(separator)
  }
}
