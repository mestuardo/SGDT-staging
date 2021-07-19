import React from 'react';
import Head from 'next/head';
import { AppProps, AppContext } from 'next/app';
import { SSRKeycloakProvider, SSRCookies } from '@react-keycloak/ssr';
import type { KeycloakConfig } from 'keycloak-js';
import cookie from 'cookie';
import type { IncomingMessage } from 'http';

import ApolloClientComponent from './_apollo_client';

interface InitialProps {
  cookies: unknown
}
const keycloakCfg: KeycloakConfig = {
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM as string,
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENTID as string,
};

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps): JSX.Element {
  /* eslint-disable react/jsx-props-no-spreading */
  /* eslint-disable @typescript-eslint/no-non-null-assertion */

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <SSRKeycloakProvider
      keycloakConfig={keycloakCfg}
      persistor={SSRCookies(cookies)}
    >
      <Head>
        <title>SGDT</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ApolloClientComponent
        childComponent={<Component {...pageProps} />}
      />
    </SSRKeycloakProvider>
  );
}

function parseCookies(req?: IncomingMessage) {
  if (!req || !req.headers) {
    return {};
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return cookie.parse(req.headers.cookie || '');
}

// Extract cookies from AppContext
// eslint-disable-next-line @typescript-eslint/require-await
MyApp.getInitialProps = async (context: AppContext) => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  cookies: parseCookies(context?.ctx?.req),
});

export default MyApp;
