import type MarsHubProvider from '../../interfaces/MarsHubProvider'
import type LabInfo from '../../models/MarsLabInfo'
import type Test from '../../models/Test'
import type TestKit from '../../models/TestKit'
import type TestResult from '../../models/TestResult'
import type Patient from '../../models/Patient'
import { formatDate, formatShortDate } from '../DateUtils'
import PatientPhoneContact from '../../models/PatientPhoneContact'
import CodingSystem from '../../models/CodingSystem'
import { type NullableString } from '../../models/NullableString'
import type PatientContact from '../../models/PatientContact'
// eslint-disable-next-line max-len
// const OBR22_1_TESTRESULTDATERELEASED = 'OBR22_1 Test result date released {YYYYMMDDHHMMSS[+/-ZZZZ]}'
// eslint-disable-next-line max-len
// const OBX19_TESTANALYSISDATE = 'OBX19 Test Analysis date {YYYYMMDDHHMMSS[+/-ZZZZ]}, Date of mobile device interpretation'

/**
 * The {HL7MessageBuilder} class constructs an HL7 message from the provided
 * parameters in the constructor.  The message is returned as a string via the
 * {buildMessage} method.  This class is not for general HL7 message building.
 * It is built for the fields required by the RADx MARS hubs and is exception
 *
 * @param {MarsHubProvider} marsHubProvider - The provider for which the
 * message is being constructed
 * @param {LabInfo} labInfo - information about the submitting lab
 * @param {TestInfo} testInfo - information about the test
 * @param {TestKit} testKit - information about the test kit
 * @param {Patient} patient - information about the patient
 * @param {TestResult} testResult - information about the test result
 */

// TODO: Import the receiver information based on the MARS Hub, so
// we need to incorporate that somehow.
export default class HL7MessageBuilder {
  _hubProvider: MarsHubProvider
  _labInfo: LabInfo
  _test: Test
  _testKit: TestKit
  _patient: Patient
  _testResults: TestResult[]
  // batchIdentifier: string;

  constructor (
    hubProvider: MarsHubProvider,
    labInfo: LabInfo,
    test: Test,
    testKit: TestKit,
    labTestSubjects: Patient,
    labTestResults: TestResult[]
    // batchIdentifier: string
  ) {
    this._hubProvider = hubProvider
    this._labInfo = labInfo
    this._test = test
    this._patient = labTestSubjects
    this._testResults = labTestResults
    this._testKit = testKit
    // this.batchIdentifier = batchIdentifier;
  }

  buildMessage (): string {
    const mshSegment = this.buildMSHSegment()

    // TODO: Generate multiple result segments.
    // for (let i = 0; i < this.labTestResults.length; i++) {
    // const subject = this._patient
    // const result = this._labTestResults[0]
    const pidSegment = this.buildPIDSegment()
    const spmSegment = this.buildSPMSegment()
    const orcSegment = this.buildORCSegmentOTC()
    const obxSegments = this.buildOBXSegments()
    const sftSegment = this.buildSFTSegment()
    const obrSegment = this.buildOBRSegment()

    return [mshSegment, sftSegment, pidSegment, orcSegment, obrSegment, ...obxSegments, spmSegment].join('\n')
    // }

    // return message
  }

  private buildMSHSegment (): string {
    const dateAndTimeOfMessageString = formatDate(new Date())
    // eslint-disable-next-line max-len
    // 3.1 name of app.  Appears to be the .PROD or .TEST from the routing
    // information.  May be different for ReportStream.  Also used everywhere.
    // < 20 characters.
    // 3.2 is used EVERYWHERE.
    // TODO: Test we cannot have an app name >= 20 characters
    // TODO: Test we have the required configuration values at start.
    const mshSegment = [
      'MSH',
      '^~\\&',
      this._labInfo.sendingApplicationIdentifier.asHl7String(),
      this._labInfo.sendingFacilityIdentifier.asHl7String(),
      this._hubProvider.receivingApplicationIdentifier.asHl7String(),
      this._hubProvider.receivingFacilityIdentifier.asHl7String(),
      formatDate(new Date()), // .toISOString(),
      '',
      'ORU^R01^ORU_R01',
      `${dateAndTimeOfMessageString}_${this._testKit.id}`, // Batch identifier MSH10
      (this._hubProvider.isUsingProduction) ? 'P' : 'T', // P = Production, T = Test.  Can get from provider info.
      '2.5.1',
      '',
      '',
      'NE', // MSH15
      'NE', // MSH16
      '',
      '',
      '',
      '',
      'PHLabReport-NoAck^ELR251R1_Rcvr_Prof^2.16.840.1.113883.9.11^ISO' // MSH21
    ].join('|')

    return mshSegment
  }

