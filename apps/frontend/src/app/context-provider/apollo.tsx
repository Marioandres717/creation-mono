import { ReactNode, FC } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

type Props = {
  children: ReactNode;
};

const link = createHttpLink({
  uri: process.env.NX_GRAPHQL_URI,
  credentials: 'include',
});

const getCsrfCookie = () => {
  const csrfCookie = document.cookie
    .split('; ')
    .find((row) => row.indexOf('_csrf=') !== -1);
  return csrfCookie ? csrfCookie.split('=')[1] : undefined;
};

const authLink = setContext((_, { headers }) => {
  const csrf = getCsrfCookie();
  return {
    headers: {
      ...headers,
      'csrf-token': csrf ? csrf : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});

const Apollo: FC<Props> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Apollo;
