/**
 * Identifies the lab.  Used when constructing the HL7 message and is made
 * available to the {LabResultSubmitter} class when submitting a lab test
 * result.
 */

import type HierarchicDesignator from '../models/HierarchicDesignator'
import type RequiredAddress from '../models/RequiredAddress'

export default abstract class LabInfo {
  private readonly _sendingApplicationIdentifier: HierarchicDesignator
  private readonly _sendingFacilityIdentifier: HierarchicDesignator
  private readonly _address: RequiredAddress

  // TODO: Test to ensure all id format matches the id type format.
  // Can move this into the ID type classes, presumably, as part of the
  // constructor validation.
  constructor (
    sendingApplicationIdentifier: HierarchicDesignator,
    sendingFacilityIdentifier: HierarchicDesignator,
    address: RequiredAddress
  ) {
    this._sendingApplicationIdentifier = sendingApplicationIdentifier
    this._sendingFacilityIdentifier = sendingFacilityIdentifier
    this._address = address
  }

  get sendingApplicationIdentifier (): HierarchicDesignator {
    return this._sendingApplicationIdentifier
  }

  get sendingFacilityIdentifier (): HierarchicDesignator {
    return this._sendingFacilityIdentifier
  }

  get address (): RequiredAddress {
    return this._address
  }
}
