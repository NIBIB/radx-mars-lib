import CodingSystem from '../../src/models/CodingSystem';
import PatientEthnicity from '../../src/models/PatientEthnicity';
import PatientRace from '../../src/models/PatientRace';

/** 
 **/
describe('Coded Value', () => {

  test('ethniticty uses correct coding', () => {
    expect(PatientEthnicity.HispanicOrLatino.codingSystem).toEqual(CodingSystem.HL70189_251)
  })

  it('serializes ethnicity to appropriate HL7 string', () => {
    expect(PatientEthnicity.HispanicOrLatino.asHl7String()).toEqual('H^Hispanic or Latino^HL70189^^^^2.5.1')
  })

  test('Patient race uses correct coding', () => {
    expect(PatientRace.NativeHawaiianOrOtherPacificIslander.codingSystem).toEqual(CodingSystem.HL70005_251)
  })

  it('serializes race to appropriate HL7 string', () => {
    expect(PatientRace.BlackOrAfricanAmerican.asHl7String()).toEqual('2054-5^Black or African American^HL70005^^^^2.5.1')
  })
})