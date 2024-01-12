/**
 * Identifies the lab.  Used when constructing the HL7 message and is made
 * available to the {LabResultSubmitter} class when submitting a lab test
 * result.
 */

import type HierarchicDesignator from '../models/HierarchicDesignator'

export default abstract class LabInfo {
  private readonly _sendingSystemIdentifier: HierarchicDesignator
  private readonly _sendingFacilityIdentifier: HierarchicDesignator

  // TODO: Test to ensure all id format matches the id type format.
  // Can move this into the ID type classes, presumably, as part of the
  // constructor validation.
  constructor (
    sendingSystemIdentifier: HierarchicDesignator,
    sendingFacilityIdentifier: HierarchicDesignator
  ) {
    this._sendingSystemIdentifier = sendingSystemIdentifier
    this._sendingFacilityIdentifier = sendingFacilityIdentifier
  }

  get sendingSystemIdentifier (): HierarchicDesignator {
    return this._sendingSystemIdentifier
  }

  get sendingFacilityIdentifier (): HierarchicDesignator {
    return this._sendingFacilityIdentifier
  }
}
