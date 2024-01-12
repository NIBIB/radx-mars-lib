import type PatientContact from './PatientContact'

/**
 * Encapslates a patient's email contact information.
 */
export default class PatientEmailContact implements PatientContact {
  // static regexp: RegExp =
  // eslint-disable-next-line max-len
  //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  private readonly _email: string

  /**
   * Constructs a PatientEmailContact encapsulating a patient's email contact
   * information.
   * @param email the patient's email address.
   */
  constructor (
    email: string
  ) {
    this._email = email
  }

  public readonly code = 'Internet'

  public get email (): string {
    return this._email
  }

  public asHl7String (separator: string = '^'): string {
    return [
      '',
      '',
      this.code,
      this._email,
      '',
      '',
      ''
    ].join(separator)
  }
}
