export interface JobOfferSummaryType {
  id: string,
  position: string,
  requestCreationDate: number,
  jobOfferCreationDate: number,
  closeJobOfferDate: number,
  closeMessage: string,
  sla_start: number,
  sla_end: number,
  vacancies: number,
  client: string,
  recruiter: string,
}

export interface JobOfferIdsType {
  jobOffers: { id: string }[],
}

export interface JobOfferDetailType {
  id: string,
  position: string,
  vacancies: number,
  requestCreationDate: number,
  jobOfferCreationDate: number,
  closeJobOfferDate: number,
  closeMessage: string,
  sla_start: number,
  sla_end: number,
  contractType: string,
  recruiter:string,
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
  workAddress: {
    city: string,
    number: string,
    comuna: string,
    country: string,
    street: string,
  },
  messages: {
    senderName: string,
    message: string,
    senderOptions: string,
    createdAt: Date,
  }[],
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
