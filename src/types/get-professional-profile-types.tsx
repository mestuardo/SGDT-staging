export interface GetProfessionalProfileType {
  id: string,
  name: string,
  firstSurname: string,
  secondSurname: string,
  rut: string,
  specialty: string,
  currentJob: string,
  savedJobOffers: string[],
}

export interface EducationCardType {
  id: string,
  description: string,
  title: string,
  period: string,
}

export interface KnowledgeSkill {
  id: string,
  title: string,
  body: string,
}

export interface JobCardProps {
  id: string,
  companyName: string,
  period: string,
  position: string,
  functions: string,
  technologiesUsed: string,
}

export interface EducationProps {
  id: string,
  title: string,
  description: string,
  period: string,
  educationType: {
    degree: string,
    completed: string | boolean
  }
}

interface Address {
  city: string,
  comuna: string,
  country: string,
  number: string,
  street: string,
}

interface ContactInfo {
  email: string,
  phone: string,
  address: Address
}

export interface ProfileData {
  profile: string,
  career: string,
  name: string,
  firstSurname: string,
  secondSurname: string,
  currentJob: string,
  rut: string,
  state: string,
  specialty: string,
  institutions: string,
  technicalKnowledge: string,
  birthDate: Date,
  contactInfo: ContactInfo,
  yearsExperience: string,
  education: EducationProps[],
  skills: KnowledgeSkill[],
  pastJobs: JobCardProps[]
}

export interface ProfessionalProfileData {
  data: ProfileData
}
