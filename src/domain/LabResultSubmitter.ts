import type MarsHubProvider from '../interfaces/MarsHubProvider'
import type LabInfo from '../models/MarsLabInfo'
import type Test from '../models/Test'
import type TestResult from '../models/TestResult'
import HL7MessageBuilder from '../utils/hl7/HL7MessageBuilder'
import type TestKit from '../models/TestKit'
import type Patient from '../models/Patient'

/**
 * The LabResultSubmitter class handles the construction of an HL7 message and
 * the delivery of results via the {@link submitResult} method to a RADx MARS
 * Hub that has implemented the {@link MarsHubProvider} interface.
 */
export default class LabResultSubmitter {
  provider: MarsHubProvider
  labInfo: LabInfo
  labTestInfo: Test

  /**
   * Constructs the {@link LabResultSubmitter} class
   * @param provider The {@link MarsHubProvider} to which
   * {@link TestResult} classes are submitted.
   * @param labInfo - The lab info defined as a {@link LabInfo} class.
   * @param labTestInfo Information about the type of test being taken as
   * defined in a {@link TestInfo} object.
   */
  constructor (
    provider: MarsHubProvider,
    labInfo: LabInfo,
    labTestInfo: Test
  ) {
    this.provider = provider
    this.labInfo = labInfo
    this.labTestInfo = labTestInfo
  }

  async submitResult (pii: Patient, testKit: TestKit, result: TestResult[]): Promise<boolean> {
    const hl7Builder = new HL7MessageBuilder(
      this.provider,
      this.labInfo,
      this.labTestInfo,
      testKit,
      pii,
      result)

    const hl7Message = hl7Builder.buildMessage()

    return await this.provider.submitTest(hl7Message)
  }
}
