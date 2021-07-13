export interface RequestSummaryType {
  id: string,
  position: string,
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
  contractType:string,
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
  requiresComputer:boolean

}
