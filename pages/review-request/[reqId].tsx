import React from 'react';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js';
import { useRouter } from 'next/router';
import {
  useQuery,
} from '@apollo/client';
import { RequestDetailType } from '../../src/types/request-query-types';
import REQUEST_DETAILS from '../../src/queries/request-details.graphql';

import LoginWaitingRoom from '../../src/login_waiting_room';
import RequestReviewDetail from '../../src/views/request_review_detail';

type ParsedToken = KeycloakTokenParsed & {
  email?: string
  preferred_username?: string
  given_name?: string
  family_name?: string
};
interface RequestData {
  request: RequestDetailType,
}

export default function Index(): JSX.Element {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed;
  const router = useRouter();
  const { reqId } = router.query;

  React.useEffect(() => {
    setTimeout(() => {
      if (keycloak && !keycloak?.authenticated) {
        window.location.href = keycloak.createLoginUrl();
      }
    }, 5000);
  }, []);

  const { data, loading, error } = useQuery<RequestData>(REQUEST_DETAILS, {
    variables: { getRequestId: reqId },
  });

  // Checks if the usser is logged in an loads the page
  if (keycloak?.authenticated || (keycloak && parsedToken)) {
    if (error) {
      return <div>Ocurrió un error</div>;
    }

    return (
      <>
        {(!loading && data && !router.isFallback) ? (
          <RequestReviewDetail
            requestData={data.request}
          />
        ) : <LoginWaitingRoom />}
      </>
    );
  }

  return <LoginWaitingRoom />;
}
