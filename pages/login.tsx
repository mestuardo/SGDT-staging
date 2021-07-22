import React from 'react';
import Container from '@material-ui/core/Container';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';
import ParsedTokenType from '../src/types/keycloak-token-type';
import LoginWaitingRoom from '../src/login_waiting_room';
import { userIsProfessional, checkIfAllowed } from '../src/helpers/roles';

export default function Index(): JSX.Element | void {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken = keycloak?.tokenParsed as ParsedTokenType;

  if (keycloak?.authenticated || (keycloak && parsedToken)) {
    const recruiterOrInterRep = checkIfAllowed(parsedToken, ['recruiter', 'internalRepresentative']);
    const recruiterChef = checkIfAllowed(parsedToken, ['recruiterChief']);
    if (process.browser) {
      if (userIsProfessional(parsedToken)) {
        window.location.href = '/offers-list';
      } else if (recruiterOrInterRep) {
        window.location.href = '/recruitment-process';
      } else if (recruiterChef) {
        window.location.href = '/personnel-request';
      }
    }
  }
  return (
    <>
      <Container component="main" maxWidth="lg">
        <LoginWaitingRoom />
      </Container>
    </>
  );
}
