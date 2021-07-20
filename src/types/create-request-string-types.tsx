export interface CreateRequestTypeString {
  approxStartDate: Date,
  client: string,
  formationStatus: string,
  internalRep:string,
  levelOfStudies: string,
  languages: { id: string; label: string; language: string; level: string; type: string }[],
  maxSalary: string,
  position: string,
  contractType_1: string,
  possibleDuration_1: string,
  contractType_2: string,
  possibleDuration_2: string,
  contractType_3: string,
  possibleDuration_3: string,
  recruiter: string,
  requestDescription: string,
  requiresComputer: string,
  serviceType: string,
  shiftType: string,
  softSkills: string,
  specialRequirements: string,
  technicalRequirements: { requirement: string, obligatoriness: string }[],
  techReq_1: { requirement: string, obligatoriness: string },
  techReq_2: { requirement: string, obligatoriness: string },
  techReq_3: { requirement: string, obligatoriness: string },
  techReq_4: { requirement: string, obligatoriness: string },
  techReq_5: { requirement: string, obligatoriness: string },
  techReq_6: { requirement: string, obligatoriness: string },
  techReq_7: { requirement: string, obligatoriness: string },
  techReq_8: { requirement: string, obligatoriness: string },
  techReq_9: { requirement: string, obligatoriness: string },
  techReq_10: { requirement: string, obligatoriness: string },
  vacancies: string,
  workAdress_city: string,
  workAdress_district: string,
  workAdress_street: string,
  workAdress_number: string,
  yearsExperience: string,
  [key: string]:string | Date |
  { id: string; label: string; language: string; level: string; type: string }[] |
  { requirement: string, obligatoriness: string }[] |
  { requirement: string, obligatoriness: string }
}
