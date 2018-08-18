import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import NavBar from './NavBar.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Profile from './Profile.jsx';
import Matchmaking from './Matchmaking.jsx';
import Stats from './Stats.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      googleUserData: null
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
    firebase.auth().signOut()
      .then( () => {
        console.log( 'Logout successful' );
      })
      .catch( function ( error ) {
        console.log( 'Error logging out from google: ', error );
      });
  }

  handleLoggedIn ( userData ) {
    this.setState( prevState => ({
      loggedIn: true,
      googleUserData: Object.assign( {}, userData )
    }));
  }

  render () {
    return (
      <ApolloProvider client={ this.props.client }>
        {this.state.loggedIn &&
          <NavBar
            loggedIn={ this.state.loggedIn }
            googleSignOut={ this.googleSignOut }
          />}
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
              return <Login
                loggedIn={ this.state.loggedIn }
                googleSignIn={ this.googleSignIn }
                updateGoogleUser= { this.updateGoogleUser }
              />;
            }
          }} />
          <Route path="/signup" render={() =>
            <Signup
              loggedIn={ this.state.loggedIn }
              googleUser={ this.state.googleUser }
            />} 
          />
          <Route path="/matchmaker" render={ () => <Matchmaking /> }/>
          <Route path="/profile" render={ () => <Profile /> }/>
          <Route path="/stats" render={ () => <Stats /> }/>
        </Switch>
      </ApolloProvider>
    );
  }
}

export default App;