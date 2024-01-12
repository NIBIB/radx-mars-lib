import type PerformingOrganization from './PerformingOrganization'
import type SpecimenCollectionType from './SpecimenCollectionType'
import CodingSystem from './CodingSystem'
import CodedValue from './CodedValue'

/**
 * Identifies the test.  Used when constructing the HL7 message and is made
 * available to the {@link LabResultSubmitter} class when submitting a
 * lab result to a MARS Hub.  The {@link Test} class represents the data
 * presented on the NIH PowerBI Dashboard.  The test, itself, can be presented
 * as a {@link CodedValue}.
 *
 * The test corresponds to the OBR segment of an HL7 2.5.1 ELR message.
 */
export default class Test extends CodedValue {
  private readonly _performingOrganization: PerformingOrganization
  private readonly _specimenCollectionType: SpecimenCollectionType

  /**
   * Constructs a {@link Test} object.  The test object corresponds to the OBR
   * segment of an HL7 2.5.1 ELR message.
   * @param code The code identifying the test.  This value can be found on the
   * PowerBI dashboard identified as field OBR-4.1.
   * @param description The description of the test as identified on the PowerBI
   * dashboard as field OBR-4.2
   * @param performingOrganization The corresponding
   * {@link PerformingOrganization} class as identified in OBR-16.3 on the
   * PowerBI dashboard.
   * @param specimenCollectionType The corresponding
   * {@link SpecimenCollectionType} as defined as field SPM-4.1 - SPM-4.3 on
   * the PowerBI dashboard.
   * @param codingSystem - the coding system of the test.  This defaults to
   * LOINC as mandated by the RADx MARS Hub.
   */
  constructor (
    code: string,
    description: string,
    performingOrganization: PerformingOrganization,
    specimenCollectionType: SpecimenCollectionType,
    codingSystem: CodingSystem = CodingSystem.LOINC_271
  ) {
    super(code, description, codingSystem)
    this._specimenCollectionType = specimenCollectionType
    this._performingOrganization = performingOrganization
  }

  public get specimenCollectionType (): SpecimenCollectionType {
    return this._specimenCollectionType
  }

  public get performingOrganization (): PerformingOrganization {
    return this._performingOrganization
  }

  public asHl7String (separator: string = '^'): string {
    return [
      this.code,
      this.description,
      this.codingSystem.asHl7String('^')
    ].join(separator)
  }
}
