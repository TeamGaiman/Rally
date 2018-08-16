import React from 'react';
import { Row, Col} from 'react-bootstrap';

const UpcomingMatches = (props) => {
  return (
    <div>
      <h4>Upcoming Matches</h4>
      <Row className="show-grid">
        {props.upcoming.map((match, i) =>
          <Col sm={6} md={3} key={i}>
            {match.participants.b} <br/>
            {match.time} <br/>
            {match.loc} <br/>
          </Col>)}
      </Row>
    </div>
  );
};

export default UpcomingMatches;