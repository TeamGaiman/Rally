import React from 'react';
import { Table, Button } from 'react-bootstrap';

const Pending = (props) => {
  return (
    <div className='matches-container'>
      <h2>Scheduled Matches</h2>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Opponent</th>
            <th>Date</th>
            <th>Location</th>
            <th>Status</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          { props.playerData.pendingMatches.slice( 0, 5 ).map(( challenge ) => {
            return (
              <tr className='match-row' key={challenge.id}>
                <td>{challenge.participantA}</td>
                <td>{challenge.startTime.split(' GMT')[0]}</td>
                <td>{challenge.location}</td>
                <td>Complete</td>
                <td><Button bsStyle='primary' onClick={() => console.log('clicked')}>Add Results</Button></td>
              </tr>
            );
          }
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Pending;



