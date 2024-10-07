# radx-mars-lib

## Overview
This library provides a set of core classes and interfaces to simplify the
creation and delivery of HL7 ELR 2.5.1 messages to a RADx MARS Hub.  

For information about the RADx MARS Program, please
[visit here](https://www.nibib.nih.gov/covid-19/radx-tech-program/mars)

For basic information about HL7, specifically HL7 that is relevant to the
[HL7v2 Implementation Guide](https://www.nibib.nih.gov/covid-19/radx-tech-program/mars/HL7v2-implementation-guide),
you can get an overview [here](./src/utils/hl7/README.md)

## Implementations and Extensions
This base library is used by two NIBIB and Meadows Design maintained libraries:
* [aims-mars-lib](https://github.com/NIBIB/aims-mars-lib): A library used to
communicate to APHL's AIMS MARS Hub.
* [reportstream-mars-lib](https://github.com/NIBIB/reportstream-mars-lib): A
library used to communicate to CDC's ReportStream MARS Hub.

We also provide a sample of how to orchestrate a MARS Hub Client at
[radx-mars-demo](https://github.com/NIBIB/radx-mars-lib)

If you are looking to begin reporting your test results as part of participation
in the [RADx MARS Program](https://www.nibib.nih.gov/covid-19/radx-tech-program/mars),
we suggest you start with the demo.