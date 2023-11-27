import type CodingSystem from './CodingSystem'
import CodedValue from './CodedValue'
import type TestResultCode from './TestResultCode'
import type TestResultAbnormalFlagsCode from './TestResultAbnormalFlagsCode'

/** The observation for a lab test.  Commonly referred to as the result.
 *
 * @param {string} id The observation identifier as defined
 * for the OBX segment this observation represents.
 * @param {string} value The raw value for the observation passed in
 * as the {observationIdentifier}
 * @param {string} resultStatus The human term for the result:
 * passed, failed, etc.
 **/
export default class TestResult extends CodedValue {
  _deviceIdentifier: string
  _determinationDate: Date
  _testResultCode: TestResultCode
  _testResultAbnormalFlagsCode: TestResultAbnormalFlagsCode

  // TODO: Create a test and bound result status to only allowed values.
  constructor (
    code: string,
    description: string,
    deviceIdentifier: string,
    determinationDate: Date,
    testResultCode: TestResultCode,
    testResultAbnormalFlagsCode: TestResultAbnormalFlagsCode,
    codingSystem: CodingSystem
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
