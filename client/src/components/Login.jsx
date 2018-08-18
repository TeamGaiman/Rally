import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default (props) => {
  return (
    <div className="splash">
      <Navbar inverse collapseOnSelect staticTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Rally</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to='/signup'>
              <NavItem onClick={props.googleSignIn}>
                Sign in with Google
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
