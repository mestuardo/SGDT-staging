import React from 'react';

import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import ParsedTokenType from '../../src/types/keycloak-token-type';
import { JobOfferDetailType } from '../../src/types/job-offer-query-types';
import JOB_OFFER_DETAILS from '../../src/queries/job-offer-details.graphql';
import LoginWaitingRoom from '../../src/login_waiting_room';
import PostedAppDetail from '../../src/views/posted_app_card_details';
import { userIsProfessional } from '../../src/helpers/roles';
import NotAllowedView from '../../src/views/not_allowed';

interface JobOfferQueryData {
  jobOffer: JobOfferDetailType,
}

export default function Index():JSX.Element {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken = keycloak?.tokenParsed as ParsedTokenType;
  const isProfessional = parsedToken && userIsProfessional(parsedToken);

  const router = useRouter();
  const { reqId } = router.query;
  React.useEffect(() => {
    setTimeout(() => {
      if (keycloak && !keycloak?.authenticated) {
        window.location.href = keycloak.createLoginUrl();
      }
    }, 5000);
  }, []);

  const {
    data: JobOfferData,
    loading: JobOfferLoading,
    error: JobOfferError,
  } = useQuery<JobOfferQueryData>(JOB_OFFER_DETAILS, {
    variables: { getJobOfferId: reqId },
    fetchPolicy: 'network-only',
  });
  // Checks if the usser is logged in an loads the page
  if (keycloak?.authenticated || (keycloak && parsedToken)) {
    if (JobOfferError) {
      return <div>Ha ocurrido un error</div>;
    }
    if (isProfessional) {
      return <NotAllowedView />;
    }

    return (
      <>
        {/* devolver nada si no se es algo aparte de profesional */}
        {(!JobOfferLoading && JobOfferData && !router.isFallback)
          ? (
            <PostedAppDetail
              reqId={reqId as string}
              jobOfferData={JobOfferData?.jobOffer}
            />
          ) : <LoginWaitingRoom />}
      </>
    );
  }

  return <LoginWaitingRoom />;
}
