export interface GetClientDetails {
  id: string,
  tradeName: string,
  name: string

}

export interface GetExternalRepDetails {
  id: string,
  firstSurname: string,
  secondSurname: string,
  name: string

}

export interface GetClientDetailsArray {
  clients: GetClientDetails[]
}

export interface GetExternalRepDetailsArray {
  externalRepresentatives: GetExternalRepDetails[]
}
