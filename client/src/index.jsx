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
import { HttpLink } from 'apollo-link-http';
import { Query } from 'react-apollo';
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
      currentUser: {
        __typename: CurrentUser,
        Username: 'guest'
      }
      
    };

    // Set up Local State
    const stateLink = withClientState({
      cache,
      defaults: defaultState,
      resolvers: {
        Mutation: {
          firstMutation: (_, { username }, { cache }) => {
            cache.writeData({data: { username }});
          }
        },
      },
    });

    // Initialize the Apollo Client
    const Client = new ApolloClient({
      link: ApolloLink.from([
        stateLink,
        new HTTPLink({
          uri: '/graphql'
        })
      ]),
      cache: cache,
    });

    //set basic query
    const getUserQuery = gql `
      query {
        currentUser @ client {
          username
        }
      }
    `;

    return (
      <BrowserRouter>
        <div>
          <NavBar loggedIn={this.state.loggedIn} />
          <Query query={getUserQuery}>
            {({ loading, error, data }) => {
              if (error) return <h1>Error...</h1>;
              if (loading || !data) return <h1>Loading...</h1>;

              return <h1>Welcome, {data.data.currentUser.username}</h1>;
            }}
          </Query>
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
