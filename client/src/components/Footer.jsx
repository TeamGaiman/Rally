import React from 'react';
import { Navbar, Image, NavItem, Nav } from 'react-bootstrap';

import RallyLogo from '../../dist/lib/rallyNavbar.png';

const Footer = () => {
  return (
    <Navbar inverse fixedBottom>
      <Navbar.Collapse>
        <Navbar.Text pullRight>
          &copy; <Image src={ RallyLogo } /> 2018
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Footer;