import {
  HubSubmissionResultStatus,
  HubSubmissionResult
} from "../../src/interfaces/HubSubmissionResult"
import MarsHubProvider from "../../src/interfaces/MarsHubProvider"
import TestSubmissionResult from "../../src/interfaces/TestSubmissionResult"
import HierarchicDesignator from "../../src/models/HierarchicDesignator"
import IsoHierarchicDesignator from "../../src/models/IsoHierarchicDesignator"

class TestTestSubmissionResult implements TestSubmissionResult {
  get successful(): boolean {
    return true
  }
  get retryable(): boolean 
  {
    return false
  }
  get id(): (string|null) {
    return 'id'
  }
  get warnings(): string[] {
    return []
  }
  get errors(): string[] {
    return []
  }

}


class TestHubSubmissionResult implements HubSubmissionResult {
  get status(): HubSubmissionResultStatus {
    return HubSubmissionResultStatus.notFound
  }

  get successful(): boolean {
    return true
  }
  get submissionId(): string | null {
    return 'id'
  }
  get warnings(): string[] {
    return []
  }
  get errors(): string[] {
    return []
  }
}

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

  public async submitTest (hl7Message: any): Promise<TestSubmissionResult> {
    return new TestTestSubmissionResult()
  }

  public async retrieveSubmissionResult (submissionId: string): Promise<HubSubmissionResult> {
    return new TestHubSubmissionResult()
  }
}