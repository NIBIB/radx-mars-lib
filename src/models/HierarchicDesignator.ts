/**
 * This class encapsulates the fields of a Hierachic Designatore (HD)
 * identifier.  The HD identifier is used in multiple portions of an
 * HL7 message and consists of a namespace, id, and id type.
 *
 * With regard to the HL7 messages being sent to a MARS hub, you will
 * most commonly see the HD identifier associated with the sender and
 * receiver application and facility as identified in the MSH segment
 * of the ELR 2.5.1 message.
 *
 * @param {string} namespace - The namespace of the identifier.
 * @param {string} universalId - The globally unique id portion of the
 * identifier
 * @param {string} universalIdType - the type of id represented in the
 * {namespace} and {universalId} parameters.  Typically ISO or CLIA.
 */
export default abstract class HierarchicDesignator {
  private readonly _namespace: string
  private readonly _universalId: string
  private readonly _universalIdType: string

  // TODO: Test to ensure the hub provider and lab info are provided.
  // TODO: Test to ensure the values are actually those types.
  constructor (namespace: string, universalId: string, universalIdType: string) {
    this._namespace = namespace
    this._universalId = universalId
    this._universalIdType = universalIdType
  }

  public get namespace (): string {
    return this._namespace
  }

  public get universalId (): string {
    return this._universalId
  }

  public get universalIdType (): string {
    return this._universalIdType
  }

  public asHl7String (separator: string = '^'): string {
    return [this._namespace, this._universalId, this._universalIdType].join(separator)
  }
}
