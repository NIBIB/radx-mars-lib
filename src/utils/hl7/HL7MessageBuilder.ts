import type MarsHubProvider from '../../interfaces/MarsHubProvider'
import type MarsLabInfo from '../../models/MarsLabInfo'
import type Test from '../../models/Test'
import type TestKit from '../../models/TestKit'
import type TestResult from '../../models/TestResult'
import type Patient from '../../models/Patient'
import { formatDate, formatShortDate } from '../DateUtils'
import PatientPhoneContact from '../../models/PatientPhoneContact'
import CodingSystem from '../../models/CodingSystem'
import { type NullableString } from '../../models/NullableString'
import type PatientContact from '../../models/PatientContact'

/**
 * The {HL7MessageBuilder} class constructs an HL7 message from the provided
 * parameters in the constructor.  The message is returned as a string via the
 * {buildMessage} method.  This class is not for general HL7 message building.
 * It is built for the fields required by the RADx MARS hubs and is exception
 *
 * @param {MarsHubProvider} marsHubProvider - The provider for which the
 * message is being constructed
 * @param {MarsLabInfo} marsLabInfo - information about the submitting lab
 * @param {Test} test - information about the test
 * @param {TestKit} testKit - information about the test kit
 * @param {Patient} patient - information about the patient
 * @param {TestResult[]} s - information about the test result.  For
 * multiplex tests you must provide the COVID test result first.
 */

export default class HL7MessageBuilder {
  _hubProvider: MarsHubProvider
  _marsLabInfo: MarsLabInfo
  _test: Test
  _testKit: TestKit
  _patient: Patient
  _testResults: TestResult[]

  constructor (
    hubProvider: MarsHubProvider,
    marsLabInfo: MarsLabInfo,
    test: Test,
    testKit: TestKit,
    patient: Patient,
    testResults: TestResult[]
  ) {
    this._hubProvider = hubProvider
    this._marsLabInfo = marsLabInfo
    this._test = test
    this._patient = patient
    this._testResults = testResults
    this._testKit = testKit
  }

  buildMessage (): string {
    const mshSegment = this.buildMshSegment()

    const pidSegment = this._patient.asHl7String(this._marsLabInfo.sendingSystemIdentifier, '|')
    const spmSegment = this.buildSpmSegment()
    const orcSegment = this.buildOrcSegmentOtc()
    const obxSegments = this.buildObxSegments()
    const sftSegment = this.buildSftSegment()
    const obrSegment = this.buildObrSegment()

    return [
      mshSegment,
      sftSegment,
      pidSegment,
      orcSegment,
      obrSegment,
      ...obxSegments,
      spmSegment
    ].join('\n')
  }

