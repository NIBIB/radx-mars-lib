/**
 * Identifies the lab.  Used when constructing the HL7 message and is made
 * available to the {LabResultSubmitter} class when submitting a lab test
 * result.
 */

import LabInfo from '../interfaces/LabInfo'
import type CliaHierarchicDesignator from './CliaHierarchicDesignator'
import type IsoHierarchicDesignator from './IsoHierarchicDesignator'
import type RequiredAddress from './RequiredAddress'

export default class MarsLabInfo extends LabInfo {
  // TODO: Test to ensure all id format matches the id type format.
  // This constructor is NOT useless.  It enforces the types of
  // HierarchicDesignator in the MarsLabInfo class.

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor (
    sendingApplicationIdentifier: IsoHierarchicDesignator,
    sendingFacilityIdentifier: CliaHierarchicDesignator,
    sendingAddress: RequiredAddress) {
    super(sendingApplicationIdentifier, sendingFacilityIdentifier, sendingAddress)
  }
}
