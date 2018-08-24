import React from 'react';
import { Table } from 'react-bootstrap';

const UpcomingMatches = (props) => {
  return (
    <div className='profile-tables'>
      <h4>Upcoming Matches</h4>
      {/* <Table striped bordered condensed hover>

        <tbody>
          {props.upcoming.map((match, i) =>
            <tr className='match-row' key={ i } >
              <td>Match {i+1} </td>
              <td>{ match.participants.b }</td>
              <td>{ match.time }</td>
              <td>{ match.loc }</td>
            </tr>
          )}
        </tbody>
      </Table> */}

    </div>
  );
};

export default UpcomingMatches;



