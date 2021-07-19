export interface RequestSummaryType {
  id: string,
  position: string,
  requestCreationDate: number,
  jobOfferCreationDate: number,
  closeJobOfferDate: number,
  sla_start: number,
  sla_end: number,
  vacancies: number,
  client: string,
  recruiter: string,
}

export interface RequestsIdsType {
  requests: { id: string }[],
}

export interface RequestDetailType {
  id: string,
  client: string,
  contractType: number[],
  requestCreationDate: number,
  jobOfferCreationDate: number,
  closeJobOfferDate: number,
  closeMessage: string,
  sla_start: number,
  sla_end: number,
  position: string,
  vacancies: number,
  approxStartDate: string,
  possibleDuration: number,
  requestDescription: string,
  recruiter:string,
  levelOfStudies: string,
  languages: { language: string, level: string }[],
  maxSalary:number
  formationStatus: string,
  softSkills: Array<string>,
  serviceType: string,
  yearsExperience: number,
  shiftType:string,
  requiresComputer: boolean
  specialRequirements: string[],
  technicalRequirements: { requirement: string, obligatoriness: string }[],
  workAddress: {
    city: string,
    number: string,
    comuna: string,
    country: string,
    street: string,
  }
}
