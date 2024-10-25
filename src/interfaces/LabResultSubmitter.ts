import type TestResult from '../models/TestResult'
import type TestKit from '../models/TestKit'
import type Patient from '../models/Patient'
import type TestSubmissionResult from './TestSubmissionResult'

/**
 * The LabResultSubmitter class handles the construction of an HL7 message and
 * the delivery of results via the {@link submitResult} method to a RADx MARS
 * Hub that has implemented the {@link MarsHubProvider} interface.
 */
export default interface LabResultSubmitter {
  submitResult: (pii: Patient, testKit: TestKit, result: TestResult[]) => Promise<TestSubmissionResult>
}
