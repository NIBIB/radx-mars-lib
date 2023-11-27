import HL7MessageBuilder from '../../src/utils/hl7/HL7MessageBuilder';
import LabInfo from '../../src/models/LabInfo';
import LabTestInfo from '../../src/models/LabTestInfo';
import LabTestSubject from '../../src/models/LabTestSubject';
import LabTestObservation from '../../src/models/LabTestObservation';

/** 
 * test the buildMessage function of the HL7MessageBuilder 
 * class, checking that the segments are correctly generated 
 * based on the input data.
 **/
describe('HL7MessageBuilder', () => {
    it('should build correct HL7 message', () => {
        const config: LabInfo = new LabInfo('LabCorp', '1234');
        const testInfo: LabTestInfo = new LabTestInfo('COVID-19', '5678');
        const subject: LabTestSubject = new LabTestSubject('John Doe', '7890', 'M', '1980-01-01', '123 Main St');
        const result: LabTestObservation = new LabTestObservation('result', 'something', 'positive');
        
        const builder: HL7MessageBuilder = new HL7MessageBuilder(config, testInfo, subject, result);
        const message: string = builder.buildMessage();

        const segments: string[] = message.split('\n');

        expect(segments[0]).toMatch(/^MSH\|.*\|ORU\^R01\|1234\|P\|2.5.1/); // MSH
        expect(segments[1]).toBe('PID||7890|||John^Doe||||1980-01-01|M|||123 Main St'); // PID
        // PID|1|7890|||Doe^John||19800101|M|||123 Main St.||||||||||||
                expect(segments[2]).toBe('OBR||||COVID-19'); // OBR
        expect(segments[3]).toBe('OBX|||5678||positive||||||F'); // OBX
    });
});

// TODO: Test address is single line
// TODO: Test date is in correct format.
// TODO: Test patient sex is constrained to appropriate biological sex values.
// TODO: Ensure proper string formatting for patient name.
