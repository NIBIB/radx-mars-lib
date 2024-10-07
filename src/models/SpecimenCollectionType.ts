/* eslint-disable max-len */
import CodingSystem from './CodingSystem'

/**
 * Represents the type of specimen collected for a test.  These values map into
 * the SPM segment of a generated HL7 message along with information about the
 * {@link TestKit}. For any given test, the {@link SpecimenCollectionType} class
 * defining it is identified in the PowerBI dashboard located at
 * https://app.powerbi.com/view?r=eyJrIjoiZWZjZDQyYjktNGFiMC00YWZkLTg2NTYtMjg2ODEyZWM1ZTViIiwidCI6IjQzNGUwYWVkLWVmODItNDU2OC1hMDQ5LTNiMTdhZGMwOGRkZCIsImMiOjF9&pageName=ReportSection3147535a75468ee60d16
 * and corresponds to the HL7 ELR 2.5.1 fields SPM-4.1, SPM-4.2, and SPM-4.3.
 *
 * There should be no need to construct this class directly.  The user should,
 * instead, use the associated static properties defined in this class.
 * @param {string} conceptId - The concept of the specimen, mapped to SPM-4.1.
 * @param {string} preferredTerm - The preferred term when dealing with the
 * specimen type. Interestingly enough, it's not used much.
 * @param {string} fullySpecifiedName - The fully specified name of the
 * specimen type.  mapped to SPM-4.2.
 */
export default class SpecimenCollectionType {
  private readonly _conceptId: string
  private readonly _preferredTerm: string
  private readonly _fullySpecifiedName: string
  private readonly _codingSystem: CodingSystem

  /**
   * Constructs a {@link SpecimenCollectionType} class.  This class represents
   * the specimen collection type as defined in the RADx MARS PowerBI dashboard.
   * Construction of a {@link SpecimenCollectionType} should be rare as all
   * PHIN VADS are defined as static members of this class.
   * @param conceptId the concept id.  Corresponds to SPM-4.1.
   * @param preferredTerm the preferred term as defined by PHIN VADS
   * @param fullySpecifiedName the fully specifed name from PHIN VADS.
   * Corresponds to SPM-4.2
   * @param codingSystem - The coding system.  Currently SNOMED CT.  Corresponds
   * to SPM-4.3
   */
  constructor (
    conceptId: string,
    preferredTerm: string,
    fullySpecifiedName: string,
    codingSystem: CodingSystem = CodingSystem.SCT_20210301
  ) {
    this._conceptId = conceptId
    this._preferredTerm = preferredTerm
    this._fullySpecifiedName = fullySpecifiedName
    this._codingSystem = codingSystem
  }

  public get conceptId (): string {
    return this._conceptId
  }

  public get preferredTerm (): string {
    return this._preferredTerm
  }

  public get fullySpecifiedName (): string {
    return this._fullySpecifiedName
  }

  public get codingSystem (): CodingSystem {
    return this._codingSystem
  }

  public asHl7String (separator: string = '^'): string {
    return [
      this._conceptId,
      this._fullySpecifiedName,
      this._codingSystem.code,
      '',
      '',
      '',
      this._codingSystem.version
    ].join(separator)
  }

  static readonly AnteriorNaresSwab = new SpecimenCollectionType(
    '697989009',
    'Anterior nares swab',
    'Anterior nares swab (specimen)'
  )

  static readonly BloodSpecimen = new SpecimenCollectionType(
    '119297000',
    'Blood specimen', 'Blood specimen (specimen)'
  )

  static readonly BronchoalveolarLavageFluidSample = new SpecimenCollectionType(
    '258607008',
    'Bronchoalveolar lavage fluid sample',
    'Bronchoalveolar lavage fluid sample (specimen)'
  )

  static readonly CapillaryBloodSpecimen = new SpecimenCollectionType(
    '122554006',
    'Capillary blood specimen',
    'Capillary blood specimen (specimen)'
  )

  static readonly DriedBloodSpecimen = new SpecimenCollectionType(
    '119294007',
    'Dried blood specimen',
    'Dried blood specimen (specimen)'
  )

