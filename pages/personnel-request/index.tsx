import React from 'react';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';

import ParsedTokenType from '../../src/types/keycloak-token-type';
import LoginWaitingRoom from '../../src/login_waiting_room';
import RecruitingHeadView from '../../src/views/recruiting_head_view';
import NotAllowedView from '../../src/views/not_allowed';
import { checkIfAllowed } from '../../src/helpers/roles';

export default function Index(): JSX.Element {
  // Keycloak instance, recieves parameters from the provider
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken = keycloak?.tokenParsed as ParsedTokenType;
  const isRecruiterChief = checkIfAllowed(parsedToken, ['recruiterChief']);
  return (
    <>
      {/* eslint-disable-next-line no-nested-ternary */}
      {keycloak?.authenticated || (keycloak && parsedToken) ? (
        isRecruiterChief ? <RecruitingHeadView /> : <NotAllowedView />

      )
        : (
          <LoginWaitingRoom />

        )}

    </>
  );
}
