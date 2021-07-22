import React from 'react';
import { Box } from '@material-ui/core';

import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';
import { useQuery } from '@apollo/client';
import {
  ProfileData,
} from '../../src/types/get-professional-profile-types';
import ParsedTokenType from '../../src/types/keycloak-token-type';
import { userIsProfessional } from '../../src/helpers/roles';

import ProfessionalProfile from '../../src/views/professional_views/professional-profile';
import NotAllowedView from '../../src/views/not_allowed';
import LoginWaitingRoom from '../../src/login_waiting_room';
import GET_PROFESSIONAL_PROFILE_QUERY from '../../src/queries/get-professional-profile.graphql';

interface ProfessionalProfileData {
  getCurrentProfessional: ProfileData
}

export default function Index():JSX.Element {
  // Keycloak instance, recieves parameters from the provider
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken = keycloak?.tokenParsed as ParsedTokenType;
  const isProfessional = parsedToken && userIsProfessional(parsedToken);

  if (keycloak?.authenticated) {
    if (!isProfessional) {
      return <NotAllowedView />;
    }
    const {
      loading, error, data,
    } = useQuery<ProfessionalProfileData>(GET_PROFESSIONAL_PROFILE_QUERY, {
      notifyOnNetworkStatusChange: true,
    });
    if (loading) {
      return (
        <>
          <LoginWaitingRoom />
          ;
        </>
      );
    }
    if (error) {
      return (
        <>
          <Box my={4}>
            <div>{error.message}</div>
          </Box>
        </>
      );
    }
    if (!loading && data) {
      localStorage.setItem('professionalId', data.getCurrentProfessional.id ? data.getCurrentProfessional.id : '');
      return (
        <>
          {(!loading && data)
            ? (
              <Box my={4}>
                <ProfessionalProfile data={data.getCurrentProfessional} />
              </Box>
            )
            : <LoginWaitingRoom />}
        </>
      );
    }
  }
  return (
    <>
      <LoginWaitingRoom />
      ;
    </>
  );
}
