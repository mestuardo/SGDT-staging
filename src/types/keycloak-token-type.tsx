import type { KeycloakTokenParsed } from 'keycloak-js';

type ParsedTokenType = KeycloakTokenParsed & {
  email: string
  given_name: string
  family_name: string
  realm_access: { roles: string[] }
};

export default ParsedTokenType;
