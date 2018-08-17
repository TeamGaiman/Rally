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
      googleUser: null
    };
    this.handleLoggedIn = this.handleLoggedIn.bind( this );
    this.updateGoogleUser = this.updateGoogleUser.bind( this );
  }

  handleLoggedIn () {
    this.setState({
      loggedIn: !this.state.loggedIn
    });
  }

  updateGoogleUser(googleUser) {
    this.setState({
      googleUser
    });
  }

  render () {
    return (
      <ApolloProvider client={ this.props.client }>
        {this.state.loggedIn &&
          <NavBar
            loggedIn={ this.state.loggedIn }
            handleLoggedIn={ this.handleLoggedIn }
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
                handleLoggedIn={ this.handleLoggedIn }
                updateGoogleUser= { this.updateGoogleUser }
              />;
            }
          }} />
          <Route path="/signup" render={() =>
            <Signup
              loggedIn={this.state.loggedIn}
              googleUser={this.state.googleUser}
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