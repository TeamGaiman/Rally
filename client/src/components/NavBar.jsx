import React from 'react';
import {
  Navbar,
  Nav,
  NavItem

} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Navbar staticTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Rally (Title Pending)</Link>
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
            <LinkContainer to='/signup'>
              <NavItem>
                Sign up
              </NavItem>
            </LinkContainer>
            {/* <NavItem>
              {this.props.loggedIn ? 'Logout' : 'Login'}
            </NavItem> */}
            <LinkContainer to='/login'>
              <NavItem>
                Login
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


export default NavBar;