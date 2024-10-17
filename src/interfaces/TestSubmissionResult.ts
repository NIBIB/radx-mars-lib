export default interface TestSubmissionResult {
  get successful (): boolean
  get id(): (string | null)
  get warnings(): string[]
  get errors(): string[]
}
