export interface JobOfferSummaryType {
  id: string,
  position: string,
  vacancies: number,
  client: string,
  recruiter: string,
  // TODO: add SLAs
}

export interface JobOfferIdsType {
  jobOffers: { id: string }[],
}

export interface JobOfferDetailType {
  id: string,
  position: string,
  vacancies: number,
  contractType: string,
  shiftType: string,
  maxSalary: number,
  client: string,
  yearsExperience: number,
  levelOfStudies: string,
  formationStatus: string,
  languages: { language: string }[],
  softSkills: string[]
  approxStartDate: Date,
  possibleDuration: Date,
  requiresComputer: boolean,
  offerDescription: string,
  questions: string[],
  serviceType: string,
  specialRequirements: string[],
  technicalRequirements: { requirement: string, obligatoriness: string }[],
}

export interface ClientInformationType {
  name: string,
  tradeName: string,
  rut: string,
  contactInfo: {
    phone: string,
    email: string,
  },
}
