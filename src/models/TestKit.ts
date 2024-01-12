/**
 * The TestKit class represents the TestKit a {@link Patient} uses to collect
 * a specimen and run a {@link Test}.  There will be an instance of this class
 * created for every {@link TestResult} reported to the RADx MARS-compliant
 * hub.
 */
export default class TestKit {
  private readonly _id: string
  private readonly _collectedDate: Date
  private readonly _receivedDate: Date

  constructor (id: string, collectedDate: Date, receivedDate: Date | null = null) {
    this._id = id
    this._collectedDate = collectedDate
    this._receivedDate = receivedDate ?? collectedDate
  }

  public get id (): string {
    return this._id
  }

  public get collectedDate (): Date {
    return this._collectedDate
  }

  public get receivedDate (): Date {
    return this._receivedDate
  }
}
