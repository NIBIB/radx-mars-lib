enum HubSubmissionResultStatus {
  error,
  notFound,
  received,
  processing,
  processed,
  unavailable
}

interface HubSubmissionResult {
  get status (): HubSubmissionResultStatus
  get successful (): boolean
  get submissionId(): (string | null)
  get warnings(): string[]
  get errors(): string[]
}

export { type HubSubmissionResult, HubSubmissionResultStatus }
