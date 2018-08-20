import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ApolloLink, ApolloClient } from 'apollo-client-preset';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import defaultStates from './apollo/defaultStates';

const cache = new InMemoryCache();
const stateLink = withClientState({
  cache,
  defaults: defaultStates,
});

const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    new HttpLink({
      uri: '/graphql'
    })
  ]),
  cache: cache,
});

ReactDOM.render(
  <BrowserRouter>
    <App client={ client }/>
  </BrowserRouter>,
  document.getElementById('app')
);
