import CliaHierarchicDesignator from '../../src/models/CliaHierarchicDesignator';
import CodingSystem from '../../src/models/CodingSystem';
import ExtendedAddress from '../../src/models/ExtendedAddress';
import IsoHierarchicDesignator from '../../src/models/IsoHierarchicDesignator';
import MarsLabInfo from '../../src/models/MarsLabInfo';
import Patient from '../../src/models/Patient';
import PatientEthnicity from '../../src/models/PatientEthnicity';
import PatientEmailContact from '../../src/models/PatientEmailContact';
import PatientName from '../../src/models/PatientName';
import PatientPhoneContact from '../../src/models/PatientPhoneContact';
import PatientRace from '../../src/models/PatientRace';
import PatientSex from '../../src/models/PatientSex';
import PerformingOrganization from '../../src/models/PerformingOrganization';
import SpecimenCollectionType from '../../src/models/SpecimenCollectionType';
import Test from '../../src/models/Test';
import TestKit from '../../src/models/TestKit';
import TestResult from '../../src/models/TestResult';
import TestResultAbnormalFlagsCode from '../../src/models/TestResultAbnormalFlagsCode';
import TestResultCode from '../../src/models/TestResultCode';
import HL7MessageBuilder from '../../src/utils/hl7/HL7MessageBuilder';
import TestHubProvider from './TestHubProvider'

/** 
 * test the buildMessage function of the HL7MessageBuilder 
 * class, checking that the segments are correctly generated 
 * based on the input data.
 **/
