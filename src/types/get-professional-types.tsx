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
  institutions: string,
  technicalKnowledge: string,
  education: {
    id: string,
    title: string,
    period: string,
    description: string,
    educationType: { degree: string, completed: boolean }
  }[],
  skills: { id: string, title: string, body: string }[],
  pastJobs: { id: string, companyName: string, period: string, position: string,
    functions: string, technologiesUsed: string }[],
  contactInfo: {
    phone: string,
    email: string,
    address: { country: string, city: string, comuna: string, street: string, number: string } },
  birthDay: Date,
}

export interface ProfessionalData {
  professional: GetProfessionalType,
}
