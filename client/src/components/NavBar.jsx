import React from 'react';
import { Navbar, Nav, NavItem, Image, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  props.googleUserData ? console.log(props.googleUserData.profile) : null
  return (
    <Navbar inverse collapseOnSelect staticTop
      style={props.loggedIn ? null : { marginBottom: '0' }}
    >
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Rally</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        {!props.loggedIn ?
          <Nav pullRight>
            <LinkContainer to='/signup'>
              <NavItem onClick={props.googleSignIn}>
                Sign in with Google
              </NavItem>
            </LinkContainer>
          </Nav>
          :
          <Nav pullRight>
            <LinkContainer to='/matchmaker'>
              <NavItem >
                Matchmaking
              </NavItem>
            </LinkContainer>
            {/* <LinkContainer to='/login'>
              <NavItem onClick={props.googleSignOut}>
              Logout
              </NavItem>
            </LinkContainer> */}
            <NavDropdown eventKey={3} title={props.googleUserData.profile.given_name} id="basic-nav-dropdown">
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
              <MenuItem divider />
              <LinkContainer to='/login'>
                <NavItem onClick={props.googleSignOut}>
                  Logout
                </NavItem>
              </LinkContainer>
            </NavDropdown>
            <Navbar.Brand className="profile-image">
              <Image
                src={props.googleUserData.profile.picture}

                circle
                responsive
              />
            </Navbar.Brand>
          </Nav>
        }
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;