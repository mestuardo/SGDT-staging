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

interface JobOfferDataType {
  requiredProfile: { field: string, value:string }[],
  contractInformation: { field: string, value:string }[],
  additionInformation: { field: string, value:string }[],
}

export const processJobOffer = (
  jobOfferObject: ProfessionalJobOfferDetail,
): JobOfferDataType => {
  const jobOfferData = {
    requiredProfile: [
      {
        field: 'Cargo requerido',
        value: jobOfferObject.position,
      },
      { field: 'Vacantes', value: jobOfferObject.vacancies?.toString() || '' },
      { field: 'Años de experiencia', value: jobOfferObject.yearsExperience?.toString() || '' },
      { field: 'Formación académica', value: `${levelOfStudiesTransformer(jobOfferObject.levelOfStudies)}` },
      { field: 'Dirección Laboral', value: jobOfferObject.workAddress ? `${jobOfferObject.workAddress.street} ${jobOfferObject.workAddress.number}, ${jobOfferObject.workAddress.comuna}, ${jobOfferObject.workAddress.city}` : '' },

    ],
    contractInformation: [
      {
        field: 'Requisitos técnicos',
        value: jobOfferObject.technicalRequirements?.map((technicalRequirementObject) => technicalRequirementTransformer(technicalRequirementObject)).join('\n') || '',
      },
    ],
    additionInformation: [
      { field: 'Idiomas', value: jobOfferObject.languages?.map((languageObject) => languageObjectTransformer(languageObject)).join('\n') || '' },

    ],
  };
  jobOfferData.requiredProfile = jobOfferData.requiredProfile.filter((fieldObject) => fieldObject.value !== '');
  jobOfferData.contractInformation = jobOfferData.contractInformation.filter((fieldObject) => fieldObject.value !== '');
  jobOfferData.additionInformation = jobOfferData.additionInformation.filter((fieldObject) => fieldObject.value !== '');

  return jobOfferData;
};
