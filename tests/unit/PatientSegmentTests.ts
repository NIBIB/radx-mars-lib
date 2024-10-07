import CliaHierarchicDesignator from '../../src/models/CliaHierarchicDesignator';
import IsoHierarchicDesignator from '../../src/models/IsoHierarchicDesignator';
import Patient from '../../src/models/Patient';
import ExtendedAddress from '../../src/models/ExtendedAddress';
/** 
 **/
describe('Patient and Patient Segments', () => {

  const patientAge: number = 28

  const clia = new CliaHierarchicDesignator('someNamespace', '00Z0000002')
  const iso = new IsoHierarchicDesignator('someNamespace', '2.16.840.1.113883.3.8589.4.1.22')
  // const patientSegment = patient.asHl7String(iso, '|')

  it('calculates age correctly from date of birth though you should do this yourself', () => {
    let date = new Date()
    date.setFullYear(date.getFullYear() - 50);
    date.setMonth(date.getMonth() - 11)
    date.setDate(date.getDate() - 29)
    const patient = new Patient(
      'YOUR_PATIENT_ID',
      null,
      ExtendedAddress.MinExtendedAddress('00000'),
      date,
      null,
      null,
      null,
      null,
      null
    )
  
    expect(patient.age).toEqual(50)
  })

  it('should throw if no age or birthdate supplied', 
    () => { 
      expect(() => new Patient(
        'id',
        null,
        ExtendedAddress.MinExtendedAddress('00000'),
        null,
        null,
        null,
        null,
        null,
        null)
      ).toThrow()
    }
  )

  it('should use age if both are supplied', () => {
    const patient = new Patient(
      'id',
      12,
      ExtendedAddress.MinExtendedAddress('00000'),
      new Date(),
      null,
      null,
      null,
      null,
      null)
      expect(patient.age).toEqual(12)
    }
  )

  it('should substitute a known string for patient name if not provided', () => {
    const patient = new Patient(
      'id',
      12,
      ExtendedAddress.MinExtendedAddress('00000'),
      new Date(),
      null,
      null,
      null,
      null,
      null)

    expect(patient.asHl7String(iso)).toContain('~^^^^^^S')
  })

  it('should not allow an ID greater than 101 characters in length', () => {
    expect(() => {
    const patient = new Patient(
      '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901',
      12,
      ExtendedAddress.MinExtendedAddress('00000'),
      new Date(),
      null,
      null,
      null,
      null,
      null)
  }).toThrow()
  })

  it('should not allow an empty ID', () => {
    expect(() => {
    const patient = new Patient(
      '',
      12,
      ExtendedAddress.MinExtendedAddress('00000'),
      new Date(),
      null,
      null,
      null,
      null,
      null)
  }).toThrow()
  })
});
