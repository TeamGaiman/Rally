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

      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Deuce (Title Pending)
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
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
        </Nav>
      </Navbar>


    );
  }
}


export default NavBar;