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

export type WeeklyShift = {
  monday: string,
  tuesday: string,
  wednesday: string,
  thursday: string,
  friday: string,
  saturday: string,
  sunday: string,
};

export type Language = {
  language: string,
  level: string,
  type: string
};

export type TechnicalRequirement = {
  requirement: string,
  obligatoriness: string
};

type Address = {
  city: string,
  comuna: string,
  number: string,
  street: string,
};

export interface ProfessionalJobOfferDetail {
  approxStartDate?: Date;
  contractType?: 'FIXED' | 'INDEFINITE';
  formationStatus?: 'COMPLETE' | 'INCOMPLETE';
  id: string,
  languages?: Array<Language>;
  levelOfStudies?: 'LOWER_SCHOOL' | 'HIGH_SCHOOL' | 'TECHNICAL' | 'COLLEGE';
  maxSalary?: number;
  offerDescription?: string,
  position: string,
  possibleDuration?: number;
  recruiter?: number;
  questions?: Array<string>,
  requiresComputer?: boolean;
  requiresPsychological?: boolean;
  requiresReferral?: boolean;
  requiresTechnical?: boolean;
  serviceType?: 'INTERNAL' | 'OUTSOURCING' | 'OUTSOURCING_SELECTION' | 'OUTSOURCING_TRANSITORY';
  shift?: WeeklyShift,
  shiftType?: 'PART_TIME' | 'FULL_TIME' | 'FREELANCE',
  softSkills?: Array<string>,
  specialRequirements?: Array<string>,
  stage: 'REQUEST' | 'JOB_OFFER' | 'PSYCHOLOGICAL' | 'TECHNICAL',
  status: 'ACCEPTED' | 'IN_PROCESS' | 'REJECTED',
  technicalRequirements?: Array<TechnicalRequirement>,
  vacancies: number;
  workAddress?: Address,
  yearsExperience?: number;
  saved?: false | boolean,
  jobModality: string,
}
