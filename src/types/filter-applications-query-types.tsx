export interface FilterApplicationsType {
  id: string,
  jobOfferId: string,
  professionalId: string,
  status: string,
  recruiterId: string,
  questions: string[],
  answers: string[],
  assessment: string,
  stage: string,
}

export interface FilterApplicationDataType {
  jobOfferApplications: FilterApplicationsType[]
}
