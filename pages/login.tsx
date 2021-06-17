import React from 'react';
import Container from '@material-ui/core/Container';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js';
import Appbar from '../src/appbar';
import LoginView from '../src/login_view';
import LoginWaitingRoom from '../src/login_waiting_room';

type ParsedToken = KeycloakTokenParsed & {
  email?: string

  preferred_username?: string

  given_name?: string

  family_name?: string
};

export default function Index(): JSX.Element {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed;
  return (
    <>
      {keycloak?.authenticated || (keycloak && parsedToken) ? (
        <>
          <Appbar />
          <Container component="main" maxWidth="xs">
            <LoginView />
          </Container>
        </>
      ) : (
        <>
          <Appbar />
          <Container component="main" maxWidth="xs">

            <LoginWaitingRoom />
          </Container>
        </>
      )}
    </>
  );
}
