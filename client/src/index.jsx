import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ApolloProvider, Query } from 'react-apollo';
import { ApolloLink, ApolloClient } from 'apollo-client-preset';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';

import App from './components/App.jsx';
import defaultStates from './apollo/defaultStates';
import { getUserInfo } from './apollo/localQueries.js';
import { addUser } from './apollo/localQueries';

class Routing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  componentDidMount () {
    firebase.auth().getRedirectResult()
      .then(result => {
        if ( result.credential ) {
          this.setState({ loggedIn: true });
        }
      });
  }

  render () {
    return (
      <div></div>
    );
  }
}

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
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider >
  </BrowserRouter>,
  document.getElementById('app'));
