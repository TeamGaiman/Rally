import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ApolloProvider, Query } from 'react-apollo';

import NavBar from './NavBar.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import ProfileView from './ProfileView.jsx';
import MatchmakingView from './MatchmakingView.jsx';
import MatchesView from './MatchesView.jsx';
import { CHECK_EMAIL_IS_UNIQUE, GET_USER_BY_EMAIL, GET_USER_PROFILE_DATA } from '../apollo/queries.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      googleUserData: null,
      playerData: null
    };

    this.authListener = this.authListener.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.googleSignOut = this.googleSignOut.bind(this);
    this.mapDBPlayerDataToState = this.mapDBPlayerDataToState.bind(this);
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
      } else {
        this.setState({
          googleUserData: null
        });
      }
    });
  }
  googleSignIn () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect( provider )
      .then( () => {
        return;
      })
      .catch( (err) => {
        console.error( err );
      });
  }
  googleSignOut () {
    this.setState({
      googleUserData: null
    });
    firebase.auth().signOut()
      .then( () => {
        return;
      })
      .catch( ( err ) => {
        console.error( err );
      });
  }

  /* --- UPDATING USER INFO FROM DB --- */
  mapDBPlayerDataToState ( dbData ) {
    this.setState({
      playerData: dbData
    });
  }

  render () {
    return (
      <ApolloProvider client={ this.props.client }>
        <NavBar
          googleSignOut={ this.googleSignOut }
          googleSignIn={ this.googleSignIn }
          googleUserData={ this.state.googleUserData }
          playerData={ this.state.playerData }
        />
        <Switch>
          <Route exact path='/' render={ () => {
            if ( this.state.googleUserData ) {
              return <Redirect to='/signup'/>;
            } else {
              return <Redirect to='/login' />;
            }
          }}/>
          <Route path='/login' render={ () => {
            if ( this.state.googleUserData ) {
              return <Redirect to='/signup'/>;
            } else {
              return <Login googleSignIn={ this.googleSignIn }/>;
            }
          }}/>
          <Route path='/signup' render={ () => {
            { if ( this.state.googleUserData ) {
              return (
                <Query
                  query={ CHECK_EMAIL_IS_UNIQUE }
                  variables={{ email: this.state.googleUserData.email }}
                  fetchPolicy='no-cache'
                >
                  {({ loading, error, data }) => {
                    if ( loading ) { return <p>Loading...</p>; }
                    if ( error ) { return <p>Error! ${ error }</p>; }
                    let result = data.checkEmailIsUnique || false;
                    if ( result === false ) {
                      return <Redirect to='/matchmaking'/>;
                    } else {
                      return <Signup
                        googleUserData={ this.state.googleUserData }
                        mapGoogleDataToProfile={ this.mapGoogleDataToProfile }
                      />;
                    }
                  }}
                </Query>
              );
            } else {
              return null;
            } }
          }}/>
          <Route path='/matchmaking' render={ () => (
            <Query
              query={ GET_USER_BY_EMAIL }
              variables={{ email: this.state.googleUserData.email }}
              pollInterval={ 500 }
            >
              {({ loading, error, data }) => {
                if ( loading ) { return <p>Loading...</p>; }
                if ( error ) { return <p>Error! ${ error }</p>; }
                let time = new Date;
                return <MatchmakingView
                  playerData = { data.getUserByEmail }
                  dbPlayerData={ data.getUserByEmail } 
                  mapGoogleDataToProfile={ this.mapGoogleDataToProfile }
                  mapDBPlayerDataToState={ this.mapDBPlayerDataToState }
                />;
              }}
            </Query>
          )}/>
          <Route path='/matches' render={ () =>
            <MatchesView
              googleUserData={ this.state.googleUserData }
              playerData={ this.state.playerData }
            />
          }/>;
          <Route path='/profile' render={ () =>
            <Query
              query={ GET_USER_PROFILE_DATA }
              variables={{ email: this.state.googleUserData.email }}
              pollInterval={ 500 }
            >
              {({ loading, error, data }) => {
                if ( loading ) { return <p>Loading...</p>; }
                if ( error ) { return <p>Error! ${ error }</p>; }
                return <ProfileView 
                  googleUserData={ this.state.googleUserData }
                  playerData={ data.getUserByEmail }
                />;
              }}
            </Query>
          }/>
        </Switch>
      </ApolloProvider>
    );
  }
}

export default App;
