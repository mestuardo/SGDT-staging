import React from 'react';
import { Box } from '@material-ui/core';

import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';
import { useQuery } from '@apollo/client';
import {
  ProfileData,
} from '../../src/types/get-professional-profile-types';
import ParsedTokenType from '../../src/types/keycloak-token-type';

import ProfessionalProfile from '../../src/views/professional_views/professional-profile';
import LoginWaitingRoom from '../../src/login_waiting_room';
import GET_PROFESSIONAL_PROFILE_QUERY from '../../src/queries/get-professional-profile.graphql';
import professionalId from '../../src/global-variables';

interface ProfessionalProfileData {
  getProfessional: ProfileData
}

export default function Index():JSX.Element {
  // Keycloak instance, recieves parameters from the provider
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken = keycloak?.tokenParsed as ParsedTokenType;

  if (keycloak?.authenticated || (keycloak && parsedToken)) {
    const {
      loading, error, data,
    } = useQuery<ProfessionalProfileData>(GET_PROFESSIONAL_PROFILE_QUERY, {
      notifyOnNetworkStatusChange: true,
      variables: {
        getProfessionalProfessionalId: professionalId,
      },
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
    return (
      <>
        {(!loading && data)
          ? (
            <Box my={4}>
              <ProfessionalProfile data={data.getProfessional} />
            </Box>
          )
          : <LoginWaitingRoom />}
      </>
    );
  }
  return (
    <>
      <LoginWaitingRoom />
      ;
    </>
  );
}