  private buildSFTSegment (): string {
    const SFT1 = 'Meadows Design, LLC'
    const SFT2 = '1.0.0'
    const SFT3 = 'RADx MARS Hub API'
    const SFT4 = '1.0.0'
    const SFT6 = ''
    return [
      'SFT',
      `${SFT1}`,
      `${SFT2}`,
      `${SFT3}`,
      `${SFT4}`,
      '',
      `${SFT6}`
    ].join('|')
  }

  private buildPIDSegment (): string {
    // TODO: Test: 22 PID segments
    // Build PID5
    let Pid5PatientName: NullableString = null
    if (this._patient.name == null ||
      this._patient.name.lastName.trim().length === 0
    ) {
      Pid5PatientName = '~^^^^^^S'
    } else {
      Pid5PatientName = this._patient.name.asHl7String()
    }

    let Pid7PatientDob: string
    if (this._patient.birthDate != null) {
      Pid7PatientDob = formatShortDate(this._patient.birthDate)
    } else {
      Pid7PatientDob = ''
    }

    const Pid8PatientSex: string = this._patient.sex?.code ?? ''
    // Build PID10
    const Pid10PatientRace: string = this._patient.race?.asHl7String() ?? ''

    let Pid13PatientContacts = ''
    if (this._patient.patientContacts.length > 0) {
      Pid13PatientContacts = this._patient.patientContacts.map(p => p.asHl7String('^')).join('~')
    } else {
      Pid13PatientContacts = PatientPhoneContact.NoPhoneContact.asHl7String('^')
    }

    const Pid22PatientEthnicity: string = this._patient.ethnicity?.asHl7String() ?? ''
    const pidSegment = [
      'PID',
      '1',
      '',
      // Unique patient id less than 100 chars.
      `${this._patient.id}^^^&${this._labInfo.sendingApplicationIdentifier.universalId}&ISO^PI`,
      '',
      Pid5PatientName ?? '~^^^^^^S', // PID5_1 is ~^^^^^^S if blank.
      '', // PID6
      Pid7PatientDob, // Patient DOB in YYYYMMDD format.  Optional
      Pid8PatientSex, // Optional
      '',
      Pid10PatientRace,
      this._patient.address?.asHl7String(),
      '',
      Pid13PatientContacts,
      '', // `14`,
      '', // `15`,
      '', // `16`,
      '', // `17`,
      '', // `18`,
      '', // `19`,
      '', // `20`,
      '', // `21`,
      Pid22PatientEthnicity
    ].join('|')

    return pidSegment
  }

  // ...
  private buildSPMSegment (): string {
    const spmSegment = [
      'SPM',
      '1',
      `^${this._testKit.id}&&${this._labInfo.sendingApplicationIdentifier.universalId}&ISO`,
      '',
      this._test.specimenCollectionType.asHl7String(),
      '', // 5
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '', // `14`,
      '', // `15`,
      '', // `16`,
      // TODO: Are these the same things?  Format these dates.
      formatDate(this._testKit.collectedDate),
      formatDate(this._testKit.receivedDate)
      // `${SPM17_1_SPECIMENCOLLECTEDDATE}`,
      // `${SPM18_1_SPECIMENRECEIVEDDATE}`// `18`,
    ].join('|')

    return spmSegment
  }

  private buildORCSegmentOTC (): string {
    const phoneContact: PatientContact =
      this._patient.patientContacts.find(p => p.code === 'PH') ?? PatientPhoneContact.NoPhoneContact
    const orcSegment = [
      'ORC',
      'RE',
      '',
      `${this._testKit.id}^^${this._labInfo.sendingApplicationIdentifier.universalId}^ISO`,
      '',
      '', // 5
      '',
      '',
      '',
      '',
      '',
      '',
      `^^${this._test.performingOrganization.name}`, // 12
      '',
      '', // `14`,
      '', // `15`,
      '', // `16`,
      '', // `17`,
      '', // `18`,
      '', // `19`,
      '', // `20`,
      this._test.performingOrganization.name, // `${ORC12_3_OTCPROVIDERNAME}`,//`21`,
      (this._patient.address ?? this._labInfo.address).asHl7String('^'),
      // eslint-disable-next-line max-len
      // `${PID11_1_OPT_STREET1}^${PID11_2_OPT_STREET2}^${PID11_3_OPT_CITY}^${PID11_4_OPT_STATE}^${PID11_5_OPT_ZIP}^^^^${PID11_9_OPT_COUNTY}`, // `22`,
      phoneContact.asHl7String('^'),
      // eslint-disable-next-line max-len
      // `^^^^^${PID13_6_OPT_PHONEAREA ?? '111'}^${PID13_7_OPT_PHONELOCAL ?? '1111111'}`, // `23`,
      ''// `24`,
    ].join('|')

    return orcSegment
  }

