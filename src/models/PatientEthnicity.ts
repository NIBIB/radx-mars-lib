/* eslint-disable max-len */
import CodingSystem from './CodingSystem'
import CodedValue from './CodedValue'

/**
 * Represents the patient ethnicity as a {@link CodedValue} object. The class
 * provides a set of known ethnicity codes as defined at
 * https://terminology.hl7.org/5.1.0/CodeSystem-v2-0189.html.  The NIH mandates
 * these codes be used as defined in the HL7 v2 fields implementation guide at
 * https://www.nibib.nih.gov/covid-19/radx-tech-program/mars/HL7v2-implementation-guide.
 */
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
