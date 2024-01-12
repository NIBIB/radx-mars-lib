/* eslint-disable max-len */
import CodingSystem from './CodingSystem'
import CodedValue from './CodedValue'
import type TestResultCode from './TestResultCode'
import type TestResultAbnormalFlagsCode from './TestResultAbnormalFlagsCode'

/**
 * The observation for a lab test.  Commonly referred to as the result.  This
 * class represents both static (test result type information) and dynamic
 * (test result per patient) information.
 *
 * This class maps largely to the OBX segment of an HL7 ELR 2.5.1 message's OBX
 * segment.
 *
 * For specific RADx MARS values for this class, view the RADx MARS PowerBI
 * dashboard available at https://app.powerbi.com/view?r=eyJrIjoiZWZjZDQyYjktNGFiMC00YWZkLTg2NTYtMjg2ODEyZWM1ZTViIiwidCI6IjQzNGUwYWVkLWVmODItNDU2OC1hMDQ5LTNiMTdhZGMwOGRkZCIsImMiOjF9&pageName=ReportSection3147535a75468ee60d16
 */
export default class TestResult extends CodedValue {
  _deviceIdentifier: string
  _determinationDate: Date
  _testResultCode: TestResultCode
  _testResultAbnormalFlagsCode: TestResultAbnormalFlagsCode

  // TODO: Create a test and bound result status to only allowed values.
  /**
   * Constructs an {@link TestResult} object used by the
   * {@link LabResultSubmitter} to submit a test result to a RADx MARS compliant
   * hub.
   * Implementation note: While this class can be used in any RADx program test
   * system as defined, most implementations should use this as a base class
   * as the values for code, description, and deviceIdentifier are unlikely
   * to change from test to test.
   * @param code The code respresenting the test result.  On the RADx MARS
   * PowerBI dashboard, this field is labeled as OBX[1]-3.1.
   * @param description The description of the test result, corresponding to
   * OBX[1]-3.2 on the RADx MARS PowerBI Dashboard.
   * @param deviceIdentifier This device identifier responsible for the test
   * result.  This is the OBX[1]-17.1 field on the RADx MARS PowerBI dashboard.
   * @param determinationDate Represents the date the test result was determined.
   * @param testResultCode A {@link TestResultCode} instance representing the
   * the result of the test execution.
   * @param testResultAbnormalFlagsCode A {@link TestResultAbnormalFlagsCode}
   * instance identifying whether or not the test results were abnormal.
   * @param codingSystem The {@link CodingSystem} of the test result. This
   * defaults to {@link CodingSystem.LOINC_271}
   */
  constructor (
    code: string,
    description: string,
    deviceIdentifier: string,
    determinationDate: Date,
    testResultCode: TestResultCode,
    testResultAbnormalFlagsCode: TestResultAbnormalFlagsCode,
    codingSystem: CodingSystem = CodingSystem.LOINC_271
  ) {
    super(code, description, codingSystem)
    // Corresponds to the OBX segment in the HL7 message
    this._determinationDate = determinationDate
    this._testResultCode = testResultCode
    this._deviceIdentifier = deviceIdentifier
    this._testResultAbnormalFlagsCode = testResultAbnormalFlagsCode
  }

  public get deviceIdentifier (): string {
    return this._deviceIdentifier
  }

  public get determinationDate (): Date {
    return this._determinationDate
  }

  public get testResultCode (): TestResultCode {
    return this._testResultCode
  }

  public get testResultAbnormalFlagsCode (): TestResultAbnormalFlagsCode {
    return this._testResultAbnormalFlagsCode
  }
}
