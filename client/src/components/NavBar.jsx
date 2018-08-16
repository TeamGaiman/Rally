import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);


    this.googleSignOut = this.googleSignOut.bind(this);
  }

  googleSignOut() {
    firebase.auth().signOut()
      .then(() => {
        this.props.handleLoggedIn();
        console.log('Logout successful');
      })
      .catch(function (error) {
        console.log('Error logging out from google: ', error);
      });
  }

  render() {
    console.log('loggedIn props = ', this.props.loggedIn);
    return (
      <Navbar staticTop className="nav">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/"> 🎾 Rally </Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <LinkContainer to='/matchmaker'>
            <NavItem >
              Matchmaker
            </NavItem>
          </LinkContainer>
          <LinkContainer to='/profile'>
            <NavItem >
              Profile
            </NavItem>
          </LinkContainer>
          <LinkContainer to='/stats'>
            <NavItem>
              Stats
            </NavItem>
          </LinkContainer>
          {/* <LinkContainer to='/signup'>
            <NavItem>
              Sign up
            </NavItem>
          </LinkContainer> */}
          {this.props.loggedIn && 
          // <LinkContainer to='/login'>
            <NavItem onClick={this.googleSignOut}>
              Logout
            </NavItem>
          // </LinkContainer>
          }
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar;