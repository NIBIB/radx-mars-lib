import MarsHubProvider from "../../src/interfaces/MarsHubProvider"
import HierarchicDesignator from "../../src/models/HierarchicDesignator"
import IsoHierarchicDesignator from "../../src/models/IsoHierarchicDesignator"

/**
 * Test hub provider as if we're implementing to AIMS.  Using these designators
 * to promote more thorough data and test validation.
 */
export default class TestHubProvider implements MarsHubProvider {
  get receivingApplicationIdentifier (): HierarchicDesignator {
    return new IsoHierarchicDesignator('AIMS.INTEGRATION.STG', '2.16.840.1.114222.4.3.15.2')
  }

  get receivingFacilityIdentifier (): HierarchicDesignator {
    return new IsoHierarchicDesignator('AIMS.PLATFORM', '2.16.840.1.114222.4.1.217446')
  }

  readonly isUsingProduction = false

  public async submitTest (hl7Message: any): Promise<boolean> {
    return true
  }
}