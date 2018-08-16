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
    console.log('loggedIn props = ', this.props.loggedIn.toString());
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
          <LinkContainer to='/signup'>
            <NavItem>
              Sign up
            </NavItem>
          </LinkContainer>
          <LinkContainer to='/login'>
            <NavItem onClick={this.props.handleLogin}>
              Login
            </NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar;