import React from 'react';
import { Table } from 'react-bootstrap';

class RecommendedMatches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [
        {particpantB: 'Acer123', startTime: '2018-08-29 04:00:00', location: 'Central Park'},
        {particpantB: 'TennisPro', startTime: '2019-08-29 04:00:00', location: 'Bryant Park'},
      ]
    };
  }

  getAllMatches() {

  }

  render() {
    return (
      <div>
        <h2>Recommended Matches</h2>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>User</th>
              <th>Date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {this.state.matches.map(match => (
              <tr>
                <td>{match.particpantB}</td>
                <td>{match.startTime}</td>
                <td>{match.location}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}


export default RecommendedMatches;