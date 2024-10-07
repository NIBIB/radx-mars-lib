import LabResultSubmitter from './domain/LabResultSubmitter'
import type MarsHubProvider from './interfaces/MarsHubProvider'
import type LabInfo from './models/MarsLabInfo'
import type TestInfo from './models/Test'

/**
 * Constructs a MARS client capable of submitting data to a hub.  The client
 * is configured once for the lab.  For each test type to be submitted, the
 * consumer will call createResultSubmitter and pass in a testInfo object of
 * type {LabTestInfo}.
 *
 * @param {MarsHubProvider} provider - a provider capable of submitting an HL7
 * message to a MARS supported hub.
 * @param {LabInfo} labInfo - identifers the lab sending the results to the MARS
 * hub.
 */
export default class MarsClient {
  private readonly provider: MarsHubProvider
  private readonly labInfo: LabInfo

  constructor (provider: MarsHubProvider, labInfo: LabInfo) {
    this.provider = provider
    this.labInfo = labInfo
  }

  /**
     * Creates a {LabResultSubmitter} capable of sending tests of type
     * identified in labTestInfo to the hub specified in the {MARSClient}
     * constructor.
     *
     * @param {TestInfo} labTestInfo - identifes the type of test the
     * submitted will handle.
     * @returns {LabResultSubmitter} A LabResultSubmitter capable of submitting
     * data about specific tests using the provider specified in the
     * MARSClient constructor.
     */
  createResultSubmitter (labTestInfo: TestInfo): LabResultSubmitter {
    return new LabResultSubmitter(this.provider, this.labInfo, labTestInfo)
  }
}
