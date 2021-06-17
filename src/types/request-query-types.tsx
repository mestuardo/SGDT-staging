export interface RequestSummaryType {
  id: string,
  position: string,
  vacancies: number,
  approxStartDate: string,
  possibleDuration: number,
  requestDescription: string,
  languages: { language: string, level: string }[],
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
