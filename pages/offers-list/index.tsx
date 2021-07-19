import React from 'react';
import { Box } from '@material-ui/core';

import { useKeycloak } from '@react-keycloak/ssr';

import type { KeycloakInstance } from 'keycloak-js';
import { useQuery } from '@apollo/client';

import ParsedTokenType from '../../src/types/keycloak-token-type';
import OffersListView from '../../src/views/offers-list';
import LoginWaitingRoom from '../../src/login_waiting_room';
import RECRUITMENT_PROCESS_INDEX_QUERY from '../../src/queries/recruitment-process-index.graphql';
import { RecruitmentProcessData } from '../../src/types/recruitment-process-index-types';

export default function Index():JSX.Element {
  // Keycloak instance, recieves parameters from the provider
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken = keycloak?.tokenParsed as ParsedTokenType;
  const {
    data, loading, error,
  } = useQuery<RecruitmentProcessData>(
    RECRUITMENT_PROCESS_INDEX_QUERY, { fetchPolicy: 'network-only' },

  );

  if (keycloak?.authenticated || (keycloak && parsedToken)) {
    if (loading) {
      return <LoginWaitingRoom />;
    }
    if (error) {
      return (
        <Box my={4}>
          <div>Ocurrió un error</div>
        </Box>
      );
    }

    return <OffersListView />;
  }
  return <LoginWaitingRoom />;
}
