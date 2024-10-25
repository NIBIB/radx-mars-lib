import { type HubSubmissionResult } from '../interfaces'

/**
 * The LabResultSubmitter class handles the construction of an HL7 message and
 * the delivery of results via the {@link submitResult} method to a RADx MARS
 * Hub that has implemented the {@link MarsHubProvider} interface.
 */
export default interface HubSubmissionResultRetriever {
  retrieveSubmissionResult: (submissionId: string) => Promise<HubSubmissionResult>
}
