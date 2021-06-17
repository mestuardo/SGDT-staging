import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { useKeycloak } from '@react-keycloak/ssr';

import type { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js';
import Appbar from '../../src/appbar';
import LoginWaitingRoom from '../../src/login_waiting_room';
import RecruitingHeadView from '../../src/views/recruiting_head_view';

type ParsedToken = KeycloakTokenParsed & {
  email?: string

  preferred_username?: string

  given_name?: string

  family_name?: string
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Todos los derechos reservados © '}
      SDGT
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

export default function Index(): JSX.Element {
  // Keycloak instance, recieves parameters from the provider
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed;
  return (
    <>

      {keycloak?.authenticated || (keycloak && parsedToken) ? (
        <>
          <Appbar />
          <Container component="main" maxWidth="lg">

            <RecruitingHeadView />
          </Container>
        </>
      )
        : (
          <>
            <Appbar />
            <Container component="main" maxWidth="lg">

              <LoginWaitingRoom />
            </Container>
          </>
        )}

      <Box mt={3}>
        <Copyright />
      </Box>
    </>
  );
}
