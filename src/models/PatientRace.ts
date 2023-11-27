import CodingSystem from './CodingSystem'
import CodedValue from './CodedValue'

export default class PatientRace extends CodedValue {
  constructor (
    code: string,
    description: string,
    codingSystem: CodingSystem = CodingSystem.HL720005_300
  ) {
    super(code, description, codingSystem)
  }

  static readonly AmericanIndianOrAlaskaNative: PatientRace =
    new PatientRace(
      '1002-5',
      'American Indian or Alaska Native',
      CodingSystem.HL720005_300
    )

  static readonly Asian: PatientRace =
    new PatientRace(
      '2028-9',
      'Asian',
      CodingSystem.HL720005_300
    )

  static readonly BlackOrAfricanAmerican: PatientRace =
    new PatientRace(
      '2054-5',
      'Black or African American',
      CodingSystem.HL720005_300
    )

  static readonly NativeHawaiianOrOtherPacificIslander: PatientRace =
    new PatientRace(
      '2076-8',
      'Native Hawaiian or Other Pacific Islander',
      CodingSystem.HL720005_300
    )

  static readonly White: PatientRace =
    new PatientRace(
      '2106-3',
      'White',
      CodingSystem.HL720005_300
    )

  static readonly OtherRace: PatientRace = new PatientRace(
    '2131-1',
    'Other Race',
    CodingSystem.HL720005_300
  )
}
