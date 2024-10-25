enum HubSubmissionResultStatus {
  notFound,
  received,
  processing,
  processed
}

interface HubSubmissionResult {
  get status (): HubSubmissionResultStatus
  get successful (): boolean
  get submissionId(): (string | null)
  get warnings(): string[]
  get errors(): string[]
}

export { type HubSubmissionResult, HubSubmissionResultStatus }
