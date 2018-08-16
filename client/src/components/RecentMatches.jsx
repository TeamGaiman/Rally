import React from 'react';
import { Row, Col} from 'react-bootstrap';

const RecentMatches = (props) => {
  return (
    <div>
      <h4>Recent Matches</h4>
      <Row className="show-grid">
        {props.history.map((match, i) =>
          <Col sm={6} md={3} key={i}>
            {match.participants.b} <br/>
            {match.time} <br/>
            {match.loc} <br/>
            {match.results}
          </Col>)}
      </Row>
    </div>
  );
};

export default RecentMatches;