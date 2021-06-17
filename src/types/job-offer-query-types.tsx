export interface JobOfferSummaryType {
  id: string,
  position: string,
  vacancies: number,
  approxStartDate: string,
  possibleDuration: number,
  offerDescription: string,
  languages: { language: string }[],
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
  technicalRequirements: string[],
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
