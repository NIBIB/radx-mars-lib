/**
 * Interface used by the framework to ensure the submission of tests is always
 * supported no matter the provider.
 */

import type HierarchicDesignator from '../models/HierarchicDesignator'
import { type HubSubmissionResult } from './HubSubmissionResult'
import type TestSubmissionResult from './TestSubmissionResult'

export default interface MarsHubProvider {
  get receivingApplicationIdentifier(): HierarchicDesignator
  get receivingFacilityIdentifier(): HierarchicDesignator
  get isUsingProduction(): boolean

  submitTest: (hl7Message: any) => Promise<TestSubmissionResult>
  retrieveSubmissionResult: (submissionId: string) => Promise<HubSubmissionResult>
  // Not all providers will support batch, so we need to extract this
  // information and see if it can be done as part of the ReportStream work, as
  // they do support batching.  Provider needs to raise this value.
  // submitBatch(): void;
}
