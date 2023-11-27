/* eslint-disable no-tabs */
/* eslint-disable max-len */
// The following fields are sender specific fields.  You must request them, as
// of 2023-09-01, from https://app.smartsheet.com/b/form/7bf44b3acefa4fd38a9ed6a18957a296
// If you are sending tests on behalf of another lab, you may lookup the values
// for the sender specific fields for that lab, as of 2023-09-01, from
// https://aphlinformatics.atlassian.net/wiki/spaces/CRL/pages/1454899212/OID+Report+Look+Up
//
// Sending system OID 	MSH-3.2
// Sending facility name 	MSH-4.1
// Sending facility ID 	MSH-4.2
// Filler Order Number Assigner OID 	OBR-3.3
// Filler Order Number Assigner OID 	ORC-3.3
// Patient ID Assigner 	PID-3.4.2
// Specimen ID Assigner OID 	SPM-2.2.3
//
// Test-specific fields help to uniquely identify the type of test that is taken
// and are shown in the table below. A diagnostics company may manufacture
// different types of tests. Each type of test will have its own unique ID.
//
// Test ordered code 	OBR-4.1
// Test ordered description 	OBR-4.2
// Test performed code 	OBX[1]-3.1
// Test performed description 	OBX[1]-3.2
// Device identifier 	OBX[1]-17.1
// Specimen type code 	SPM-4.1
// Specimen type description 	SPM-4.2
//
// Test specific information can be looked up, as of 2023-09-01 from
// https://app.powerbi.com/view?r=eyJrIjoiZWZjZDQyYjktNGFiMC00YWZkLTg2NTYtMjg2ODEyZWM1ZTViIiwidCI6IjQzNGUwYWVkLWVmODItNDU2OC1hMDQ5LTNiMTdhZGMwOGRkZCIsImMiOjF9&pageName=ReportSection3147535a75468ee60d16
//
// Receiver specific fields for MSH 5.* and 6.* are defined as follows, as of
// 2023-09-01
//
// | Receiving System | MSH 5.1 | MSH 5.2 | MSH 5.3 | MSH 6.1 | MSH 6.2 | MSH 6.3 |
// | APHL AIMS Testing | AIMS.INTEGRATION.STG | 2.16.840.1.114222.4.3.15.2 | ISO | AIMS.PLATFORM | 2.16.840.1.114222.4.1.217446 | ISO |
// | APHL AIMS Production | AIMS.INTEGRATION.PRD | 2.16.840.1.114222.4.3.15.1 | ISO | AIMS.PLATFORM | 2.16.840.1.114222.4.1.217446 | ISO |
// | ReportStream | CDC PRIME | 2.16.840.1.114222.4.1.237821 | ISO | CDC PRIME | 2.16.840.1.114222.4.1.237821 | ISO |

// const MSH3_1 = 'MSH3_1 $AppConfig SendingSystemNamespace: name of App, <20 char';
// const MSH3_2 = 'MSH3_2 $AppConfig SendingSystemOID: See \'Obtaining App Specific Identifiers\'';
// const MSH4_1 = 'MSH4_1 $AppConfig SendingFacilityName: See \'Obtaining App Specific Identifiers\'';
// const MSH4_2 = 'MSH4_2 $AppConfig SendingFacilityID: See \'Obtaining App Specific Identifiers\'';
// // TODO: Add these fields to provider.
// const MSH5_1 = 'MSH5_1 $AppConfig -- FROM PROVIDER: Receiving system namespace: See \'Receiving System Specific Fields\'';
// const MSH5_2 = 'MSH5_2 $AppConfig -- FROM PROVIDER: Receiving system OID: See \'Receiving System Specific Fields\'';
// const MSH6_1 = 'MSH6_1 $AppConfig Receiving facility name: See \'Receiving System Specific Fields\'';
// const MSH6_2 = 'MSH6_2 $AppConfig Receiving facility ID: See \'Receiving System Specific Fields\'';

