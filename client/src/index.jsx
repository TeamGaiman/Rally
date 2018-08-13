import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Main from './views/Main.jsx';
import Login from './views/Login.jsx';
import Signup from './views/Signup.jsx';
import { ApolloProvider } from 'react-apollo';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloLink} from 'apollo-client-preset';
import {ApolloClient} from 'apollo-client';
import gql from 'graphql-tag';
import {withClientState} from 'apollo-link-state';
import Profile from './components/Profile.jsx';
import Matchmaking from './components/Matchmaking.jsx';
import Stats from './components/Stats.jsx';

class Routing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }
  render() {

    // Set up Cache
    const cache = new InMemoryCache();

    const defaultState = {

    };

    // Set up Local State
    const stateLink = withClientState({
      cache,
      defaults: defaultState,
      resolvers: {
        Mutation: {
          firstMutation
        },
      },
    });

    // Initialize the Apollo Client
    const Client = new ApolloClient({
      link: ApolloLink.from([
        stateLink,
        new HTTPLink({

        })
      ]),
      cache: cache,
    });

    return (
      <BrowserRouter>
        <div>
          <NavBar loggedIn={this.state.loggedIn} />
          <Switch>
            <Route exact path="/" render={() => <Main />} />
            <Route exact path="/login" render={() => <Login />} />
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


ReactDOM.render(
  <ApolloProvider client={Client}>
    <Routing />
  </ApolloProvider >,
  document.getElementById('app'));
