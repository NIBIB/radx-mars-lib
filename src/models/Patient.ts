import type ExtendedAddress from './ExtendedAddress'
import type PatientEthnicity from './PatientEthnicity'
import type PatientName from './PatientName'
import type PatientRace from './PatientRace'
import type PatientSex from './PatientSex'
import type PatientContact from './PatientContact'

/**
 * Represents the subject of a test.  Corresponds to the PID segment in the HL7
 * message
 *
 * @param {string} id - The unique ID for the patient in your system.
 * @param {PatientName} name - The name of the patient
 * @param {ExtendedAddress} address - The address of the patient
 * @param {Date} birthDate - The birthdate of the patient.
 * @param {string} sex
 */

export default class Patient {
  // TODO: Test for birthdate of the patient
  // TODO: Test to ensure format of birthdate
  // TODO: Test to ensure format of address.
  // TODO: Test to ensure patient gender.
  // TODO: Test to make sure all values are required.
  private readonly _patientContacts: PatientContact[]

  constructor (
    public id: string,
    public age: number,
    public address: ExtendedAddress,
    public birthDate: Date | null,
    public name: PatientName | null,
    public sex: PatientSex | null,
    public race: PatientRace | null,
    public ethnicity: PatientEthnicity | null,
    patientContacts: PatientContact[] | null
  ) {
    // TODO: If age is empty, set it based on the DOB.
    this._patientContacts = patientContacts ?? []
  }

  public get patientContacts (): PatientContact[] {
    return this._patientContacts
  }

  public addContact (contactToAdd: PatientContact): void {
    this._patientContacts.push(contactToAdd)
  }
}

// TODO: Validations and tests:
// TODO: Test: Ensure PID3_1 < 100;
// TODO: Test: Ensure PID3_1 has a value;
// TODO: Test: Ensure PID3_4_2 has a value; 3_4_3 is hard-coded.
// eslint-disable-next-line max-len
// TODO: Test: Ensure PID5_1 is replaced with appropriate test string if blank.
// TODO: Ensure DOB PID7 is in approopraite format OR restrict to date.
// eslint-disable-next-line max-len
// TODO: Test: Ensure PID8 only accepts valid SEX codes from https://terminology.hl7.org/5.1.0/CodeSystem-v2-0001.html
// eslint-disable-next-line max-len
// TODO: Test: Ensure PID10_1 only accepts valid RACE codes from https://terminology.hl7.org/ValueSet-v2-0005.html
// eslint-disable-next-line max-len
// TODO: Test: Ensure PID10_2 returns appropriate race description from https://terminology.hl7.org/ValueSet-v2-0005.html based on 10_1 if valued.
// eslint-disable-next-line max-len
// TODO: Test: Ensure PID10_3 and 10_7 are populated ONLY if 10_1 is populated.
