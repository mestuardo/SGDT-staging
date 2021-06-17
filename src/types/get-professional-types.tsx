export interface GetProfessionalType {
  id: string,
  name: string,
  firstSurname: string,
  secondSurname: string,
  rut: string,
  specialty: string,
  currentJob: string,
  savedJobOffers: string[],
}

export interface ProfessionalData {
  professional: GetProfessionalType,
}
