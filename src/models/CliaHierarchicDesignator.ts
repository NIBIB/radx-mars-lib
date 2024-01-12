/* eslint-disable max-len */
import HierarchicDesignator from './HierarchicDesignator'

/**
 * Represents a CLIA Hierarchic Designator (HD).  This class is used by the MARS
 * library to represent the sending facility of an HL7 message but can be used
 * anywhere a CLIA Hierarchic Designator is needed.
 * Known sending facilities are maintained by APHL and can be found at
 * https://aphlinformatics.atlassian.net/wiki/spaces/CRL/pages/1454899212/OID+Report+Look+Up
 */
export default class CliaHierarchicDesignator extends HierarchicDesignator {
  /**
   * Constructs a CLIA hierarchic designator with a namespace and universal ID.
   * @param namespace - The namespace for the hierarchicic designator.
   * @param universalId - The universal id of the designator.
   */
  constructor (namespace: string, universalId: string) {
    super(namespace, universalId, 'CLIA')
  }
}
