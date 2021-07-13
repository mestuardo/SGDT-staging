import { ApolloClient, InMemoryCache, DefaultOptions } from '@apollo/client';

const defaultOptionsFetch: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
  },
  query: {
    fetchPolicy: 'network-only',
  },
};

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_APOLLO_CLIENT_URI,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptionsFetch,
});

export default client;
