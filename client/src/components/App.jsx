import React from 'react';
import NavBar from './NavBar.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Profile from './Profile.jsx';
import Matchmaking from './Matchmaking.jsx';
import Stats from './Stats.jsx';
import { Route, Switch, Redirect } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };

    this.handleLoggedIn = this.handleLoggedIn.bind(this);
  }

  componentDidMount () {
    // firebase.auth().getRedirectResult()
    //   .then(result => {
    //     if ( result.credential ) {
    //       this.setState({ loggedIn: true });
    //     }
    //   });
  }

  handleLoggedIn() {
    this.setState({
      loggedIn: !this.state.loggedIn
    });
  }

  render() {
    return (
      <div>
        <div>
          {this.state.loggedIn &&
            <NavBar
              loggedIn={this.state.loggedIn}
              handleLoggedIn={this.handleLoggedIn}
            />}
          <Switch>
            <Route exact path="/" render={() => {
              if (this.state.loggedIn) {
                return <Redirect to="/matchmaker" />;
              } else {
                return <Redirect to="/login" />;
              }
            }} />
            <Route path="/login" render={() => {
              if (this.state.loggedIn) {
                return <Redirect to="/matchmaker" />;
              } else {
                return <Login
                  loggedIn={this.state.loggedIn}
                  handleLoggedIn={this.handleLoggedIn}
                />;
              }
            }} />
            <Route path="/signup" render={() => <Signup />} />
            <Route path="/matchmaker" render={() => <Matchmaking />} />
            <Route path="/profile" render={() => <Profile />} />
            <Route path="/stats" render={() => <Stats />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;