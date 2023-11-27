import CodingSystem from './CodingSystem'
import CodedValue from './CodedValue'

export default class PatientEthnicity extends CodedValue {
  constructor (
    code: string,
    description: string,
    codeSystem: CodingSystem = CodingSystem.HL720189_210
  ) {
    super(code, description, codeSystem)
  }

  static readonly HispanicOrLatino: PatientEthnicity = new PatientEthnicity(
    'H',
    'Hispanic or Latino',
    CodingSystem.HL720189_210
  )

  static readonly NotHispanicOrLatino: PatientEthnicity = new PatientEthnicity(
    'N',
    'Not Hispanic or Latino',
    CodingSystem.HL720189_210
  )

  static readonly Unknown: PatientEthnicity = new PatientEthnicity(
    'U',
    'Unknown',
    CodingSystem.HL720189_210
  )
}
