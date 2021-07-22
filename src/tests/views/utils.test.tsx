import {
  capitalizeEnumSentence,
  SiNoTransformer,
  levelOfStudiesTransformer,
  typeOfLanguage,
  typeOfTechnicalRequirement,
  jobModalityTransformer,
  languageObjectTransformer,
  technicalRequirementTransformer,
  processJobOffer,
} from '../../views/utils';

describe('capitalize enum sentence helper', () => {
  it('returns empty sentence', () => {
    expect(capitalizeEnumSentence('')).toEqual('');
  });
  it('converts valid sentence', () => {
    expect(capitalizeEnumSentence('hello_there')).toEqual('Hello There');
  });
});

describe('boolean to word transformer helper', () => {
  it('returns empty if null', () => {
    expect(SiNoTransformer(null)).toEqual('');
  });
  it('returns Si if true', () => {
    expect(SiNoTransformer(true)).toEqual('Sí');
  });
  it('returns No if false', () => {
    expect(SiNoTransformer(false)).toEqual('No');
  });
});

describe('level of study transformer helper', () => {
  it('returns empty if null', () => {
    expect(levelOfStudiesTransformer(undefined)).toEqual('');
  });
  it('returns transforms LOWER_SCHOOL', () => {
    expect(levelOfStudiesTransformer('LOWER_SCHOOL')).toEqual('Enseñanza básica');
  });
  it('returns transforms HIGH_SCHOOL', () => {
    expect(levelOfStudiesTransformer('HIGH_SCHOOL')).toEqual('Enseñanza media');
  });
  it('returns transforms TECHNICAL', () => {
    expect(levelOfStudiesTransformer('TECHNICAL')).toEqual('Técnico profesional');
  });
  it('returns transforms COLLEGE', () => {
    expect(levelOfStudiesTransformer('COLLEGE')).toEqual('Universitaria');
  });
});

describe('type of language transformer helper', () => {
  it('returns empty if null', () => {
    expect(typeOfLanguage(undefined)).toEqual('');
  });
  it('returns transforms WRITING', () => {
    expect(typeOfLanguage('WRITING')).toEqual('Escrito');
  });
  it('returns transforms READING', () => {
    expect(typeOfLanguage('READING')).toEqual('Lectura');
  });
  it('returns transforms SPEAKING', () => {
    expect(typeOfLanguage('SPEAKING')).toEqual('Hablado');
  });
});

describe('type of technical requirement transformer helper', () => {
  it('returns empty if null', () => {
    expect(typeOfTechnicalRequirement(undefined)).toEqual('');
  });
  it('returns transforms DESIRABLE', () => {
    expect(typeOfTechnicalRequirement('DESIRABLE')).toEqual('Deseable');
  });
  it('returns transforms EXCLUDING', () => {
    expect(typeOfTechnicalRequirement('EXCLUDING')).toEqual('Excluyente');
  });
});

describe('type of job modality transformer helper', () => {
  it('returns empty if null', () => {
    expect(jobModalityTransformer(undefined)).toEqual('');
  });
  it('returns transforms REMOTE', () => {
    expect(jobModalityTransformer('REMOTE')).toEqual('Remoto');
  });
  it('returns transforms PRESENTIAL', () => {
    expect(jobModalityTransformer('PRESENTIAL')).toEqual('Presencial');
  });
  it('returns transforms SEMI_PRESENTIAL', () => {
    expect(jobModalityTransformer('SEMI_PRESENTIAL')).toEqual('Semipresencial');
  });
});

test('language object transformer', () => {
  expect(languageObjectTransformer({
    language: 'Ingles',
    type: 'READING',
    level: 'medio',
  })).toEqual('Ingles: Lectura medio');
});

test('technical requirements object transformer', () => {
  expect(technicalRequirementTransformer({
    obligatoriness: 'EXCLUDING',
    requirement: 'Typescript',
  })).toEqual('Excluyente: Typescript');
});

describe('Process jobOffer helper', () => {
  it('returns on empty fields', () => {
    expect(processJobOffer({
      id: '1',
      position: '',
      stage: 'TECHNICAL',
      status: 'IN_PROCESS',
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      /* @ts-ignore */
      vacancies: null,
      jobModality: '',
    })).toEqual([]);
  });
  it('returns on valid fields', () => {
    expect(processJobOffer({
      id: '1',
      position: 'Intern',
      stage: 'TECHNICAL',
      status: 'IN_PROCESS',
      vacancies: 1,
      workAddress: {
        street: 'Ex Street',
        number: '123',
        comuna: 'Santiago',
        city: 'Santiago',
      },
      jobModality: 'REMOTE',
      technicalRequirements: [{ requirement: 'Typescript', obligatoriness: 'EXCLUDING' }],
      languages: [{
        language: 'Ingles',
        level: 'medio',
        type: 'READING',
      }],
    })).toEqual([
      {
        field: 'Cargo requerido',
        value: 'Intern',
      },
      {
        field: 'Vacantes',
        value: '1',
      },
      {
        field: 'Dirección Laboral',
        value: 'Ex Street 123, Santiago, Santiago',
      },
      {
        field: 'Requisitos técnicos',
        value: 'Excluyente: Typescript',
      },
      {
        field: 'Idiomas',
        value: 'Ingles: Lectura medio',
      },
    ]);
  });
});
