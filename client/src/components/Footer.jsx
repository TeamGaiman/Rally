import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Instagram from '../../dist/lib/instagram.png';
import Twitter from '../../dist/lib/twitter.png';
import Facebook from '../../dist/lib/facebook.png';

const Footer = () => {
  return (
    <footer>
      <a href="https://github.com/TeamGaiman/thesis">
        <img src={ Facebook } 
          className="media-buttons"/> 
        <img src={ Instagram } 
          className="media-buttons"/> 
        <img src={ Twitter } 
          className="media-buttons"/>
      </a>
      <div className="footer-text">
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={4}>
              <div>
                &copy; RALLY 2018
              </div>  
            </Col>
            <Col xs={12} md={4}>
              <a href="https://github.com/TeamGaiman/thesis">
                Contact Us
              </a>
            </Col>
            <Col xs={12} md={4}>
              <a href="https://github.com/TeamGaiman/thesis">
                FAQ
              </a>
            </Col>
          </Row>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;