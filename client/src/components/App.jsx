import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ApolloProvider, Query } from 'react-apollo';

import NavBar from './NavBar.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Profile from './Profile.jsx';
import Matchmaking from './Matchmaking.jsx';
import Stats from './Stats.jsx';
import { CHECK_EMAIL_IS_UNIQUE } from '../apollo/localQueries.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      googleUserData: {
        profile: {
          email: ''
        }
      }
    };
    this.googleSignIn = this.googleSignIn.bind( this );
    this.handleLoggedIn = this.handleLoggedIn.bind( this );
    this.googleSignOut = this.googleSignOut.bind( this );
  }

  googleSignIn () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup( provider )
      .then(( result ) => {
        this.handleLoggedIn( result.additionalUserInfo );
      });
  }

  googleSignOut () {
    this.handleLoggedIn();
    this.setState({ loggedIn: false });
    firebase.auth().signOut()
      .then( () => {
        console.log( 'Logout successful' );
      })
      .catch( function ( error ) {
        console.log( 'Error logging out from google: ', error );
      });
  }

  handleLoggedIn ( userData ) {
    this.setState({
      loggedIn: true,
      googleUserData: Object.assign( {}, userData )
    });
  }

  render () {
    return (
      <ApolloProvider client={this.props.client}>
        <NavBar
          loggedIn={this.state.loggedIn}
          googleSignOut={this.googleSignOut}
          googleSignIn={this.googleSignIn}
        />
        <Switch>
          <Route exact path="/" render={ () => {
            if ( this.state.loggedIn ) {
              return <Redirect to="/matchmaker" />;
            } else {
              return <Redirect to="/login" />;
            }
          }}/>
          <Route path="/login" render={ () => {
            if ( this.state.loggedIn ) {
              return <Redirect to="/matchmaker" />;
            } else {
              return <Login/>;
            }
          }} />
          <Route path="/signup" render={() =>
            <Signup
              loggedIn={ this.state.loggedIn }
              googleUserData={ this.state.googleUserData }
            />} 
          />
          <Query query={ CHECK_EMAIL_IS_UNIQUE }
            variables={{ email: this.state.googleUserData.profile.email }}>
            {( { loading, error, data } ) => {
              if ( loading ) {
                return <p>Loading...</p>;
              } else if ( error ) {
                return <p>Error</p>;
              }
              return (
                <div>
                  {console.log(data)}
                  <Route path="/matchmaker" render={ () =>
                    <Matchmaking /> }/>
                </div>
              );
            }}
          </Query>
          <Route path="/profile" render={ () => <Profile /> }/>
          <Route path="/stats" render={ () => <Stats /> }/>
        </Switch>
      </ApolloProvider>
    );
  }
}

export default App;