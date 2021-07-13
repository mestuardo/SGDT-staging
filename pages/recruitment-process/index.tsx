import React from 'react';

import { useKeycloak } from '@react-keycloak/ssr';

import type { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js';
import { useQuery } from '@apollo/client';

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
    RECRUITMENT_PROCESS_INDEX_QUERY, { fetchPolicy: 'network-only' },

  );

  if (keycloak?.authenticated || (keycloak && parsedToken)) {
    if (loading) {
      return <LoginWaitingRoom />;
    }
    if (error) {
      return <div>Ocurrió un error</div>;
    }

    return (
      <RecruitingView
        data={data as RecruitmentProcessData}
      />
    );
  }
  return <LoginWaitingRoom />;
}
