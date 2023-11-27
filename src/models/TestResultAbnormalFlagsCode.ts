import CodingSystem from './CodingSystem'
import CodedValue from './CodedValue'

export default class TestAbnormalFlagsCode extends CodedValue {
  static readonly Detected = new TestAbnormalFlagsCode('A', 'Abnormal', CodingSystem.HL70078_251)
  static readonly NotDetected = new TestAbnormalFlagsCode('N', 'Normal', CodingSystem.HL70078_251)
}
