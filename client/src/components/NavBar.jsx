import React from 'react';
import {
  Navbar,
  Nav,
  NavItem

} from 'react-bootstrap';


class NavBar extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (

      <Navbar staticTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Deuce (Title Pending)</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem >
              Matchmaker
            </NavItem>
            <NavItem >
              Profile
            </NavItem>
            <NavItem>
              Badges
            </NavItem>
            <NavItem>
              {this.props.loggedIn ? 'Logout' : 'Login'}
            </NavItem>
            <NavItem>
              Sign up
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>


    );
  }
}


export default NavBar;