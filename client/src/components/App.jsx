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
  }

  render() {
    return (
      <div>
        <div>
          <NavBar loggedIn={ this.state.loggedIn } />
          {/* example query */}
          {/* <Query query={getUserInfo}>
            {({ loading, error, data }) => {
              if (error) return <h1>Error...</h1>;
              if (loading || !data) return <h1>Loading...</h1>;

              return <h1>Welcome, {data.currentUser.name}</h1>;
            }}
          </Query> */}
          <Switch>
            <Route exact path="/" render={ () =>
              <Redirect to="/matchmaker"/> } />
            <Route exact path="/login" render={ () =>
              <Login
                loggedIn={ this.state.loggedIn } /> }/>
            <Route exact path="/signup" render={() => <Signup />} />
            <Route exact path="/matchmaker" render={() => <Matchmaking />} />
            <Route exact path="/profile" render={() => <Profile />} />
            <Route exact path="/stats" render={() => <Stats />} />
          </Switch>
        </div>
      </div>
    );
  }
}


export default App;