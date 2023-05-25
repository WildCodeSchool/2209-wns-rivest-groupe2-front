import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './styles/index.css';
import App from './App';
import { MaterialTailwindControllerProvider } from './contexts/index';
import { ThemeProvider } from '@material-tailwind/react';
import './styles/index.css';
import { UserProvider } from 'src/contexts/userContext';
import { FavoriteRateProvider } from './contexts/favoriteRateContext';

// AUTHENTICATION APOLLO - HEADER
// https://www.apollographql.com/docs/react/networking/authentication/

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? '/graphql'
      : 'http://localhost:5000',
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
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <ApolloProvider client={client}>
          <FavoriteRateProvider>
            <UserProvider>
              <App />
            </UserProvider>
            </FavoriteRateProvider>
          </ApolloProvider>
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
