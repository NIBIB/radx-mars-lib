/* eslint-disable max-len */
/**
 * The PerformingOrganization class encpaulsates information about the
 * organization performing a test.  For MARs Hubs, this information can be
 * found in the RADx MARS PowerBI dashboard at
 * https://app.powerbi.com/view?r=eyJrIjoiZWZjZDQyYjktNGFiMC00YWZkLTg2NTYtMjg2ODEyZWM1ZTViIiwidCI6IjQzNGUwYWVkLWVmODItNDU2OC1hMDQ5LTNiMTdhZGMwOGRkZCIsImMiOjF9&pageName=ReportSection3147535a75468ee60d16
 *
 * Mapping information is defined in the constructor documentation.  There
 * should be no need to construct one of these objects as currently known values
 * are defined as static properties of this class.
 */
export default class PerformingOrganization {
  private readonly _id: string
  private readonly _type: string
  private readonly _address: string

  /**
   * Constructs a performing organization object.
   * @param id The identifier of the performing organization.  This is defined
   * on the PowerBI dashboard as field OBX-23.10.
   * @param type The type of the performing organization.  This is defined on
   * the PowerBI dashboard as field OBX-16.3.
   * @param address The address of the performing organization.  This is the
   * full address string labeled as field OBX-24 on the PowerBI dashboard.
   */
  constructor (
    id: string,
    type: string,
    address: string
  ) {
    this._id = id
    this._type = type
    this._address = address
  }

  public get id (): string {
    return this._id
  }

  public get type (): string {
    return this._type
  }

  public get address (): string {
    return this._address
  }

  static readonly OtcSelfReport = new PerformingOrganization(
    '00Z0000042',
    'SA.OTCSelfReport',
    '14 Fake AtHome Test Street^^Fake City')

  static readonly OtcInstrument = new PerformingOrganization(
    '00Z0000043',
    'SA.OTCInstrument',
    '15 Fake AtHome Test Street^^Fake City')

  static readonly OtcProctor = new PerformingOrganization(
    '00Z0000016',
    'SA.Proctor',
    '13 Fake AtHome Test Street^^Fake City')
}
