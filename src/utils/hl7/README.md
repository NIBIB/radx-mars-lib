# About HL7 

## Before You Begin

It is important to read the entirety of this document.  Skipping portions of it
may result in an unnecessary implementation burden on you or your team.  It is
important to note that the definition of required may not mean it is required
for you but, rather, required in the context of a complete messaging solution as
you will see illustrated below. The use of certain segments can be 
context-dependent. 

For example, the PV1 segment (segments are defined in the following content) is 
commonly used in patient administration messages but may not be required in all 
lab reporting scenarios. In the context of voluntary at-home testing, there 
wouldn't be an associated order from a healthcare provider, which would 
typically be represented in the ORC (Common Order) segment, but you may include
it to carry additional information to the final destination such as the status 
of the result being preliminary, final, etc. 

It's always recommended to consult the HL7 standard or implementation guide for 
your specific use case and the receiver's requirements.  So, again, please read
the entirety of this document, consult with your particular partner or vendor,
and ensure you are sending the necessary information to fulfill your 
implementation requirements as well as the spirit of any integration you are
performing.

As for this library, it will require you to minimally provide information about
the patient, the test, and the test reult.  

## What is HL7
Health Level Seven (HL7) is a set of international standards for the exchange, integration, sharing, and retrieval of electronic health information. These standards define how information is packaged and communicated from one party to another, setting the language, structure, and data types required for seamless integration between systems.

HL7 exists to facilitate interoperability between different healthcare systems and software applications. It was established to address the need for a more efficient way to share data, reduce redundancy and errors, and ensure that disparate healthcare systems can talk to each other and share relevant patient information securely and accurately.

In the realm of HL7, messages are the primary vehicle for data exchange. An HL7 message is made up of several segments. Each segment consists of a series of composable units known as fields. Each segment begins with a three-character string that identifies the segment type. For example, an MSH segment is a message header segment, a PID segment carries patient identification data, and an OBR segment contains observation request information.

The message always starts with an MSH segment, which identifies the type and purpose of the message. Other segments follow, each carrying different kinds of data.

Segments are arranged in a hierarchical manner to form trees known as "groups." Groups can contain multiple segments or other groups, allowing complex relationships of data to be represented.

Each segment in the message is separated by a carriage return, and within each segment, the fields are delimited using a defined character, often the pipe character (|). The data within the fields are further subdivided using various other delimiters, such as the caret (^).

So, an HL7 message is essentially a structured string of text, divided into segments, fields, components, and sub-components, designed to carry all the necessary healthcare information for a particular transaction or event. The specific structure and content of the message depend on the type of event being communicated and the specific requirements of the systems exchanging the information.

HL7 version 2.5.1 is a specific release of the HL7 standard that introduced various enhancements to support evolving healthcare information needs. Like its predecessors, it uses a text-based, segment-structured format for data exchange.

## About the HL7 ELR Message
Electronic Laboratory Reporting (ELR) is a specific type of HL7 v2.5.1 message used to communicate laboratory test results from laboratories to public health agencies. The need for ELR has been highlighted by public health events such as the COVID-19 pandemic, where rapid, accurate reporting of test results is vital for monitoring and response efforts.

An ELR message contains segments for various types of information:

- The MSH (Message Header) segment provides information about the message itself, such as the message type and the sender and receiver of the message.
- The PID (Patient Identification) segment carries patient demographic information.
- The OBR (Observation Request) and OBX (Observation Result) segments carry the test order and result information, respectively.
- The SPM (Specimen) segment provides details about the sample that was tested.
- Additional segments like PV1 (Patient Visit), ORC (Common Order), NK1 (Next of Kin / Associated Parties), and others can provide further context and detail as needed.

The use of a standardized message format like HL7 v2.5.1 ELR helps ensure that the transmitted information is interpretable by different systems, regardless of the specific software or hardware used by the laboratory or public health agency. This enables rapid, automated, accurate reporting and analysis of laboratory test results, which is vital for public health monitoring and response.

### ELR Message Segments
To simplify implementation, this library focuses on certain segments within the 
HL7 2.5.1 ELR message.  Certain segments are denoted as required while others are
flagged as recommended.  Please note required is a hard word to define within
HL7 and a segment may be denoted as required here but may not be necessary to
fulfill your integration requirements with a partner.

_This library requires you to provide, minimally, information necessary to fill out the PID, OBR, and OBX segments._

Here's a brief summary of the required and recommended segments in an HL7 v2.5.1 Electronic Laboratory Reporting (ELR) message:

**Required Segments:**

- MSH (Message Header): This segment is always the first in any HL7 message. It contains metadata about the message itself, such as who is sending, who is intended to receive the message, and what type of message it is.

- PID (Patient Identification): This segment includes patient demographic information such as ID, name, date of birth, sex, and address. It serves as a unique identifier for the patient across different healthcare systems.

- PV1 (Patient Visit): This segment provides additional information about the patient's current or most recent visit, including patient location, attending doctor, and visit status.

- ORC (Common Order): This segment carries information about the order details. It includes order control codes, order status, and ordering provider information.

