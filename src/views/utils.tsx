import { Language, TechnicalRequirement, ProfessionalJobOfferDetail } from '../types/job-offer-query-types';

export const capitalizeEnumSentence = (sentence: string | undefined): string => {
  if (!sentence) return '';
  const words = sentence.split('_');
  const wordsCapitalized = words.map(
    (word) => word[0].toUpperCase() + word.toLowerCase().substring(1),
  );
  return wordsCapitalized.join(' ');
};

export const SiNoTransformer = (value: boolean | null): string => {
  if (value === null) {
    return '';
  }
  return value ? 'Sí' : 'No';
};

export const levelOfStudiesTransformer = (value: string | undefined): string => {
  switch (value) {
    case 'LOWER_SCHOOL':
      return 'Enseñanza básica';
    case 'HIGH_SCHOOL':
      return 'Enseñanza media';
    case 'TECHNICAL':
      return 'Técnico profesional';
    case 'COLLEGE':
      return 'Universitaria';
    default:
      return '';
  }
};

const typeOfLanguage = (value: string | undefined): string => {
  switch (value) {
    case 'WRITING':
      return 'Escrito';
    case 'READING':
      return 'Lectura';
    case 'SPEAKING':
      return 'Hablado';
    default:
      return '';
  }
};

const typeOfTechnicalRequirement = (value: string | undefined): string => {
  switch (value) {
    case 'DESIRABLE':
      return 'Deseable';
    case 'EXCLUDING':
      return 'Excluyente';
    default:
      return '';
  }
};

export const jobModalityTransformer = (value: string | undefined): string => {
  switch (value) {
    case 'REMOTE':
      return 'Remoto';
    case 'PRESENTIAL':
      return 'Presencial';
    case 'SEMI_PRESENTIAL':
      return 'Semipresencial';
    default:
      return '';
  }
};

export const languageObjectTransformer = (languageObject: Language): string => `${languageObject.language}: ${typeOfLanguage(languageObject.type)} ${languageObject.level}`;

export const technicalRequirementTransformer = (technicalRequirementObject: TechnicalRequirement): string => `${typeOfTechnicalRequirement(technicalRequirementObject.obligatoriness)}: ${technicalRequirementObject.requirement}`;

export const processJobOffer = (
  jobOfferObject: ProfessionalJobOfferDetail,
): { field: string, value:string }[] => {
  let jobOfferData = [
    { field: 'Cargo requerido', value: jobOfferObject.position },
    { field: 'Vacantes', value: jobOfferObject.vacancies?.toString() || '' },
    { field: 'Años de experiencia', value: jobOfferObject.yearsExperience?.toString() || '' },
    { field: 'Formación académica', value: `${levelOfStudiesTransformer(jobOfferObject.levelOfStudies)}` },
    { field: 'Dirección Laboral', value: jobOfferObject.workAddress ? `${jobOfferObject.workAddress.street} ${jobOfferObject.workAddress.number}, ${jobOfferObject.workAddress.comuna}, ${jobOfferObject.workAddress.city}` : '' },
    {
      field: 'Requisitos técnicos',
      value: jobOfferObject.technicalRequirements?.map((technicalRequirementObject) => technicalRequirementTransformer(technicalRequirementObject)).join('\n') || '',
    },
    { field: 'Idiomas', value: jobOfferObject.languages?.map((languageObject) => languageObjectTransformer(languageObject)).join('\n') || '' },
  ];
  jobOfferData = jobOfferData.filter((fieldObject) => fieldObject.value !== '');
  return jobOfferData;
};
