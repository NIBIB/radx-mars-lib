import CodingSystem from './CodingSystem'
import CodedValue from './CodedValue'

/**
 * The PatientRace class represents a {@link CodedValue} encapsulating coded
 * race information as defined at
 * https://terminology.hl7.org/ValueSet-v2-0005.html.
 */
export default class PatientRace extends CodedValue {
  /**
   * Constructs a new PatientRace object.  Should not be needed often, if at all
   * as the values currently identified and described at
   * https://terminology.hl7.org/ValueSet-v2-0005.html are represented as static
   * objects of the PatientRace class itself.
   * @param code code representing the race
   * @param description description of the value identified with the {code}
   * parameter.
   * @param codingSystem the system in which the race is to be encoded.
   */
  private constructor (
    code: string,
    description: string,
    codingSystem: CodingSystem = CodingSystem.HL720005_300
  ) {
    super(code, description, codingSystem)
  }

  static readonly AmericanIndianOrAlaskaNative: PatientRace =
    new PatientRace(
      '1002-5',
      'American Indian or Alaska Native'
    )

  static readonly Asian: PatientRace =
    new PatientRace(
      '2028-9',
      'Asian'
    )

  static readonly BlackOrAfricanAmerican: PatientRace =
    new PatientRace(
      '2054-5',
      'Black or African American'
    )

  static readonly NativeHawaiianOrOtherPacificIslander: PatientRace =
    new PatientRace(
      '2076-8',
      'Native Hawaiian or Other Pacific Islander'
    )

  static readonly White: PatientRace =
    new PatientRace(
      '2106-3',
      'White'
    )

  static readonly OtherRace: PatientRace = new PatientRace(
    '2131-1',
    'Other Race'
  )
}
