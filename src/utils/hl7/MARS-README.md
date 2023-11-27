The following fields are sender specific fields.  You must request them, as
of 2023-09-01, from https://app.smartsheet.com/b/form/7bf44b3acefa4fd38a9ed6a18957a296
If you are sending tests on behalf of another lab, you may lookup the values
for the sender specific fields for that lab, as of 2023-09-01, from
https://aphlinformatics.atlassian.net/wiki/spaces/CRL/pages/1454899212/OID+Report+Look+Up

- Sending system OID 	MSH-3.2
- Sending facility name 	MSH-4.1
- Sending facility ID 	MSH-4.2
- Filler Order Number Assigner OID 	OBR-3.3
- Filler Order Number Assigner OID 	ORC-3.3
- Patient ID Assigner 	PID-3.4.2
- Specimen ID Assigner OID 	SPM-2.2.3

Test-specific fields help to uniquely identify the type of test that is taken
and are shown in the table below. A diagnostics company may manufacture 
different types of tests. Each type of test will have its own unique ID. 

- Test ordered code 	OBR-4.1
- Test ordered description 	OBR-4.2
- Test performed code 	OBX[1]-3.1
- Test performed description 	OBX[1]-3.2
- Device identifier 	OBX[1]-17.1
- Specimen type code 	SPM-4.1
- Specimen type description 	SPM-4.2

Test specific information can be looked up, as of 2023-09-01 from
https://app.powerbi.com/view?r=eyJrIjoiZWZjZDQyYjktNGFiMC00YWZkLTg2NTYtMjg2ODEyZWM1ZTViIiwidCI6IjQzNGUwYWVkLWVmODItNDU2OC1hMDQ5LTNiMTdhZGMwOGRkZCIsImMiOjF9&pageName=ReportSection3147535a75468ee60d16

Receiver specific fields for MSH 5.* and 6.* are defined as follows, as of
2023-09-01

| Receiving System | MSH 5.1 | MSH 5.2 | MSH 5.3 | MSH 6.1 | MSH 6.2 | MSH 6.3 | 
|---|---|---|---|---|---|---| 
| APHL AIMS Testing | AIMS.INTEGRATION.STG | 2.16.840.1.114222.4.3.15.2 | ISO | AIMS.PLATFORM | 2.16.840.1.114222.4.1.217446 | ISO |
| APHL AIMS Production | AIMS.INTEGRATION.PRD | 2.16.840.1.114222.4.3.15.1 | ISO | AIMS.PLATFORM | 2.16.840.1.114222.4.1.217446 | ISO |
| ReportStream | CDC PRIME | 2.16.840.1.114222.4.1.237821 | ISO | CDC PRIME | 2.16.840.1.114222.4.1.237821 | ISO |
