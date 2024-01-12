/* eslint-disable max-len */
/**
 * Identifies the lab.  Used when constructing the HL7 message and is made
 * available to the {LabResultSubmitter} class when submitting a lab test
 * result.
 */

import LabInfo from '../interfaces/LabInfo'
import type CliaHierarchicDesignator from './CliaHierarchicDesignator'
import type IsoHierarchicDesignator from './IsoHierarchicDesignator'

/**
 * Holds and encapsulates the info to identify a reporting lab to a RADx MARS
 * Hub.  The sending system and sending facility information is maintained by
 * APHL.  If you need to look up values for your registered laboratory, they
 * may be found at links on the NIH page located at
 * https://www.nibib.nih.gov/covid-19/radx-tech-program/mars/hl7v2-getting-started.
 */
export default class MarsLabInfo extends LabInfo {
  /**
   * Constructs a MarsLabInfo object.
   * @param sendingSystemIdentifier {IsoHierarchicDesignator} - The ISO
   * Hierarchic Designator (HD) representing the sending system -- typically the
   * application.
   * @param sendingFacilityIdentifier {CliaHierarchicDesignator} - The CLIA
   * Hierarchic Designator (HD) of the sending facility
   */
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor (
    sendingSystemIdentifier: IsoHierarchicDesignator,
    sendingFacilityIdentifier: CliaHierarchicDesignator) {
    super(sendingSystemIdentifier, sendingFacilityIdentifier)
  }
}
