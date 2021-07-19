export interface FilterApplicationsType {
  id: string,
  jobOfferId: string,
  professionalId: string,
  status: string,
  applicationCreationDate: number,
  lastStageDate: number,
  decisionDate: number,
  recruiterId: string,
  questions: string[],
  answers: string[],
  assessment: string,
  stage: string,
  rejectedMessage: string,
  files: { filename: string, url: string }[],
}

export interface FilterApplicationDataType {
  jobOfferApplications: FilterApplicationsType[]
}
