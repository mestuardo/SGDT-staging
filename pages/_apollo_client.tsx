/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import Container from '@material-ui/core/Container';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';

import theme from '../src/theme';
import Drawer from '../src/drawer';

const clientLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_APOLLO_CLIENT_URI,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(clientLink),
  cache: new InMemoryCache(),
});

interface ApolloComponentProps {
  childComponent: React.ReactNode,
}

export default function ApolloClientComponent(
  { childComponent }: ApolloComponentProps,
): JSX.Element {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();

  React.useEffect(() => {
    localStorage.setItem('token', keycloak?.token ? keycloak.token : '');
  }, [keycloak, keycloak?.token]);

  if (!initialized && keycloak?.token && localStorage.setItem('token', keycloak.token)) {
    return <div>Loading...</div>;
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Drawer>
          <Container component="main" maxWidth="lg">
            <CssBaseline />
            {childComponent}
          </Container>
        </Drawer>
      </ThemeProvider>
    </ApolloProvider>
  );
}