  private buildOBRSegment (): string {
    const obrSegment = [
      'OBR',
      '1',
      '',
      `${this._testKit.id}^^${this._labInfo.sendingApplicationIdentifier.universalId}^ISO`,
      this._test.asHl7String(), // `${this._test.testId}^${this._test.testName}^LN^^^^${OBR4_7_LOINCVERSION}`,
      '', // 5
      '',
      formatDate(this._testKit.collectedDate),
      // `${SPM17_1_SPECIMENCOLLECTEDDATE}`,
      '',
      '',
      '',
      '',
      '', // 12
      '',
      '', // `14`,
      '', // `15`,
      `^^${this._test.performingOrganization.name}`, // 16
      // eslint-disable-next-line max-len
      // `NPI^ORDERINGPROVIDERLASTNAME^OBR16_3_TESTSPECIFICFIRSTNAME^^^^^^&2.16.840.1.113883.4.6&ISO^^^^^TESTRESULTDATE`,// 16 for prescription,
      '', // `17`,
      '', // `18`,
      '', // `19`,
      '', // `20`,
      '', // `21`,
      formatDate(this._testResults[0].determinationDate),
      // `${OBR22_1_TESTRESULTDATERELEASED}`, // `22`,
      '',
      '',
      'F' // 25
    ].join('|')

    return obrSegment
  }

