import type { KeycloakTokenParsed } from 'keycloak-js';

const checkIfAllowed = (keycloakToken: KeycloakTokenParsed, userRoles: string[]): boolean => {
  if (!keycloakToken || !keycloakToken.realm_access) { return false; }
  const allowedRoles = keycloakToken.realm_access.roles;
  let included = false;
  allowedRoles.forEach((role) => {
    if (role in userRoles) {
      included = true;
    }
  });
  if (included) {
    return true;
  }
  return false;
};

export default checkIfAllowed;
