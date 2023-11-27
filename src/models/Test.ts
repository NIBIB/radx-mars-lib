import type PerformingOrganization from './PerformingOrganization'
import type SpecimenCollectionType from './SpecimenCollectionType'
import CodingSystem from './CodingSystem'
import CodedValue from './CodedValue'

/**
 * Identifies the test.  Used when constructing the HL7 message and is made
 * available to the {LabResultSubmitter} class when submitting a lab result
 *
 * @param {string} testName - The name of the test being conducted.
 * @param {string} testId - The id of the test being executed.  This is the
 * unique ID of the test instance in your system and NOT the ID of the test
 * definition.
 */

export default class Test extends CodedValue {
  private readonly _performingOrganization: PerformingOrganization
  private readonly _specimenCollectionType: SpecimenCollectionType

  // private _testType: TestType;

  // TODO: Test to ensure fields are valid.
  // TODO: Test to ensure fields are supplied.
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
