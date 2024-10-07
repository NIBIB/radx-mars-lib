import CliaHierarchicDesignator from '../../src/models/CliaHierarchicDesignator';
import IsoHierarchicDesignator from '../../src/models/IsoHierarchicDesignator';

/** 
 **/
describe('Hierarchic Designators', () => {
    it('Throws exception for invalid CLIA', () => {
        expect(() => new CliaHierarchicDesignator('someNamespace', 'invalidCliaId')).toThrow()
    })

    it ('accepts valid CLIA HD', () => {
        expect(() => new CliaHierarchicDesignator('someNamespace', '00Z0000002')).not.toThrow()
    })

    it ('throws exception for invalid ISO', () => {
        expect(() => new IsoHierarchicDesignator('someNamespace', 'invalid iso')).toThrow()
    })

    it ('accepts valid ISO HD', () => {
        expect(() => new IsoHierarchicDesignator('someNamespace', '2.16.840.1.113883.3.8589.4.1.22')).not.toThrow()
    })
});
