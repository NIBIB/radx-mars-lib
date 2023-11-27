export default class PerformingOrganization {
  private readonly _id: string
  private readonly _name: string
  private readonly _address: string

  constructor (
    id: string,
    name: string,
    address: string
  ) {
    this._id = id
    this._name = name
    this._address = address
  }

  public get id (): string {
    return this._id
  }

  public get name (): string {
    return this._name
  }

  public get address (): string {
    return this._address
  }

  static readonly OtcSelfReport = new PerformingOrganization(
    '00Z0000042',
    'SA.OTCSelfReport',
    '14 Fake AtHome Test Street^^Fake City')

  static readonly OtcInstrument = new PerformingOrganization(
    '00Z0000042',
    'SA.OTCInstrument',
    '15 Fake AtHome Test Street^^Fake City')

  static readonly OtcProctor = new PerformingOrganization(
    '00Z0000042',
    'SA.Proctor',
    '13 Fake AtHome Test Street^^ Fake City')
}
