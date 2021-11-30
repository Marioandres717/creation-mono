import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { Authentication } from './app/context-provider/authentication';
import App from './app/app';

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

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Authentication>
          <App />
        </Authentication>
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
