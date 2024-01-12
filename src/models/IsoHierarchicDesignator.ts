/* eslint-disable max-len */
import HierarchicDesignator from './HierarchicDesignator'

/**
 * Represents an ISO Hierarchic Designator (HD).  This class is used by the MARS
 * library to represent the sending system of an HL7 message but can be used
 * anywhere a ISO Hierarchic Designator is needed.
 * Known sending systems are maintained by APHL and can be found at
 * https://aphlinformatics.atlassian.net/wiki/spaces/CRL/pages/1454899212/OID+Report+Look+Up
 */
export default class IsoHierarchicDesignator extends HierarchicDesignator {
  constructor (namespace: string, universalId: string) {
    /**
     * Constructs a ISO hierarchic designator with a namespace and universal ID.
     * @param namespace - The namespace for the hierarchicic designator.
     * @param universalId - The universal id of the designator.
     */
    super(namespace, universalId, 'ISO')
  }
}
