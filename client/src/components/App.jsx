import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ApolloProvider, Query } from 'react-apollo';

import NavBar from './NavBar.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Profile from './Profile.jsx';
import Matchmaking from './Matchmaking.jsx';
import Stats from './Stats.jsx';
import { CHECK_EMAIL_IS_UNIQUE } from '../apollo/queries.js';

const CheckEmail = ( input ) => {
  return (
    <Query query={ CHECK_EMAIL_IS_UNIQUE }
      variables={ input }
      fetchPolicy='no-cache'>
      {({ loading, error, data }) => {
        if ( loading ) {
          console.log('loading...');
          return null;
        }
        if ( error ) {
          console.log( error );
          return null;
        }
        let result = data.checkEmailIsUnique || false;
        if ( result === false ) {
          console.log('Welcome back!');
          return result;
        }
        return null;
      }}
    </Query>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      googleUserData: null,
      userProfile: null,
      playerData: null,
      firstVisit: true
    };

    this.authListener = this.authListener.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.googleSignOut = this.googleSignOut.bind(this);
    this.mapGoogleDataToProfile = this.mapGoogleDataToProfile.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  /* --- GOOGLE AUTH FUNCTIONS --- */
  authListener() {
    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.setState({
          googleUserData: Object.assign( {}, user.providerData[0] )
        });
        console.log('Session found for user: ', user.providerData[0]);
      } else {
        this.setState({
          googleUserData: null
        });
        console.log('Session ended for user.');
      }
    });
  }
  googleSignIn () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup( provider )
      .then(() => {
        return;
      })
      .catch((err) => {
        console.log('Error signing in: ', err);
      });
  }
  googleSignOut () {
    this.setState({ googleUserData: null });
    firebase.auth().signOut()
      .then(() => {
        return;
      })
      .catch( ( err ) => {
        console.log( 'Error logging out from google: ', err );
      });
  }

  /* --- ACCOUNT CREATION --- */
  mapGoogleDataToProfile () {
    this.setState({
      userProfile: {
        fullName: this.state.googleUserData.displayName,
        email: this.state.googleUserData.email,
        phoneNumber: this.state.googleUserData.phoneNumber
      }
    });
  }

  checkForNewUser () {
    console.log('hi');
  }

  render () {
    return (
      <ApolloProvider client={ this.props.client }>
        {/* {this.checkForNewUser()} */}
        {( this.state.googleUserData !== null && this.state.firstVisit )
          ? CheckEmail({ email: this.state.googleUserData.email }) : null }
        <NavBar
          googleSignOut={ this.googleSignOut }
          googleSignIn={ this.googleSignIn }
          googleUserData={ this.state.googleUserData }
        />
        <Switch>
          <Route exact path="/" render={ () => {
            if ( this.state.googleUserData ) {
              return <Redirect to="/matchmaker" />;
            } else {
              return <Redirect to="/login" />;
            }
          }} />
          <Route path="/login" render={ () => {
            if ( this.state.googleUserData ) {
              return <Redirect to="/matchmaker"/>;
            } else {
              return <Login
                googleSignIn={ this.googleSignIn }
              />;
            }
          }} />
          <Route path="/signup" render={() =>
            <Signup
              googleUserData={ this.state.googleUserData }
              mapGoogleDataToProfile={ this.mapGoogleDataToProfile }
            />} 
          />
          <Route path="/matchmaker" render={ () => <Matchmaking mapGoogleDataToProfile={ this.mapGoogleDataToProfile }/>
          }/>
          <Route path="/profile" render={ () => <Profile/> }/>
          <Route path="/stats" render={ () => <Stats/> }/>
        </Switch>
      </ApolloProvider>
    );
  }
}

export default App;