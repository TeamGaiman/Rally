import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = (props) => {

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
            {props.loggedIn &&
              // <LinkContainer to='/'>
              <NavItem onClick={props.googleSignOut}>
                    Logout
              </NavItem>
              // </LinkContainer>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};



export default NavBar;