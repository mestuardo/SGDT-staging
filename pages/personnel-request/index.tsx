import React from 'react';
import { useKeycloak } from '@react-keycloak/ssr';

import type { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js';
import LoginWaitingRoom from '../../src/login_waiting_room';
import RecruitingHeadView from '../../src/views/recruiting_head_view';

type ParsedToken = KeycloakTokenParsed & {
  email?: string

  preferred_username?: string

  given_name?: string

  family_name?: string
};

export default function Index(): JSX.Element {
  // Keycloak instance, recieves parameters from the provider
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed;
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