  static readonly GastricAspirateSample = new SpecimenCollectionType(
    '168137004',
    'Gastric aspirate sample',
    'Gastric aspirate sample (specimen)'
  )

  static readonly LowerRespiratorySample = new SpecimenCollectionType(
    '258606004',
    'Lower respiratory sample',
    'Lower respiratory sample (specimen)'
  )

  static readonly NasopharyngealAspirate = new SpecimenCollectionType(
    '258411007',
    'Nasopharyngeal aspirate',
    'Nasopharyngeal aspirate (specimen)'
  )

  static readonly NasopharyngealSwab = new SpecimenCollectionType(
    '258500001',
    'Nasopharyngeal swab',
    'Nasopharyngeal swab (specimen)'
  )

  static readonly OropharyngealAspirate = new SpecimenCollectionType(
    '258412000',
    'Oropharyngeal aspirate',
    'Oropharyngeal aspirate (specimen)'
  )

  static readonly PleuralFluidSpecimen = new SpecimenCollectionType(
    '418564007',
    'Pleural fluid specimen',
    'Pleural fluid specimen (specimen)'
  )

  static readonly SalivaSpecimen = new SpecimenCollectionType(
    '119342007',
    'Saliva specimen',
    'Saliva specimen (specimen)'
  )

  static readonly SerumSpecimen = new SpecimenCollectionType(
    '119364003',
    'Serum specimen',
    'Serum specimen (specimen)'
  )

  static readonly SpecimenFromDuodenumObtainedByAspiration = new SpecimenCollectionType(
    '734427005',
    'Specimen from duodenum obtained by aspiration',
    'Specimen from duodenum obtained by aspiration (specimen)'
  )

  static readonly SpecimenFromLungObtainedByBiopsy = new SpecimenCollectionType(
    '122610009',
    'Specimen from lung obtained by biopsy',
    'Specimen from lung obtained by biopsy (specimen)'
  )

  static readonly SpecimenFromTracheaObtainedByAspiration = new SpecimenCollectionType(
    '445447003',
    'Specimen from trachea obtained by aspiration',
    'Specimen from trachea obtained by aspiration (specimen)'
  )

  static readonly SputumSpecimen = new SpecimenCollectionType(
    '119334006',
    'Sputum specimen',
    'Sputum specimen (specimen)'
  )

  static readonly StoolSpecimen = new SpecimenCollectionType(
    '119339001',
    'Stool specimen',
    'Stool specimen (specimen)'
  )

  static readonly SwabFromNasalSinus = new SpecimenCollectionType(
    '472901003',
    'Swab from nasal sinus',
    'Swab from nasal sinus (specimen)'
  )

  static readonly SwabOfInternalNose = new SpecimenCollectionType(
    '445297001',
    'Swab of internal nose',
    'Swab of internal nose (specimen)'
  )

  static readonly MidTurbinateNasalSwab = new SpecimenCollectionType(
    '871810001',
    'Mid-turbinate nasal swab',
    'Swab specimen from nasal mid-turbinate (specimen)'
  )

  static readonly OropharyngealSwab = new SpecimenCollectionType(
    '461911000124106',
    'Oropharyngeal swab',
    'Swab specimen from oropharynx (specimen)'
  )

  static readonly ThroatSwab = new SpecimenCollectionType(
    '258529004',
    'Throat swab',
    'Throat swab (specimen)'
  )

  static readonly UpperRespiratoryFluidSpecimenObtainedByTrachealAspiration = new SpecimenCollectionType(
    '122877000',
    'Upper respiratory fluid specimen obtained by tracheal aspiration',
    'Upper respiratory fluid specimen obtained by tracheal aspiration (specimen)'
  )

  static readonly UpperRespiratorySwabSample = new SpecimenCollectionType(
    '309164002',
    'Upper respiratory swab sample',
    'Upper respiratory swab sample (specimen)'
  )

  static readonly UrineSpecimen = new SpecimenCollectionType(
    '122575003',
    'Urine specimen',
    'Urine specimen (specimen)'
  )

  static readonly WholeBloodSample = new SpecimenCollectionType(
    '258580003',
    'Whole blood sample',
    'Whole blood sample (specimen)'
  )
}
