import type ExtendedAddress from './ExtendedAddress'
import type PatientEthnicity from './PatientEthnicity'
import type PatientName from './PatientName'
import type PatientRace from './PatientRace'
import type PatientSex from './PatientSex'
import type PatientContact from './PatientContact'
import PatientPhoneContact from './PatientPhoneContact'
import { type NullableString } from './NullableString'
import { formatShortDate } from '../utils/DateUtils'
import type HierarchicDesignator from './HierarchicDesignator'

/**
 * Represents the subject of a test.  Corresponds predominately to the PID
 * segment in the HL7 message
 */

export default class Patient {
  private readonly _patientContacts: PatientContact[]
  private readonly _id: string
  private readonly _age: number
  private readonly _address: ExtendedAddress
  private readonly _birthDate: Date | null
  private readonly _name: PatientName | null
  private readonly _sex: PatientSex | null
  private readonly _race: PatientRace | null
  private readonly _ethnicity: PatientEthnicity | null

  public get patientContacts (): PatientContact[] { return this._patientContacts }
  public get id (): string { return this._id }
  public get age (): number { return this._age }
  public get address (): ExtendedAddress { return this._address }
  public get birthDate (): Date | null { return this._birthDate }
  public get name (): PatientName | null { return this._name }
  public get sex (): PatientSex | null { return this._sex }
  public get race (): PatientRace | null { return this._race }
  public get ethnicity (): PatientEthnicity | null { return this._ethnicity }

  /**
   * @param {string} id - The unique ID for the patient in your system.
   * @param {PatientName} name - The name as specified by the patient
   * @param {ExtendedAddress} address - The reported address of the patient
   * @param {Date|null} birthDate - The patient's reporeted birthdate.
   * @param {PatientSex|null} sex - The patent's reported sex.
   * @param {PatientRace|null} race - The patient's reported race
   * @param {PatientEthnicity|null} ethnicity - If reported, the patient's
   * ethnicity
   * @param {PatientContact[]|null} patientContacts - Means by which the
   * patient may be contacted.  See {@link PatientEmailContact} or
   * {@link PatientPhoneContact}
   */
  constructor (
    id: string,
    age: number | null,
    address: ExtendedAddress,
    birthDate: Date | null,
    name: PatientName | null,
    sex: PatientSex | null,
    race: PatientRace | null,
    ethnicity: PatientEthnicity | null,
    patientContacts: PatientContact[] | null
  ) {
    if (!id) {
      throw new Error('You must supply a non-empty ID')
    }

    if (id.length > 100) {
      throw new Error('You cannot have an ID of length greater than 100')
    }

    if (age == null && !birthDate) {
      throw new Error('You must supply the patient age or the patient birthdate')
    }

    this._id = id
    this._address = address
    this._birthDate = birthDate
    this._name = name
    this._sex = sex
    this._race = race
    this._ethnicity = ethnicity

    if (age != null && age > 0) {
      this._age = age
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const timeDiff = Math.abs(Date.now() - birthDate!.getTime())
      this._age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25)
    }

    this._patientContacts = patientContacts ?? []
  }

  public addContact (contactToAdd: PatientContact): void {
    this._patientContacts.push(contactToAdd)
  }

  public asHl7String (sendingSystem: HierarchicDesignator, separator: string = '|'): string {
    if (!sendingSystem.universalId) {
      throw new Error('There is no universal ID for sending system identifier for patient')
    }

    const Pid3: string = `${this._id}^^^&${sendingSystem.universalId}&ISO^PI`

    let Pid5PatientName: NullableString = null
    if (this._name == null ||
        this._name.lastName.trim().length === 0
    ) {
      Pid5PatientName = '~^^^^^^S'
    } else {
      Pid5PatientName = this._name.asHl7String()
    }

    let Pid7PatientDob: string
    if (this._birthDate != null) {
      Pid7PatientDob = formatShortDate(this._birthDate)
    } else {
      Pid7PatientDob = ''
    }

    const Pid8PatientSex: string = this._sex?.code ?? ''
    // Build PID10
    const Pid10PatientRace: string = this._race?.asHl7String() ?? ''

    let Pid13PatientContacts = ''
    if (this._patientContacts.length > 0) {
      Pid13PatientContacts = this._patientContacts.map(p => p.asHl7String('^')).join('~')
    } else {
      Pid13PatientContacts = PatientPhoneContact.NoPhoneContact.asHl7String('^')
    }

    const Pid22PatientEthnicity: string = this._ethnicity?.asHl7String() ?? ''
    const pidSegment = [
      'PID',
      '1',
      '',
      // Unique patient id less than 100 chars.
      Pid3,
      '',
      Pid5PatientName ?? '~^^^^^^S', // PID5_1 is ~^^^^^^S if blank.
      '', // PID6
      Pid7PatientDob, // Patient DOB in YYYYMMDD format.  Optional
      Pid8PatientSex, // Optional
      '',
      Pid10PatientRace,
      this._address?.asHl7String(),
      '',
      Pid13PatientContacts,
      '', // `14`,
      '', // `15`,
      '', // `16`,
      '', // `17`,
      '', // `18`,
      '', // `19`,
      '', // `20`,
      '', // `21`,
      Pid22PatientEthnicity
    ].join(separator)

    return pidSegment
  }
}
