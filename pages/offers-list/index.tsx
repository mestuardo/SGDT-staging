import React from 'react';

import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';

import { userIsProfessional } from '../../src/helpers/roles';
import ParsedTokenType from '../../src/types/keycloak-token-type';
import OffersListView from '../../src/views/offers-list';
import NotAllowedView from '../../src/views/not_allowed';
import LoginWaitingRoom from '../../src/login_waiting_room';

export default function Index():JSX.Element {
  // Keycloak instance, recieves parameters from the provider
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken = keycloak?.tokenParsed as ParsedTokenType;
  const isProfessional = parsedToken && userIsProfessional(parsedToken);

  if (keycloak?.authenticated) {
    return isProfessional ? <OffersListView /> : <NotAllowedView />;
  }
  return <LoginWaitingRoom />;
}
