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

  constructor (namespace: string, universalId: string, universalIdType: string) {
    // Check for null/empty strings if strictNullChecks is not enabled.
    if (!namespace || !universalId || !universalIdType) {
      throw new Error('All parameters to the Hierarchic Designator must be non-empty strings')
    }

    if (!this.validateUniversalIdType(universalIdType)) {
      throw new Error(`Unexpected id type: ${universalIdType}`)
    }

    if (!this.validateUniversalId(universalId, universalIdType)) {
      throw new Error(`The universal ID ${universalId} is not a valid ${universalIdType} ID`)
    }

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

  private validateUniversalIdType (universalIdType: string): boolean {
    // Check if namespace is in the list of valid namespaces
    const validIdTypes = ['ISO', 'HL7', 'OID', 'UUID', 'DNS', 'CLIA']
    return validIdTypes.includes(universalIdType.toUpperCase())
  }

  private validateUniversalId (universalId: string, universalIdType: string): boolean {
    // Namespace-specific validation logic

    switch (universalIdType.toUpperCase()) {
      case 'OID':
        // Validate OID format - dot-separated numerical values
        return /^(\d+)(\.(\d+))*$/.test(universalId)
      case 'UUID':
        // Validate UUID format
        return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(universalId)
      case 'DNS':
        // Validate DNS format - basic DNS validation
        return /^[a-zA-Z0-9.-]+$/.test(universalId)
      case 'ISO':
        return /^(\d+)(\.(\d+))*$/.test(universalId)
      case 'CLIA':
        return /^\d{2}[A-Za-z]\d{7}$/.test(universalId)
      case 'HL7':
        // Placeholder - implement rules for other namespaces if applicable
        return true // Assume valid for simplicity
      default:
        // Unsupported namespace
        return false
    }
  }
}
