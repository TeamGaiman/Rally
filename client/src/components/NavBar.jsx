import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = (props) => {

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
            <LinkContainer to='/login'>
              <NavItem onClick={props.googleSignOut}>
                Logout
              </NavItem>
            </LinkContainer>
          </Nav>
        }
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;