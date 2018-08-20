import React from 'react';
import { Grid, Row, Col, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Query } from 'react-apollo';
import { SectionsContainer, Section } from 'react-fullpage';

export default (props) => {
  let options = {
    sectionClassName: 'section',
    anchors: ['sectionOne', 'sectionTwo'],
    scrollBar: false,
    navigation: true,
    verticalAlign: false,
    sectionPaddingTop: '20px',
    sectionPaddingBottom: '60px',
    arrowNavigation: true
  };

  return (
    <div>
      <SectionsContainer {...options}>
        <Section className="custom-section splash"></Section>
        <Section>
          <Grid>
            <Row className="show-grid">
              {/* <Col xs={12} md={4} className="text-center">
                <img src={icon1} className="icons"/>
                <h2>Get Matches</h2>
                Get recommended matches from our elo ranking system.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec hendrerit tempor tellus. Donec pretium posuere tellus. Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla posuere.
                <br/>
                <br/>
              </Col>
              <Col xs={12} md={4} className="text-center">
                <img src={icon3} className="icons"/>
                <h2>Get Ranked</h2>
                Compete against other players to get ranked or play a friendly match.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec hendrerit tempor tellus. Donec pretium posuere tellus. Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla posuere.
                <br/>
                <br/>
              </Col>
              <Col xs={12} md={4} className="text-center">
                <img src={icon2} className="icons"/>
                <h2>Courts</h2>
                Find a court and schedule a match at courts nearby.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec hendrerit tempor tellus. Donec pretium posuere tellus. Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla posuere.
                <br/>
                <br/>
              </Col> */}
            </Row>
          </Grid>
        </Section>
      </SectionsContainer>
    </div>
  );
};