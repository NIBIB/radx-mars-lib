import CodingSystem from './CodingSystem'
import CodedValue from './CodedValue'

/**
 * Representst the value presented in field 5 of the generated OBX segment for
 * a specific test result. For MARS hubs, the values for these fields should
 * be pulled from the Test-Specific HL7V2 fields values sheet linked from the
 * NIH HL7 v2 implementeation guide.
 * These values indicate the presence or absence of detection for a specimen
 * collection.
 *
 * The values this class represents can be found for most RADx MARS Hub
 * recognized tests in the RADx MARS PowerBI dashboard in the OBX[1]-5 field
 * for a specific test.
 *
 * There is great parity between this class and the
 * {@link TestResultAbnormalFlagsCode} class.
 */
export default class TestResultCode extends CodedValue {
  /**
   * Constructs a TestResultCode object.  This object is serialized into the
   * OBX segment of an HL7 record, specifically at OBX-5.
   * @param code - represents the value stored in OBX-5.1 for a test result.
   * @param description - represnets teh value stored in OBX-5.2
   * @param codingSystem - The coding system used to code the results.  This
   * will default to SCT if no value is supplied.
   */
  constructor (
    code: string,
    description: string,
    codingSystem: CodingSystem = CodingSystem.SCT_20210301
  ) {
    super(code, description, codingSystem)
  }
}
