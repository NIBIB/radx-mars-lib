import CodingSystem from './CodingSystem'
import CodedValue from './CodedValue'

/**
 * The PatientSex class represents a {@link CodedValue} encapsulating coded
 * sex information as defined at
 * https://terminology.hl7.org/5.1.0/CodeSystem-v2-0001.html.
 * This class defines no constructor.
 */
export default class PatientSex extends CodedValue {
  private constructor (
    code: string,
    description: string,
    codingSystem: CodingSystem = new CodingSystem('Hl7VSAdministrativeSex', 'V20001')
  ) {
    super(code, description, codingSystem)
  }

  static readonly Female: PatientSex = new PatientSex(
    'F',
    'Female'
  )

  static readonly Male: PatientSex = new PatientSex(
    'M',
    'Male'
  )

  static readonly Other: PatientSex = new PatientSex(
    'O',
    'Other'
  )

  static readonly Unknown: PatientSex = new PatientSex(
    'U',
    'Unknown'
  )

  static readonly Ambiguous: PatientSex = new PatientSex(
    'A',
    'Ambiguous'
  )

  static readonly NotApplicable: PatientSex = new PatientSex(
    'N',
    'Not applicable'
  )

  static readonly NonBinary: PatientSex = new PatientSex(
    'X',
    'Non-Binary'
  )
}
