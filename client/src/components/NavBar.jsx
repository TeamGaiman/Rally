import React from 'react';
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

import GoogleIcon from '../../dist/lib/googleIcon.png';
import RallyLogo from '../../dist/lib/rallyNavbar.png';

const NavBar = (props) => {
  return (
    <Navbar inverse collapseOnSelect staticTop className='nav-margin'>
      <Navbar.Header>
        {/* <Navbar.Brand> */}
        {/* <Link to='/'>Rally</Link> */}
        <a href="#home" className="rally-logo">
          <Image src={ RallyLogo } />
        </a>
        {/* </Navbar.Brand> */}
        <Navbar.Toggle />
      </Navbar.Header>

      <Navbar.Collapse>
        { !props.googleUserData || !props.playerData
          ? ( 
            <Nav pullRight>
              <NavItem href="#about">
                About
              </NavItem>
              <LinkContainer to='/signup'>
                <NavItem onClick={ props.googleSignIn }>
                  <Image src={ GoogleIcon } className="google-icon"/>
                  Sign in with Google
                </NavItem>
              </LinkContainer>
            </Nav>
          ) : (
            <Nav pullRight>
              <LinkContainer to='/matchmaking'>
                <NavItem>
                  Matchmaking
                </NavItem>
              </LinkContainer>

              <LinkContainer to='/matches'>
                <NavItem >
                  Matches
                </NavItem>
              </LinkContainer>

              <LinkContainer to='/profile'>
                <NavItem >
                  Profile
                </NavItem>
              </LinkContainer>

              <LinkContainer to='/login'>
                <NavItem onClick={ props.googleSignOut }>
                  Logout
                </NavItem>
              </LinkContainer>

              <Navbar.Brand className="profile-image">
                <Image
                  src={ props.googleUserData.photoURL }
                  circle
                  responsive
                />
              </Navbar.Brand>
            </Nav>
          )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
