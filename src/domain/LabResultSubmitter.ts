import type MarsHubProvider from '../interfaces/MarsHubProvider'
import type LabInfo from '../models/MarsLabInfo'
import type TestInfo from '../models/Test'
import type TestResult from '../models/TestResult'
import HL7MessageBuilder from '../utils/hl7/HL7MessageBuilder'
import type TestKit from '../models/TestKit'
import type Patient from '../models/Patient'

export default class LabResultSubmitter {
  provider: MarsHubProvider
  labInfo: LabInfo
  labTestInfo: TestInfo

  constructor (
    provider: MarsHubProvider,
    labInfo: LabInfo,
    labTestInfo: TestInfo
  ) {
    this.provider = provider
    this.labInfo = labInfo
    this.labTestInfo = labTestInfo
  }

  async submitResult (pii: Patient, testKit: TestKit, result: TestResult): Promise<boolean> {
    const hl7Builder = new HL7MessageBuilder(
      this.provider,
      this.labInfo,
      this.labTestInfo,
      testKit, // new TestKit('', new Date(), new Date()),
      pii,
      [result])

    const hl7Message = hl7Builder.buildMessage()

    return await this.provider.submitTest(hl7Message)
  }
}
