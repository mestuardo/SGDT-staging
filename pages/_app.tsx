import React from 'react';
import Head from 'next/head';
import { AppProps, AppContext } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SSRKeycloakProvider, SSRCookies } from '@react-keycloak/ssr';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import type { KeycloakConfig } from 'keycloak-js';
import cookie from 'cookie';
import type { IncomingMessage } from 'http';
import Container from '@material-ui/core/Container';
import theme from '../src/theme';
import Drawer from '../src/drawer';

const keycloakCfg: KeycloakConfig = {
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM as string,
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENTID as string,
};
interface InitialProps {
  cookies: unknown
}

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_APOLLO_CLIENT_URI,
  cache: new InMemoryCache(),
});

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

    <ApolloProvider client={client}>
      <Head>
        <title>SGDT</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <SSRKeycloakProvider
        keycloakConfig={keycloakCfg}
        persistor={SSRCookies(cookies)}
      >
        <ThemeProvider theme={theme}>
          <Drawer window2={() => new Window()}>
            <Container component="main" maxWidth="lg">
              <CssBaseline />
              <Component {...pageProps} />
            </Container>
          </Drawer>
        </ThemeProvider>
      </SSRKeycloakProvider>
    </ApolloProvider>
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