  private buildMshSegment (): string {
    const dateAndTimeOfMessageString = formatDate(new Date())
    const mshSegment = [
      'MSH',
      '^~\\&',
      this._marsLabInfo.sendingSystemIdentifier.asHl7String(),
      this._marsLabInfo.sendingFacilityIdentifier.asHl7String(),
      this._hubProvider.receivingApplicationIdentifier.asHl7String(),
      this._hubProvider.receivingFacilityIdentifier.asHl7String(),
      formatDate(new Date()), // .toISOString(),
      '',
      'ORU^R01^ORU_R01',
      `${dateAndTimeOfMessageString}_${this._testKit.id}`,
      (this._hubProvider.isUsingProduction) ? 'P' : 'T',
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

  private buildSftSegment (): string {
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

  private buildPidSegment (): string {
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
      `${this._patient.id}^^^&${this._marsLabInfo.sendingSystemIdentifier.universalId}&ISO^PI`,
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
  private buildSpmSegment (): string {
    const spmSegment = [
      'SPM',
      '1',
      `^${this._testKit.id}&&${this._marsLabInfo.sendingSystemIdentifier.universalId}&ISO`,
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
      formatDate(this._testKit.collectedDate),
      formatDate(this._testKit.receivedDate)
    ].join('|')

    return spmSegment
  }

  /**
   * Builds the ORC segment of an HL7 2.5.1 ELR message for an OTC submission.
   * @returns a string representing the ORC segment
   */
  private buildOrcSegmentOtc (): string {
    const phoneContact: PatientContact =
      this._patient.patientContacts.find(p => p.code === 'PH') ?? PatientPhoneContact.NoPhoneContact
    const orcSegment = [
      'ORC',
      'RE',
      '',
      `${this._testKit.id}^^${this._marsLabInfo.sendingSystemIdentifier.universalId}^ISO`,
      '',
      '', // 5
      '',
      '',
      '',
      '',
      '',
      '',
      `^^${this._test.performingOrganization.type}`, // 12
      '',
      '', // `14`,
      '', // `15`,
      '', // `16`,
      '', // `17`,
      '', // `18`,
      '', // `19`,
      '', // `20`,
      this._test.performingOrganization.type,
      this._patient.address.asHl7String(),
      phoneContact.asHl7String('^'),
      ''// `24`,
    ].join('|')

    return orcSegment
  }

  private buildObrSegment (): string {
    const obrSegment = [
      'OBR',
      '1',
      '',
      `${this._testKit.id}^^${this._marsLabInfo.sendingSystemIdentifier.universalId}^ISO`,
      this._test.asHl7String(),
      '', // 5
      '',
      formatDate(this._testKit.collectedDate),
      '',
      '',
      '',
      '',
      '', // 12
      '',
      '', // `14`,
      '', // `15`,
      `^^${this._test.performingOrganization.type}`, // 16
      '', // `17`,
      '', // `18`,
      '', // `19`,
      '', // `20`,
      '', // `21`,
      formatDate(this._testResults[0].determinationDate),
      '',
      '',
      'F' // 25
    ].join('|')

    return obrSegment
  }

  private buildObxSegments (): string[] {
    const resultSegments: string[] = []
    // For result in results.

    for (let i = 0; i < this._testResults.length; i++) {
      const obxSegment = [
        'OBX',
        (i + 1).toString(),
        'CWE',
        this._testResults[0].asHl7String(),
        '',
        this._testResults[0].testResultCode.asHl7String('^'),
        '',
        '',
        this._testResults[0].testResultAbnormalFlagsCode.asHl7String('^'),
        '',
        '', // 10
        'F',
        '',
        '',
        '', // `14`,
        this._test.performingOrganization.id,
        '', // `16`,
        `${this._testResults[0].deviceIdentifier}^^${CodingSystem.N99ELR_VUNKNOWN.asHl7String('^')}`,
        '', // `18`,
        formatDate(this._testResults[0].determinationDate),
        '', // `20`,
        '', // `21`,
        '', // `22`,
        // eslint-disable-next-line max-len
        `${this._test.performingOrganization.type}^^^^^&2.16.840.1.113883.3.8589.4.1.152&ISO^XX^^^${this._test.performingOrganization.id}`,
        this._test.performingOrganization.address,
        '' // 25
      ].join('|')

      resultSegments.push(obxSegment)

      const nteSegment = [
        'NTE',
        (i + 1).toString(),
        'L',
        this._testResults[0].deviceIdentifier
      ].join('|')

      resultSegments.push(nteSegment)
    }
    const obxAgeSegment = [
      'OBX',
      `${this._testResults.length + 1}`,
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
      this._test.performingOrganization.id,
      '', // `16`,
      '', // `17`,
      '', // `18`,
      '', // `19`,
      '', // `20`,
      '', // `21`,
      '', // `22`,
      // eslint-disable-next-line max-len
      `${this._test.performingOrganization.type}^^^^^&2.16.840.1.113883.3.8589.4.1.152&ISO^XX^^^${this._test.performingOrganization.id}`,
      this._test.performingOrganization.address,
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
      `${this._testResults.length + 1}`,
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
      this._test.performingOrganization.id,
      '', // `16`,
      '', // `17`,
      '', // `18`,
      '', // `19`,
      '', // `20`,
      '', // `21`,
      '', // `22`,
      // eslint-disable-next-line max-len
      `${this._test.performingOrganization.type}^^^^^&2.16.840.1.113883.3.8589.4.1.152&ISO^XX^^^${this._test.performingOrganization.id}`,
      this._test.performingOrganization.address,
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
      `${this._testResults.length + 1}`,
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
      this._test.performingOrganization.id,
      '', // `16`,
      '', // `17`,
      '', // `18`,
      '', // `19`,
      '', // `20`,
      '', // `21`,
      '', // `22`,
      // eslint-disable-next-line max-len
      `${this._test.performingOrganization.type}^^^^^&2.16.840.1.113883.3.8589.4.1.152&ISO^XX^^^${this._test.performingOrganization.id}`,
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
