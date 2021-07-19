import React from 'react';
import Container from '@material-ui/core/Container';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';

import ParsedTokenType from '../src/types/keycloak-token-type';
import LoginView from '../src/login_view';
import LoginWaitingRoom from '../src/login_waiting_room';

export default function Index(): JSX.Element {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken = keycloak?.tokenParsed as ParsedTokenType;
  return (
    <>
      {keycloak?.authenticated || (keycloak && parsedToken) ? (
        <>
          <Container component="main" maxWidth="lg">
            <LoginView />
          </Container>
        </>
      ) : (
        <>
          <Container component="main" maxWidth="lg">

            <LoginWaitingRoom />
          </Container>
        </>
      )}
    </>
  );
}