- OBR (Observation Request): This segment holds details about the lab test order, including the test requested, order details, and result status.

- OBX (Observation Result): This segment contains the actual results from the lab test, including test identifier, results, units, and reference ranges.

- SPM (Specimen): This segment provides details about the sample that was tested, such as specimen ID, specimen type, and specimen collection and handling details.

**Recommended Segments:**

- SFT (Software Segment): This segment provides details about the software that generated the message, including software vendor organization, software certified version or release number. This segment is recommended as it helps in troubleshooting and system compatibility checks.

- UAC (User Authentication Credential Segment): This segment provides security-related information, such as the user login credentials that were used to authenticate the user or system creating or sending the message.

- PD1 (Patient Additional Demographic): This segment provides additional demographic information about the patient that is not included in the PID segment. This may include information such as living arrangements or public health risk factors.

- NK1 (Next of Kin / Associated Parties): This segment provides information about individuals associated with the patient, such as next of kin or emergency contacts. It can be helpful in situations where contact with the patient is needed for follow-up or additional information.

These segments are enumerated below and focus on the primary fields within each segment.

#### MSH (Message Header) Segment:
* Description: This segment defines the intent, source, destination, and certain specifics of the syntax of the message.
* Required Fields:
    - MSH-1 (Field Separator):
        * Type: String
        * Format: N/A
        * Description: The character used to separate fields in the message.
    - MSH-2 (Encoding Characters):
        * Type: String
        * Format: N/A
        * Description: Characters used in the encoding of the message.
    - MSH-7 (Date/Time of Message):
        * Type: DateTime
        * Format: YYYYMMDDHHMMSS
        * Description: The time when the message was created.
    - MSH-9 (Message Type):
        * Type: String
        * Format: N/A
        * Description: Indicates the purpose of the message.
* Recommended Fields:
    - MSH-3 (Sending Application):
        * Type: String
        * Format: N/A
        * Description: Identifies the application that sent the message.
    - MSH-4 (Sending Facility):
        * Type: String
        * Format: N/A
        * Description: Identifies the facility that sent the message.
* Optional Fields:
    - MSH-5 (Receiving Application):
        * Type: String
        * Format: N/A
        * Description: Identifies the application that is intended to receive the message.
    - MSH-6 (Receiving Facility):
        * Type: String
        * Format: N/A
        * Description: Identifies the facility that is intended to receive the message.

#### PID (Patient Identification) Segment:
* Description: This segment contains identification and demographic information about the patient.
* Required Fields:
    - PID-3 (Patient Identifier List):
        * Type: String
        * Format: N/A
        * Description: Contains the patient's identification number.
    - PID-5 (Patient Name):
        * Type: String
        * Format: N/A
        * Description: The full name of the patient.
* Recommended Fields:
    - PID-7 (Date/Time of Birth):
        * Type: DateTime
        * Format: YYYYMMDD
        * Description: The patient's date of birth.
    - PID-8 (Administrative Sex):
        * Type: String
        * Format: N/A
        * Description: The patient's gender.
* Optional Fields:
    - PID-11 (Patient Address):
        * Type: String
        * Format: N/A
        * Description: The patient's address.
    - PID-13 (Phone Number – Home):
        * Type: String
        * Format: N/A
        * Description: The patient's home phone number.

#### PV1 (Patient Visit) Segment:
* Description: This segment contains information about the patient's visit or encounter.
* Required Fields:
    - PV1-2 (Patient Class):
        * Type: String
        * Format: N/A
        * Description: The type of patient encounter (e.g., inpatient, outpatient).
    - PV1-3 (Assigned Patient Location):
        * Type: String
        * Format: N/A
        * Description: Location assigned to the patient within the healthcare facility.
* Recommended Fields:
    - PV1-7 (Attending Doctor):
        * Type: String
        * Format: N/A
        * Description: The primary care provider or clinician responsible for the patient's care during this visit.
    - PV1-19 (Visit Number):
        * Type: String
        * Format: N/A
        * Description: The identifier used to distinguish this particular visit.
* Optional Fields:
    - PV1-44 (Admit Date/Time):
        * Type: DateTime
        * Format: YYYYMMDDHHMMSS
        * Description: Date and time when the patient was admitted.

#### ORC (Common Order) Segment:
* Description: This segment provides information about the order such as placer and filler order numbers and order status.
* Required Fields:
    - ORC-1 (Order Control):
        * Type: String
        * Format: N/A
        * Description: Defines the type of order (e.g., new, cancel).
    - ORC-2 (Placer Order Number):
        * Type: String
        * Format: N/A
        * Description: Identifier for the order from the placer's perspective.
* Recommended Fields:
    - ORC-5 (Order Status):
        * Type: String
        * Format: N/A
        * Description: Status of the order (e.g., completed, cancelled).
    - ORC-12 (Ordering Provider):
        * Type: String
        * Format: N/A
        * Description: Provider who ordered the service/test.
* Optional Fields:
    - ORC-7 (Quantity/Timing):
        * Type: String
        * Format: N/A
        * Description: Details about the quantity and timing for the order.

