import type { KeycloakTokenParsed } from 'keycloak-js';

export const checkIfAllowed = (
  keycloakToken: KeycloakTokenParsed,
  userRoles: string[],
): boolean => {
  if (!keycloakToken || !keycloakToken.realm_access) { return false; }
  const allowedRoles = keycloakToken.realm_access.roles;
  let included = false;
  allowedRoles.forEach((role) => {
    if (userRoles.includes(role)) {
      included = true;
    }
  });
  if (included) {
    return true;
  }
  return false;
};

export const userIsProfessional = (keycloakToken: KeycloakTokenParsed): boolean => (!checkIfAllowed(keycloakToken, ['recruiter', 'recruiterChief', 'internalRepresentative']));
