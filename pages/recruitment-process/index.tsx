import React from 'react';

import { useKeycloak } from '@react-keycloak/ssr';

import type { KeycloakInstance } from 'keycloak-js';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import ParsedTokenType from '../../src/types/keycloak-token-type';
import RecruitingView from '../../src/views/recruiter_view';
import LoginWaitingRoom from '../../src/login_waiting_room';
import RECRUITMENT_PROCESS_INDEX_QUERY from '../../src/queries/recruitment-process-index.graphql';
import { RecruitmentProcessData } from '../../src/types/recruitment-process-index-types';
import NotAllowedView from '../../src/views/not_allowed';
import { userIsProfessional } from '../../src/helpers/roles';

export default function Index():JSX.Element {
  // Keycloak instance, recieves parameters from the provider
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken = keycloak?.tokenParsed as ParsedTokenType;
  const isProfessional = parsedToken && userIsProfessional(parsedToken);
  const {
    data, loading, error,
  } = useQuery<RecruitmentProcessData>(
    RECRUITMENT_PROCESS_INDEX_QUERY, { fetchPolicy: 'network-only' },

  );
  const router = useRouter();
  const { newRequests, postedRequests, closedRequests } = router.query;

  if (keycloak?.authenticated || (keycloak && parsedToken)) {
    if (loading) {
      return <LoginWaitingRoom />;
    }
    if (error) {
      return <div>Ocurrió un error</div>;
    }

    return (
      !isProfessional
        ? (
          <RecruitingView
            data={data as RecruitmentProcessData}
            newRequests={newRequests as string}
            postedRequests={postedRequests as string}
            closedRequests={closedRequests as string}
          />
        )
        : <NotAllowedView />

    );
  }
  return <LoginWaitingRoom />;
}
