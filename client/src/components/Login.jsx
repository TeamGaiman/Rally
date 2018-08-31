import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { SectionsContainer, Section } from 'react-fullpage';

import icon1 from '../../dist/lib/icon1.png';
import icon2 from '../../dist/lib/icon2.png';
import icon3 from '../../dist/lib/icon3.png';

const Login = (props) => {

  let options = {
    sectionClassName: 'section',
    anchors: [ 'home', 'about' ],
    scrollBar: false,
    navigation: true,
    verticalAlign: false,
    sectionPaddingTop: '20px',
    sectionPaddingBottom: '60px',
    arrowNavigation: true
  };

  return (
    <div>
      <SectionsContainer { ...options }>
        <Section className="custom-section splash"></Section>
        <Section>
          <Grid>
            <Row className="show-grid">
              <Col xs={ 12 } md={ 4 } className="text-center">
                <img src={ icon1 } className="icons"/>
                <h2>Get Matches</h2>
                Connect with players that are nearby and skill-appropriate opponents based on Rally's matchmaking algorithm. Find courts and schedule matches at your preferred time and venue.
                <br/>
                <br/>
              </Col>
              <Col xs={ 12 } md={ 4 } className="text-center">
                <img src={ icon3 } className="icons"/>
                <h2>Get Ranked</h2>
                Choose a starting skill tier that applies to your playing ability. When you and your opponents record wins and losses Rally will adjust your skill level progression accordingly. Move on to the next tier when you've proven your skills and are ready for new challenges!
                <br/>
                <br/>
              </Col>
              <Col xs={ 12 } md={ 4 } className="text-center">
                <img src={ icon2 } className="icons"/>
                <h2>Courts</h2>
                Choose courts from Rally's expanding database of nearby tennis courts that include hard surface, clay surface and all-weather clay surfaces.
                <br/>
                <br/>
              </Col>
            </Row>
          </Grid>
        </Section>
      </SectionsContainer>
    </div>
  );
};

export default Login;
