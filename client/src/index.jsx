import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Main from './views/Main.jsx';
import Login from './views/Login.jsx';
import Signup from './views/Signup.jsx';
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

  componentDidMount() {
    firebase.auth().getRedirectResult()
      .then(result => {
        result.credential
          ? this.setState({ loggedIn: true }) : null;
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar loggedIn={this.state.loggedIn} />
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


ReactDOM.render(<Routing />, document.getElementById('app'));
