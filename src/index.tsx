import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import { MaterialTailwindControllerProvider } from './contexts/index';
import { ThemeProvider } from '@material-tailwind/react';
import './styles/index.css';

const client = new ApolloClient({
  uri: 'http://localhost:5000',
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
            <App />
          </ApolloProvider>
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
