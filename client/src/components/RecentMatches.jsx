import React from 'react';

import { Table } from 'react-bootstrap';

const RecentMatches = (props) => {
  return (
    <div className='profile-tables'>
      <h4>Recent Matches</h4>
      <Table striped bordered condensed hover>

        <tbody>
          {props.history.map((match, i) =>
            <tr className='match-row' key={ i } >
              <td>Match {i+1} </td>
              <td>{ match.participants.b }</td>
              <td>{ match.time }</td>
              <td>{ match.loc }</td>
              <td>{match.results}</td>
            </tr>
          )}
        </tbody>
      </Table>



      {/* <Row className="show-grid">
        {props.history.map((match, i) =>
          <Col sm={6} md={3} key={i}>
            {match.participants.b} <br/>
            {match.time} <br/>
            {match.loc} <br/>
            {match.results}
          </Col>)}
      </Row> */}
    </div>
  );
};

export default RecentMatches;



{/* <Table striped bordered condensed hover>
  <thead>
    <tr>
      <th>Match1</th>
      <th>Match2</th>
      <th>Match3</th>
    </tr>
  </thead>
  <tbody>
    {props.history.map((match, i) =>
      <tr className='match-row' key={ i } >
        <td>{ match.participants.b }</td>
        <td>{ match.time }</td>
        <td>{ match.loc }</td>
        <td>{match.results}</td>
      </tr>
    )}
  </tbody>
</Table> */}