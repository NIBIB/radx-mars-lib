import { PatientSymptomatic, PatientSymptomaticDeclaration } from '../../src/models/PatientSymptomatic'
/** 
 **/
describe('PatientSymptomatic object value tests', () => {
  it('Throws an exception when an onset date is provided and the patient is not symptomatic', () => {
    expect(() => new PatientSymptomatic(PatientSymptomaticDeclaration.NotSymptomatic, new Date())).toThrow()
  })
  it('Throws an exception when an onset date is provided and the patient symptom state is unknown', () => {
    expect(() => new PatientSymptomatic(PatientSymptomaticDeclaration.Unknown, new Date())).toThrow()
  })
  it('Throws an exception for dates in the future', () => {
    expect(() => new PatientSymptomatic(PatientSymptomaticDeclaration.Symptomatic, new Date(Date.now() + 10000))).toThrow()
  })
  it('Accepts a date in the past for symptomatic', () => {
    expect(() => new PatientSymptomatic(PatientSymptomaticDeclaration.Symptomatic, new Date(Date.now() - 10000))).not.toThrow()
  })
  it('Accepts reporting symptoms with no onset date', () => {
    expect(() => new PatientSymptomatic(PatientSymptomaticDeclaration.Symptomatic, null)).not.toThrow()
  })
});
