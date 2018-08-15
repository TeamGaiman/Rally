import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ApolloProvider, Query } from 'react-apollo';
import { ApolloLink, ApolloClient } from 'apollo-client-preset';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

import NavBar from './components/NavBar.jsx';
import Main from './views/Main.jsx';
import Login from './views/Login.jsx';
import Signup from './views/Signup.jsx';


import Profile from './components/Profile.jsx';
import Matchmaking from './components/Matchmaking.jsx';
import Stats from './components/Stats.jsx';
import defaultStates from './Apollo/defaultStates';
import { getUserInfo } from './apollo/localQueries.js';
import { addUser } from './Apollo/localQueries';


class Routing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

<<<<<<< HEAD
  componentDidMount() {
    firebase.auth().getRedirectResult()
      .then(result => {
        result.credential
          ? this.setState({ loggedIn: true }) : null;
      });
  }
=======
  
>>>>>>> dev

  render() {


    return (
      <BrowserRouter>
        <div>
          <NavBar loggedIn={this.state.loggedIn} />
          {/* example query */}
          {/* <Query query={getUserInfo}>
            {({ loading, error, data }) => {
              if (error) return <h1>Error...</h1>;
              if (loading || !data) return <h1>Loading...</h1>;

              return <h1>Welcome, {data.currentUser.name}</h1>;
            }}
          </Query> */}
          <Switch>
            <Route exact path="/" render={() => <Main />} />
            <Route exact path="/login" render={() => <Login handleLogin={this.handleLogin} loggedIn={this.state.loggedIn} />} />
            <Route exact path="/signup" render={() => <Signup />} />
            <Route exact path="/matchmaker" render={() => <Matchmaking />} />
            <Route exact path="/profile" render={() => <Profile />} />
            <Route exact path="/stats" render={() => <Stats />} />
          </Switch>
        </div>
      </BrowserRouter>
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
  <ApolloProvider client={client}>
    <Routing />
  </ApolloProvider >,
  document.getElementById('app'));