// const PID3_1 = 'PID3_1 Patient ID'
// const PID5_1_OPT_LASTNAME = 'PID5_1 Patient last name'
// const PID5_2_OPT_FIRSTNAME = 'PID5_2 Patient first name'
// const PID5_3_OPT_MIDDLE = 'PID5_3 Patient middle name'
// const PID7_OPT_DOB = 'PID7 Patient DOB'
// const PID8_OPT_SEX = 'PID8 Patient sex' // See https://terminology.hl7.org/5.1.0/CodeSystem-v2-0001.html for values.
// const PID10_1_OPT_RACECODE = 'PID10_1 Patient race code'
// const PID10_2_COND_RACEDESC = 'PID10_2 Patient race description'
// const PID11_1_OPT_STREET1 = 'PID11_1 Patient street address'
// const PID11_2_OPT_STREET2 = 'PID11_2 Patient street address 2'
// const PID11_3_OPT_CITY = 'PID11_3 Patient city'
// const PID11_4_OPT_STATE = 'PID11_4 Patient stat'
// const PID11_5_OPT_ZIP = 'PID11_5 Patient zip code'
// const PID11_9_OPT_COUNTY = 'PID11_9 Patient County'
// const PID13_4_OPT_EMAIL = 'PID13_4 Patient email'
// const PID13_6_OPT_PHONEAREA = 'PID13_6 Patient phone area code'
// const PID13_7_OPT_PHONELOCAL = 'PID13_7 Patient local phone'
// const PID22_1_OPT_ETHNICITY_CODE = 'PID22_1 Patient ethnicity code'
// const PID22_2_OPT_ETHNICITY_DESC = 'PID22_2 Patient ethnicity description'

// const SPM2_2_1_SPECIMENID = 'SMP2_2_1 Test Kit ID';
// const SPM4_1_SPECIMENTYPECODE = 'SPM4_1 Specimen Type Code from HL7v2 Fields Tool';
// const SPM4_2_SPECIMENTYPEDESC = 'SPM4_2 Specimen Type Description from HL7v2 Fields Tool';
// const SPM17_1_SPECIMENCOLLECTEDDATE = 'SPM17_1 Specimen Collected Date {YYYYMMDDHHMMSS[+/-ZZZZ]}'
// const SPM18_1_SPECIMENRECEIVEDDATE = 'SPM18_1 Specimen Received Date {YYYYMMDDHHMMSS[+/-ZZZZ]}'

// const ORC12_3_OTCPROVIDERNAME = 'ORC12_3 Ordering provider first name for OTC Tests';

// const OBR4_1_TESTORDEREDCODE = 'OBR4_1 Test ordered code from Test Specific HL7v2 Fields Tool';
// const OBR4_2_TESTORDEREDDESC = 'OBR4_2 Test ordered description from Test Specific HL7v2 Fields Tool';
// const OBR4_7_LOINCVERSION = 'OBR4_7 TODO: CONFIG: Most common version currently 2.71';
// const OBR22_1_TESTRESULTDATERELEASED = 'OBR22_1 Test result date released {YYYYMMDDHHMMSS[+/-ZZZZ]}'

// const OBX5_1_TESTRESULTCODE = 'OBX5_1 Test Result Code from Test Specific HL7v2 Fields Tool'
// const OBX5_2_TESTRESULTDESC = 'OBX5_2 Test Result Desc from Test Specific HL7v2 Fields Tool'
// const OBX5_7_TESTRESULTCODESYSTEMVER = 'OBX5_7 Constant from config, currently 20210301';
// const OBX8_1_TESTRESULTABNORMALFLAGCODE = 'OBX8_1 "A" for detected results, "N" for not detected and invalid results'
// const OBX8_2_TESTRESULTABNORMALFLAGDESC = 'OBX8_2 "Abnormal" for detected results, "Normal" for not detected and invalid results'
// const OBX15_1_PRODUCERID = 'OBX15_1 Test ordered description from Test Specific HL7v2 Fields Tool';
// const OBX17_1_DEVICEIDENTIFIER = 'OBX17_1 Device Identifier from Test Specific HL7v2 Fields Tool'
// const OBX19_TESTANALYSISDATE = 'OBX19 Test Analysis date {YYYYMMDDHHMMSS[+/-ZZZZ]}, Date of mobile device interpretation'

// const OBX24_PERFORMORGADDRESS = 'OBX24_1 and OBR24_3 Performing Org STREET from Test Specific HL7v2 Fields Tool';

// const OBX5_PATIENTAGE_2 = 'OBX[2]5 SET OBXPlusOne PATIENT AGE: Pull from patient.'

// const HL7_VER = '2.5.1'
