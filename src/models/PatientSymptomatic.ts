/**
 * Constructs a patient symptomatic object, encapsulating the patient
 * symptom declaration and their symptom onset date.
 *
 * If the patient does not provide an answer within the application for being
 * symptomatic, you do not need to declare the symptoms.
 */

enum PatientSymptomaticDeclaration {
  Symptomatic,
  NotSymptomatic,
  Unknown
}

class PatientSymptomatic {
  private readonly _isSymptomatic: PatientSymptomaticDeclaration
  private readonly _symptomOnsetDate: (Date | null)

  /**
   * Constructs a PatientName object.
   * @param isSymptomatic Is the patient symptomatic?
   * @param symptomOnsetDate Date of symptom onset
   */
  constructor (
    isSymptomatic: PatientSymptomaticDeclaration,
    symptomOnsetDate: Date | null
  ) {
    this._isSymptomatic = isSymptomatic
    this._symptomOnsetDate = symptomOnsetDate

    // Documentation says onset date isn't required, even if the user states
    // they are symptomatic. The developer is required to ask for a date but the
    // user is not required to provide it.  So if there's no date, there's
    // nothing else to do.
    if (this._symptomOnsetDate === null) {
      return
    }

    if (this._symptomOnsetDate.getTime() > Date.now()) {
      throw new Error('Symptom onset date cannot be in the future')
    }

    if (this._isSymptomatic !== PatientSymptomaticDeclaration.Symptomatic) {
      throw new Error('There is a symptom onset date provided but the patient is not declared symptomatic')
    }
  }

  public get isSymptomatic (): PatientSymptomaticDeclaration {
    return this._isSymptomatic
  }

  public get symptomOnsetDate (): (Date | null) {
    return this._symptomOnsetDate
  }
}

export { PatientSymptomatic, PatientSymptomaticDeclaration }