describe('Message Structure', () => {

    it('should include symptomatic information', () => {
        expect(true).toEqual(true);
    })

    describe('should build correct non-symptomatic HL7 message', () => {
        const labInfo = new MarsLabInfo(
            new IsoHierarchicDesignator(
                'AbbottInformatics',
                '2.16.840.1.113883.3.8589.4.1.22'
            ),
            new CliaHierarchicDesignator(
                'AbbottInformatics',
                '00Z0000002'
            ));
        const patientTest = new Test('94558-4',
            'SARS-CoV-2 (COVID-19) Ag [Presence] in Respiratory specimen by Rapid immunoassay',
            PerformingOrganization.OtcProctor,
            SpecimenCollectionType.AnteriorNaresSwab,
            CodingSystem.LOINC_271);

        const patientAge: number = 28
        const patient = new Patient(
            'YOUR_PATIENT_ID',
            patientAge,
            new ExtendedAddress('00000', '1 Main Street', 'Sheriff\'s office', 'Mayberry', 'NC', 'RFD'),
            null,
            new PatientName('Griffith', 'Andrew', 'Sheriff'),
            PatientSex.Male,
            PatientRace.White,
            PatientEthnicity.NotHispanicOrLatino,
            [new PatientEmailContact('andy@mayberrypd.gov'), new PatientPhoneContact('555', '123.4567'), new PatientPhoneContact('555', '765-4321')]
        )
        const testKit = new TestKit('Your Test Kit ID', new Date(), new Date())

        const positiveTestResult = new TestResult(
            '94558-4',
            'SARS-CoV-2 (COVID-19) Ag [Presence] in Respiratory specimen by Rapid immunoassay',
            '10811877011337_DIT',
            new Date(),
            new TestResultCode('260373001', 'Detected'),
            TestResultAbnormalFlagsCode.Detected,
            CodingSystem.LOINC_271)

        const builder: HL7MessageBuilder = new HL7MessageBuilder(
            new TestHubProvider(), labInfo, patientTest, testKit, patient, [positiveTestResult])
        const message: string = builder.buildMessage();

        const segments: string[] = message.split('\n');

        const hl7MshRegex = /MSH\|\^~\\&\|AbbottInformatics\^2\.16\.840\.1\.113883\.3\.8589\.4\.1\.22\^ISO\|AbbottInformatics\^00Z0000002\^CLIA\|AIMS\.INTEGRATION\.STG\^2\.16\.840\.1\.114222\.4\.3\.15\.2\^ISO\|AIMS\.PLATFORM\^2\.16\.840\.1\.114222\.4\.1\.217446\^ISO\|\d{14}-\d{4}\|\|ORU\^R01\^ORU_R01\|\d{14}-\d{4}_Your Test Kit ID\|T\|2\.5\.1\|\|\|NE\|NE\|\|\|\|\|PHLabReport-NoAck\^ELR251R1_Rcvr_Prof\^2\.16\.840\.1\.113883\.9\.11\^ISO/;
        test('Segments pass muster', () => {
            expect(segments[0]).toMatch(hl7MshRegex);


            expect(segments[2]).toBe(`PID|1||YOUR_PATIENT_ID^^^&2.16.840.1.113883.3.8589.4.1.22&ISO^PI||Griffith^Andrew^Sheriff|||M||2106-3^White^HL70005^^^^2.5.1|1 Main Street^Sheriff's office^Mayberry^NC^00000^^^^RFD||^^Internet^andy@mayberrypd.gov^^^~^^PH^^^555^123.4567~^^PH^^^555^765.4321|||||||||N^Not Hispanic or Latino^HL70189^^^^2.5.1`);
            expect(segments[3]).toBe(`ORC|RE||Your Test Kit ID^^2.16.840.1.113883.3.8589.4.1.22^ISO|||||||||^^SA.Proctor|||||||||SA.Proctor|1 Main Street^Sheriff's office^Mayberry^NC^00000^^^^RFD|^^PH^^^555^123.4567|`);
            expect(segments[4]).toMatch(/^OBR|1||Your Test Kit ID^^2.16.840.1.113883.3.8589.4.1.22^ISO|94558-4^SARS-CoV-2 (COVID-19) Ag [Presence] in Respiratory specimen by Rapid immunoassay^LN^^^^2.71|||{\d(14)}-\d{4}|||||||||^^SA.Proctor||||||{\d(14)}-\d{4}|||F/);
            expect(segments[5]).toMatch(/^OBX|1|CWE|94558-4^SARS-CoV-2 (COVID-19) Ag [Presence] in Respiratory specimen by Rapid immunoassay^LN^^^^2.71||260373001^Detected^SCT^^^^20210301|||A^Abnormal^HL70078^^^^2.5.1|||F||||00Z0000016||10811877011337_DIT^^99ELR^^^^Vunknown||20240827191813-0000||||SA.Proctor^^^^^&2.16.840.1.113883.3.8589.4.1.152&ISO^XX^^^00Z0000016|13 Fake AtHome Test Street^^Fake City|/);
            expect(segments[6]).toBe('NTE|1|L|10811877011337_DIT');
            expect(segments[7]).toBe('OBX|2|NM|35659-2^Age at specimen collection^LN^^^^2.71||28|a^year^UCUM^^^^2.1|||||F||||00Z0000016||||||||SA.Proctor^^^^^&2.16.840.1.113883.3.8589.4.1.152&ISO^XX^^^00Z0000016|13 Fake AtHome Test Street^^Fake City|||||QST');
            expect(segments[8]).toMatch(/^SPM|1|^Your Test Kit ID&&2.16.840.1.113883.3.8589.4.1.22&ISO||697989009^Anterior nares swab (specimen)^SCT^^^^20210301|||||||||||||||{\d(14)}-0000|{\d(14)}-0000$/);
        });

    });

    describe('should build correct minimal HL7 message', () => {
        const labInfo = new MarsLabInfo(
            new IsoHierarchicDesignator(
                'AbbottInformatics',
                '2.16.840.1.113883.3.8589.4.1.22'
            ),
            new CliaHierarchicDesignator(
                'AbbottInformatics',
                '00Z0000002'
            ));
        const patientTest = new Test('94558-4',
            'SARS-CoV-2 (COVID-19) Ag [Presence] in Respiratory specimen by Rapid immunoassay',
            PerformingOrganization.OtcProctor,
            SpecimenCollectionType.AnteriorNaresSwab,
            CodingSystem.LOINC_271);

        const patientAge: number = 28
        const patient = new Patient(
            'YOUR_PATIENT_ID',
            patientAge,
            ExtendedAddress.MinExtendedAddress('00000'),
            null,
            null,
            null,
            null,
            null,
            null
        )
        const testKit = new TestKit('Your Test Kit ID', new Date(), new Date())

        const positiveTestResult = new TestResult(
            '94558-4',
            'SARS-CoV-2 (COVID-19) Ag [Presence] in Respiratory specimen by Rapid immunoassay',
            '10811877011337_DIT',
            new Date(),
            new TestResultCode('260373001', 'Detected'),
            TestResultAbnormalFlagsCode.Detected,
            CodingSystem.LOINC_271)

        const builder: HL7MessageBuilder = new HL7MessageBuilder(
            new TestHubProvider(), labInfo, patientTest, testKit, patient, [positiveTestResult])
        const message: string = builder.buildMessage();

        const segments: string[] = message.split('\n');

        const hl7MshRegex = /MSH\|\^~\\&\|AbbottInformatics\^2\.16\.840\.1\.113883\.3\.8589\.4\.1\.22\^ISO\|AbbottInformatics\^00Z0000002\^CLIA\|AIMS\.INTEGRATION\.STG\^2\.16\.840\.1\.114222\.4\.3\.15\.2\^ISO\|AIMS\.PLATFORM\^2\.16\.840\.1\.114222\.4\.1\.217446\^ISO\|\d{14}-\d{4}\|\|ORU\^R01\^ORU_R01\|\d{14}-\d{4}_Your Test Kit ID\|T\|2\.5\.1\|\|\|NE\|NE\|\|\|\|\|PHLabReport-NoAck\^ELR251R1_Rcvr_Prof\^2\.16\.840\.1\.113883\.9\.11\^ISO/;

        describe('Tests for MSH segment', () => {
            it ('MSH segment should be properly serialized', () => {
                expect(segments[0]).toMatch(hl7MshRegex);
            })
        })

        describe ('Checking Patient segment', () => {
            it('contains minimal address', () => {
                expect(segments[2]).toContain('^^^^00000^^^^')
            })

            it ('contains default no-phone values', () => {
                expect(segments[2]).toContain('^^PH^^^111^1111111')
            })

            it ('has everything in the right place', () => {
                expect(segments[2]).toBe(`PID|1||YOUR_PATIENT_ID^^^&2.16.840.1.113883.3.8589.4.1.22&ISO^PI||~^^^^^^S||||||^^^^00000^^^^||^^PH^^^111^1111111|||||||||`);
            })
        });

        describe ('Checking ORC segment', () => {
            it('contains minimal address', () => {
                expect(segments[2]).toContain('^^^^00000^^^^')
            })

            it ('contains default no-phone values', () => {
                expect(segments[2]).toContain('^^PH^^^111^1111111')
            })

            it ('has everything in the right spot', () => {
                expect(segments[3]).toBe(`ORC|RE||Your Test Kit ID^^2.16.840.1.113883.3.8589.4.1.22^ISO|||||||||^^SA.Proctor|||||||||SA.Proctor|^^^^00000^^^^|^^PH^^^111^1111111|`);
            })
        })

        test('everything else', () => {
            expect(segments[4]).toMatch(/^OBR|1||Your Test Kit ID^^2.16.840.1.113883.3.8589.4.1.22^ISO|94558-4^SARS-CoV-2 (COVID-19) Ag [Presence] in Respiratory specimen by Rapid immunoassay^LN^^^^2.71|||{\d(14)}-0000|||||||||^^SA.Proctor||||||{\d(14)}-0000|||F/);
            expect(segments[5]).toMatch(/^OBX|1|CWE|94558-4^SARS-CoV-2 (COVID-19) Ag [Presence] in Respiratory specimen by Rapid immunoassay^LN^^^^2.71||260373001^Detected^SCT^^^^20210301|||A^Abnormal^HL70078^^^^2.5.1|||F||||00Z0000016||10811877011337_DIT^^99ELR^^^^Vunknown||20240827191813-0000||||SA.Proctor^^^^^&2.16.840.1.113883.3.8589.4.1.152&ISO^XX^^^00Z0000016|13 Fake AtHome Test Street^^Fake City|/);
            expect(segments[6]).toBe('NTE|1|L|10811877011337_DIT');
            expect(segments[7]).toBe('OBX|2|NM|35659-2^Age at specimen collection^LN^^^^2.71||28|a^year^UCUM^^^^2.1|||||F||||00Z0000016||||||||SA.Proctor^^^^^&2.16.840.1.113883.3.8589.4.1.152&ISO^XX^^^00Z0000016|13 Fake AtHome Test Street^^Fake City|||||QST');
            expect(segments[8]).toMatch(/^SPM|1|^Your Test Kit ID&&2.16.840.1.113883.3.8589.4.1.22&ISO||697989009^Anterior nares swab (specimen)^SCT^^^^20210301|||||||||||||||{\d(14)}-0000|{\d(14)}-0000$/);
        });
    });

});
