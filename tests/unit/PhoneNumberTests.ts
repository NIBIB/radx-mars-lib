import PatientPhoneContact from '../../src/models/PatientPhoneContact';

describe('Phone number object tests', () => {

  test('numbers serialize correctly', () => {
    expect(new PatientPhoneContact('555', '765.4321').asHl7String('^')).toEqual('^^PH^^^555^765.4321')
  })

  test('dashes to be replaced with dots', () => {
    expect(new PatientPhoneContact('555', '765-4321').asHl7String('^')).toEqual('^^PH^^^555^765.4321')
  })
})
  