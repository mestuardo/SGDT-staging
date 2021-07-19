import React from 'react';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';

import ParsedTokenType from '../../src/types/keycloak-token-type';
import LoginWaitingRoom from '../../src/login_waiting_room';
import RecruitingHeadView from '../../src/views/recruiting_head_view';

export default function Index(): JSX.Element {
  // Keycloak instance, recieves parameters from the provider
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken = keycloak?.tokenParsed as ParsedTokenType;
  return (
    <>

      {keycloak?.authenticated || (keycloak && parsedToken) ? (

        <RecruitingHeadView />

      )
        : (
          <LoginWaitingRoom />

        )}

    </>
  );
}
