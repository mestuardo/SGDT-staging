export interface DescriptionAndQuestionsSchema{
  SLA_1: Date | null,
  SLA_2: Date | null,
  description: string,
  question_1: string,
  question_2: string,
  question_3: string,
  question_4: string,
  question_5: string,
  [key: number]: string| Date| null
}

export const summaryLabels: { [key:string]:string | boolean } = {
  LOWER_SCHOOL: 'Ed. Básica',
  HIGH_SCHOOL: 'Ed. Media',
  TECHNICAL: 'Ed. Técnica',
  COLLEGE: 'Ed. Universitaria',
  TITLED: 'Titulado',
  DESIRABLE: 'Deseable',
  EXCLUDING: 'Excluyente',
  GRADUATED: 'Graduado',
  SUSPENDED: 'Congelado',
  COMPLETE: 'Completa',
  INCOMPLETE: 'Incompleta',
  FIXED: 'Fijo',
  INDEFINITE: 'Indefinido',
  PART_TIME: 'Part-Time',
  FULL_TIME: 'Full-Time',
  FREELANCE: 'Freelance',
  INTERNAL: 'Interno',
  OUTSOURCING: 'Outsourcing',
  OUTSOURCING_TRANSITORY: 'Transitorio',
  OUTSOURCING_SELECTION: 'Selección',
};
