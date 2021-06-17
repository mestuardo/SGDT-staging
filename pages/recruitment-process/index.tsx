import React from 'react';
import { Box, Container } from '@material-ui/core';

import { useKeycloak } from '@react-keycloak/ssr';

import type { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js';
import { useQuery } from '@apollo/client';

import Appbar from '../../src/appbar';
import RecruitingView from '../../src/views/recruiter_view';
import LoginWaitingRoom from '../../src/login_waiting_room';
import RECRUITMENT_PROCESS_INDEX_QUERY from '../../src/queries/recruitment-process-index.graphql';
import { RecruitmentProcessData } from '../../src/types/recruitment-process-index-types';

type ParsedToken = KeycloakTokenParsed & {
  email?: string

  preferred_username?: string

  given_name?: string

  family_name?: string
};

export default function Index():JSX.Element {
  // Keycloak instance, recieves parameters from the provider
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed;
  const {
    data, loading, error,
  } = useQuery<RecruitmentProcessData>(
    RECRUITMENT_PROCESS_INDEX_QUERY,
  );
  const [currentData, setCurrentData] = React.useState(data);
  // Data update when we send a new request or delete data
  React.useEffect(() => {
    setCurrentData(data);
  }, [data]);

  if (keycloak?.authenticated || (keycloak && parsedToken)) {
    if (loading) {
      return (
        <>
          <Appbar />
          <Container component="main" maxWidth="lg">
            <LoginWaitingRoom />
            ;
          </Container>
        </>
      );
    }
    if (error) {
      return (
        <>
          <Appbar />
          <Container maxWidth="lg">
            <Box my={4}>
              <div>Ocurrió un error</div>
            </Box>
          </Container>
        </>
      );
    }

    return (
      <>
        <Appbar />
        <Container maxWidth="lg">
          <Box my={4}>
            <RecruitingView
              data={currentData as RecruitmentProcessData}
            />
          </Box>
        </Container>
      </>
    );
  }
  return (
    <>
      <Appbar />
      <Container component="main" maxWidth="lg">
        <LoginWaitingRoom />
        ;
      </Container>
    </>
  );
}
