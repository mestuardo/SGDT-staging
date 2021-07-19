export interface GetProfessionalType {
  id: string,
  name: string,
  firstSurname: string,
  secondSurname: string,
  rut: string,
  specialty: string,
  currentJob: string,
  savedJobOffers: string[],
  profile: string,
  technicalKnowledge: string,
  education: { id: string, title: string, period: string, description: string }[],
  skills: { id: string, title: string, body: string }[],
  pastJobs: { id: string, companyName: string, period: string, position: string,
    functions: string, technologiesUsed: string }[],
  contactInfo: { phone: string, email: string },
}

export interface ProfessionalData {
  professional: GetProfessionalType,
}
