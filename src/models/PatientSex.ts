import CodingSystem from './CodingSystem'
import CodedValue from './CodedValue'

export default class PatientSex extends CodedValue {
  static readonly Female: PatientSex = new PatientSex(
    'F',
    'Female',
    new CodingSystem('Hl7VSAdministrativeSex', 'V20001')
  )

  static readonly Male: PatientSex = new PatientSex(
    'M',
    'Male',
    new CodingSystem('Hl7VSAdministrativeSex', 'V20001')
  )

  static readonly Other: PatientSex = new PatientSex(
    'O',
    'Other',
    new CodingSystem('Hl7VSAdministrativeSex', 'V20001')
  )

  static readonly Unknown: PatientSex = new PatientSex(
    'U',
    'Unknown',
    new CodingSystem('Hl7VSAdministrativeSex', 'V20001')
  )

  static readonly Ambiguous: PatientSex = new PatientSex(
    'A',
    'Ambiguous',
    new CodingSystem('Hl7VSAdministrativeSex', 'V20001')
  )

  static readonly NotApplicable: PatientSex = new PatientSex(
    'N',
    'Not applicable',
    new CodingSystem('Hl7VSAdministrativeSex', 'V20001')
  )

  static readonly NonBinary: PatientSex = new PatientSex(
    'X',
    'Non-Binary',
    new CodingSystem('Hl7VSAdministrativeSex', 'V20001')
  )
}
