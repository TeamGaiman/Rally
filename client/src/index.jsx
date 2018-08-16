import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, Query } from 'react-apollo';
import { ApolloLink, ApolloClient } from 'apollo-client-preset';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import defaultStates from './apollo/defaultStates';
import { getUserInfo, addUser } from './apollo/localQueries.js';

// Set up Cache
const cache = new InMemoryCache();

// Set up Local State
const stateLink = withClientState({
  cache,
  defaults: defaultStates,
  //still working on resolvers/mutations part of this function, but it doesn't break anything 
  resolvers: {
    Mutation: {
      addUser: (_, { id, name, fullName, email, phoneNumber, wins, losses, elo, tier, joinDate, userNumber}, { cache }) => {
        console.log('Mutation: ');
        cache.writeData({ query, data });
      }
    },
  },
});

// Initialize the Apollo Client
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
    <App client={client}/>
  </BrowserRouter>,
  document.getElementById('app')
);
