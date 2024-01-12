import CodingSystem from './CodingSystem'
import CodedValue from './CodedValue'

/**
 * The TestResultAbnormalFlagsCode is a {@link CodedValue} representing an
 * Abnormal or Normal test result.  These values map into the OBX segment of the
 * HL7 message into the OBX-8 field of the test result.  These values are
 * encoded as HL70078 2.5.1.  There is great parity between this class and the
 * {@link TestResultCode} class.
 */
export default class TestResultAbnormalFlagsCode extends CodedValue {
  static readonly Detected = new TestResultAbnormalFlagsCode(
    'A',
    'Abnormal',
    CodingSystem.HL70078_251
  )

  static readonly NotDetected = new TestResultAbnormalFlagsCode(
    'N',
    'Normal',
    CodingSystem.HL70078_251
  )
}