  private buildOBXSegments (): string[] {
    const resultSegments: string[] = []
    // For result in results.
    const obxSegment = [
      'OBX',
      '1',
      'CWE',
      // OBX is NOT the same as OBR.  So fix this.
      // eslint-disable-next-line max-len
      // `${OBR4_1_TESTORDEREDCODE}^${OBR4_2_TESTORDEREDDESC}^LN^^^^${OBR4_7_LOINCVERSION}`,
      this._testResults[0].asHl7String(),
      '',
      this._testResults[0].testResultCode.asHl7String('^'),
      // eslint-disable-next-line max-len
      // `${OBX5_1_TESTRESULTCODE}^${OBX5_2_TESTRESULTDESC}^${CodingSystem.SCT_20210301.asHl7String()}`, // 5
      '',
      '',
      this._testResults[0].testResultAbnormalFlagsCode.asHl7String('^'),
      // eslint-disable-next-line max-len
      // `${OBX8_1_TESTRESULTABNORMALFLAGCODE}^${OBX8_2_TESTRESULTABNORMALFLAGDESC}^${CodingSystem.HL70078_251.asHl7String()}`, // 8
      '',
      '', // 10
      'F',
      '',
      '',
      '', // `14`,
      this._test.performingOrganization.id, // `${OBX15_1_PRODUCERID}`,//`15`,
      '', // `16`,
      `${this._testResults[0].deviceIdentifier}^^${CodingSystem.N99ELR_VUNKNOWN.asHl7String('^')}`,
      // `${OBX17_1_DEVICEIDENTIFIER}^^99ELR^Vunknown`, // `17`,
      '', // `18`,
      formatDate(this._testResults[0].determinationDate),
      // `${OBX19_TESTANALYSISDATE}`, // `19`,
      '', // `20`,
      '', // `21`,
      '', // `22`,
      // eslint-disable-next-line max-len
      `${this._test.performingOrganization.name}^^^^^&2.16.840.1.113883.3.8589.4.1.152&ISO^XX^^^${this._test.performingOrganization.id}`,
      this._test.performingOrganization.address, // `${OBX24_PERFORMORGADDRESS}`,
      '' // 25
    ].join('|')

    // TODO: For multi-plex tests, do the other results -- COVID first, mind
    // you. But we still need multiplex results for the OBX pieces.  How to do
    // this?
    resultSegments.push(obxSegment)

    const obxAgeSegment = [
      'OBX',
      `${resultSegments.length + 1}`,
      'NM',
      `35659-2^Age at specimen collection^${CodingSystem.LOINC_271.asHl7String()}`,
      '',
      this._patient.age,
      'a^year^UCUM^^^^2.1', // 6
      '',
      '',
      '',
      '', // 10
      'F',
      '',
      '',
      '', // `14`,
      this._test.performingOrganization.id, // `${OBX15_1_PRODUCERID}`,//`15`,
      '', // `16`,
      '', // `17`,
      '', // `18`,
      '', // `19`,
      '', // `20`,
      '', // `21`,
      '', // `22`,
      // eslint-disable-next-line max-len
      `${this._test.performingOrganization.name}^^^^^&2.16.840.1.113883.3.8589.4.1.152&ISO^XX^^^${this._test.performingOrganization.id}`,
      this._test.performingOrganization.address, // `${OBX24_PERFORMORGADDRESS}`,
      '', // 25
      '', // 26
      '', // 27
      '', // 28
      'QST' // 29
    ].join('|')

    resultSegments.push(obxAgeSegment)

    // TODO: Get from the test meta if the patient was symptomatic or not.
    // We ONLY add the next segments if they report whether or not they're
    // symptomatic.  If they are, then it's yes, no.  We won't report this if
    // it's unknown.  I mean, we could, but...  We could also flag it -- and
    // maybe we will -- as the patient is symptomatic, asymptomatic, or unknown
    // and do some sort of enum check.
    const didPatientReportSymptomatic = false
    if (!didPatientReportSymptomatic) {
      // TODO: What if they're not but answer -- is that valuable? Assume yes.
      return resultSegments
    }

    const isPatientSymptomatic = false

    // eslint-disable-next-line @typescript-eslint/naming-convention
    let obx3_5_symptomatic = `N^no^${CodingSystem.HL70078_251.asHl7String()}`
    if (isPatientSymptomatic) {
      obx3_5_symptomatic = `Y^Yes^${CodingSystem.HL70078_251.asHl7String()}`
    }
    const obxSymptomaticSegment = [
      'OBX',
      `${resultSegments.length + 1}`,
      'CWE',
      // eslint-disable-next-line max-len
      `95419-8^Whether the patient has symptoms related to condition of interest^${CodingSystem.LOINC_271.asHl7String()}`,
      '',
      `${obx3_5_symptomatic}`,
      '', // 6
      '',
      '',
      '',
      '', // 10
      'F',
      '',
      '',
      '', // `14`,
      this._test.performingOrganization.id, // `${OBX15_1_PRODUCERID}`,//`15`,
      '', // `16`,
      '', // `17`,
      '', // `18`,
      '', // `19`,
      '', // `20`,
      '', // `21`,
      '', // `22`,
      // eslint-disable-next-line max-len
      `${this._test.performingOrganization.name}^^^^^&2.16.840.1.113883.3.8589.4.1.152&ISO^XX^^^${this._test.performingOrganization.id}`,
      this._test.performingOrganization.address, // `${OBX24_PERFORMORGADDRESS}`,
      '', // 25
      '', // 26
      '', // 27
      '', // 28
      'QST' // 29
    ].join('|')

    resultSegments.push(obxSymptomaticSegment)

    const symptomOnsetDate: Date | null = null
    if (!isPatientSymptomatic || symptomOnsetDate == null) {
      return resultSegments
    }

    const obxSystemOnsetDateStr: string = formatShortDate(symptomOnsetDate)
    const obxSymptomOnsetSegment = [
      'OBX',
      `${resultSegments.length + 1}`,
      'DT',
      `65222-2^Date and time of symptom onset^${CodingSystem.LOINC_271.asHl7String()}`,
      '',
      obxSystemOnsetDateStr,
      '', // 6
      '',
      '',
      '',
      '', // 10
      'F',
      '',
      '',
      '', // `14`,
      this._test.performingOrganization.id, // `${OBX15_1_PRODUCERID}`,//`15`,
      '', // `16`,
      '', // `17`,
      '', // `18`,
      '', // `19`,
      '', // `20`,
      '', // `21`,
      '', // `22`,
      // eslint-disable-next-line max-len
      `${this._test.performingOrganization.name}^^^^^&2.16.840.1.113883.3.8589.4.1.152&ISO^XX^^^${this._test.performingOrganization.id}`,
      this._test.performingOrganization.address, // `${OBX24_PERFORMORGADDRESS}`,
      '', // 25
      '', // 26
      '', // 27
      '', // 28
      'QST' // 29
    ].join('|')

    resultSegments.push(obxSymptomOnsetSegment)

    return resultSegments
  }
}

// TODO: Should validate required fields
// TODO: Include SPM segment