#### OBR (Observation Request) Segment:
* Description: This segment includes details about the diagnostic test or observation requested, including timing and specimens used.
* Required Fields:
    - OBR-4 (Universal Service Identifier):
        * Type: String
        * Format: N/A
        * Description: Identifier for the test or observation requested.
* Recommended Fields:
    - OBR-7 (Observation Date/Time):
        * Type: DateTime
        * Format: YYYYMMDDHHMMSS
        * Description: Date/time when the observation or test was performed.
    - OBR-16 (Ordering Provider):
        * Type: String
        * Format: N/A
        * Description: Provider who ordered the test or observation.
* Optional Fields:
    - OBR-13 (Relevant Clinical Information):
        * Type: String
        * Format: N/A
        * Description: Clinical information that may be relevant to the interpretation of the result.

#### OBX (Observation/Result) Segment:
* Description: This segment contains the results of the observation or test referenced in the OBR segment.
* Required Fields:
    - OBX-3 (Observation Identifier):
        * Type: String
        * Format: N/A
        * Description: Identifier for the type of observation (e.g., test result, imaging observation).
    - OBX-5 (Observation Value):
        * Type: Variable
        * Format: N/A
        * Description: The result of the observation.
* Recommended Fields:
    - OBX-2 (Value Type):
        * Type: String
        * Format: N/A
        * Description: Identifies the data type of the observation value.
    - OBX-6 (Units):
        * Type: String
        * Format: N/A
        * Description: Units of measure for the observation value.
* Optional Fields:
    - OBX-7 (References Range):
        * Type: String
        * Format: N/A
        * Description: Normal range for this observation.

#### SPM (Specimen) Segment:
* Description: This segment carries information about the specimen used in the observation.
* Required Fields:
    - SPM-4 (Specimen Type):
        * Type: String
        * Format: N/A
        * Description: Describes the type of specimen collected.
* Recommended Fields:
    - SPM-2 (Specimen ID):
        * Type: String
        * Format: N/A
        * Description: Identifier assigned to the specimen.
    - SPM-17 (Specimen Collection Date/Time):
        * Type: DateTime
        * Format: YYYYMMDDHHMMSS
        * Description: The date and time the specimen was collected.
* Optional Fields:
    - SPM-24 (Specimen Role):
        * Type: String
        * Format: N/A
        * Description: Identifies the role of the specimen (e.g., patient, control, etc.).

#### SFT (Software Segment) Segment:
* Description: This segment provides information about the software that created the message.
* Required Fields:
    - SFT-1 (Software Vendor Organization):
        * Type: String
        * Format: N/A
        * Description: The name of the organization that created the software.
    - SFT-2 (Software Certified Version or Release Number):
        * Type: String
        * Format: N/A
        * Description: The certified version or release number of the software.
* Recommended Fields:
    - SFT-3 (Software Product Name):
        * Type: String
        * Format: N/A
        * Description: The official name of the software product.
    - SFT-6 (Software Binary ID):
        * Type: String
        * Format: N/A
        * Description: Unique identifier of the software binary.
* Optional Fields:
    - SFT-4 (Software Install Date):
        * Type: DateTime
        * Format: YYYYMMDD
        * Description: Date the software was installed.

* Description: This segment holds information for user authentication.
* Required Fields:
    - UAC-1 (User Authentication Credential Type Code):
        * Type: String
        * Format: N/A
        * Description: Describes the type of user authentication credential used.
    - UAC-2 (User Authentication Credential):
        * Type: String
        * Format: N/A
        * Description: The user authentication credential itself.
* Recommended Fields: None
* Optional Fields: None

#### PD1 (Patient Additional Demographic) Segment:
* Description: This segment provides additional demographic information about the patient.
* Required Fields: None
* Recommended Fields:
    - PD1-3 (Patient Primary Care Provider Name & ID No.):
        * Type: String
        * Format: N/A
        * Description: The name and identifier of the patient's primary care provider.
* Optional Fields:
    - PD1-11 (Publicity Code):
        * Type: String
        * Format: N/A
        * Description: Defines the type of publicity the patient accepts (e.g., "No public directory", "Public directory").

#### NK1 (Next of Kin / Associated Parties) Segment:
* Description: This segment contains information about the patient's next of kin or other associated parties.
* Required Fields:
    - NK1-1 (Set ID - NK1):
        * Type: String
        * Format: N/A
        * Description: Identifies the sequence of the repeating NK1 segment.
    - NK1-2 (NK1 Name):
        * Type: String
        * Format: N/A
        * Description: Name of the next of kin or associated party.
* Recommended Fields:
    - NK1-3 (Relationship):
        * Type: String
        * Format: N/A
        * Description: Describes the relationship of the individual to the patient.
    - NK1-4 (Address):
        * Type: String
        * Format: N/A
        * Description: Contact address of the next of kin or associated party.
* Optional Fields:
    - NK1-5 (Phone Number):
        * Type: String
        * Format: N/A
        * Description: Contact phone number of the next of kin or associated party.