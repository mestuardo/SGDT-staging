import React from 'react';
import Box from '@material-ui/core/Box';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { useKeycloak } from '@react-keycloak/ssr';

import type { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js';
import { ParsedUrlQuery } from 'querystring';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';
import { DocumentNode } from '@apollo/client';
import client from '../../src/apollo-client';

import Appbar from '../../src/appbar';
import LoginWaitingRoom from '../../src/login_waiting_room';
import PostedAppDetail from '../../src/views/posted_app_card_detail_view';

import CLIENT_INFO from '../../src/queries/client-information.graphql';
import JOB_OFFER_IDS_QUERY from '../../src/queries/job-offers-ids.graphql';
import JOB_OFFER_DETAILS from '../../src/queries/job-offer-details.graphql';

import { JobOfferIdsType, JobOfferDetailType, ClientInformationType } from '../../src/types/job-offer-query-types';

type ParsedToken = KeycloakTokenParsed & {
  email?: string

  preferred_username?: string

  given_name?: string

  family_name?: string
};

export default function Index(props:DataSchema):JSX.Element {
  // This data is received from the getStaticProps function below, function
  // that fetches data at the build time
  // Keycloak instance, recieves parameters from the provider
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed;

  const { reqId, jobOfferData, clientInfo } = props;
  const router = useRouter();
  React.useEffect(() => {
    setTimeout(() => {
      if (keycloak && !keycloak?.authenticated) {
        window.location.href = keycloak.createLoginUrl();
      }
    }, 5000);
  }, []);

  // Checks if the usser is logged in an loads the page
  if (keycloak?.authenticated || (keycloak && parsedToken)) {
    if (router.isFallback) {
      return (
        <>
          <Appbar />
          <Container component="main" maxWidth="lg">
            <LoginWaitingRoom />
            ;
          </Container>
        </>

      );
    }

    return (
      <>
        <Appbar />
        <Container maxWidth="lg">
          <Box my={4}>
            <PostedAppDetail
              reqId={reqId}
              jobOfferData={jobOfferData}
              clientInfo={clientInfo}
            />
          </Box>
        </Container>
      </>
    );
  }

  return (
    <>
      <Appbar />
      <Container component="main" maxWidth="lg">
        <LoginWaitingRoom />
        ;
      </Container>
    </>
  );
}

// This function will get the initial static paths at build time
// the fallback: true option allow the server to build new static paths when needed
// The parms are sent to the getStaticProps function
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<JobOfferIdsType>({
    query: JOB_OFFER_IDS_QUERY as DocumentNode,
  });
  const paths = data.jobOffers.map((jobOffer) => ({
    params: { reqId: jobOffer.id },
  })).slice(0, 3);
  return { paths, fallback: true };
};

interface DataSchema {
  reqId: string,
  jobOfferData: JobOfferDetailType,
  clientInfo: ClientInformationType,
}

interface Params extends ParsedUrlQuery {
  reqId: string
}

interface JobOfferQueryData {
  jobOffer: JobOfferDetailType | null,
}

interface ClientQueryData {
  getClient: ClientInformationType | null,
}

// The params recieved from getStaticPaths will make GetStaticProps fetch
// the required data from the param recieved, in this case is for an posted request id (reqId)
export const getStaticProps: ((context: GetStaticPropsContext<ParsedUrlQuery>) =>
Promise<{ redirect: { destination: string; }; props?: undefined; revalidate?: undefined; } |
{
  props: { reqId: string; jobOfferData: JobOfferDetailType; clientInfo: ClientInformationType; };
  revalidate: number; redirect?: undefined;
}>) = async (context) => {
  const params = context.params as Params;
  const { data: jobOfferData } = await client.query<JobOfferQueryData>({
    query: JOB_OFFER_DETAILS as DocumentNode,
    variables: { getJobOfferId: params.reqId },
    errorPolicy: 'ignore',
  });
  if (!jobOfferData.jobOffer) {
    return {
      redirect: {
        destination: '/recruitment-process',
      },
    };
  }

  const { data: clientData } = await client.query<ClientQueryData>({
    query: CLIENT_INFO as DocumentNode,
    variables: { getClientId: jobOfferData.jobOffer.client },
    errorPolicy: 'ignore',
  });
  if (!clientData.getClient) {
    return {
      redirect: {
        destination: '/recruitment-process',
      },
    };
  }

  return {
    props: {
      reqId: params.reqId,
      jobOfferData: jobOfferData.jobOffer,
      clientInfo: clientData.getClient,
    },
    revalidate: 10,
  };
};

// Extract cookies from AppContext
// eslint-disable-next-line @typescript-eslint/require-await
// KeyCloakProvider.getInitialProps = async (context: AppContext) => ({
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//   cookies: parseCookies(context?.ctx?.req),
// });
