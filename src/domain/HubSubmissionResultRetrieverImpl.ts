import { type MarsHubProvider, type HubSubmissionResult } from '../interfaces'
import type HubSubmissionResultRetriever from '../interfaces/HubSubmissionResultRetriever'

/**
 * The LabResultSubmitter class handles the construction of an HL7 message and
 * the delivery of results via the {@link submitResult} method to a RADx MARS
 * Hub that has implemented the {@link MarsHubProvider} interface.
 */
export default class HubSubmissionResultRetrieverImpl implements HubSubmissionResultRetriever {
  private readonly provider: MarsHubProvider

  /**
   * Constructs the {@link LabResultSubmitter} class
   * @param provider The {@link MarsHubProvider} to which
   */
  constructor (
    provider: MarsHubProvider
  ) {
    this.provider = provider
  }

  public async retrieveSubmissionResult (submissionId: string): Promise<HubSubmissionResult> {
    return await this.provider.retrieveSubmissionResult(submissionId)
  }
}
