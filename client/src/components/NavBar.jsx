import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);


    this.googleSignOut = this.googleSignOut.bind(this);
  }

  googleSignOut () {
    this.props.handleLoggedIn();
    
    firebase.auth().signOut()
      .then( () => {
        console.log( 'Logout successful' );
      })
      .catch( function ( error ) {
        console.log( 'Error logging out from google: ', error );
      });
  }

  render () {
    console.log( 'loggedIn props = ', this.props.loggedIn );
    return (
      <div>
        <Navbar inverse collapseOnSelect staticTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Rally</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
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
              // <LinkContainer to='/'>
              <NavItem onClick={this.googleSignOut}>
                    Logout
              </NavItem>
              // </LinkContainer>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;