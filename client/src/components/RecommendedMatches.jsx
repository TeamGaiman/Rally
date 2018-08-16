import React from 'react';
import { Table } from 'react-bootstrap';

import matchmakeByElo from '../../../workers/matchmaking.js';

class RecommendedMatches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchedUsers: []
    };
  }

  componentDidMount () {
    let newMatches = matchmakeByElo(2000, this.props.users);
    this.setState({
      matchedUsers: newMatches
    });
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
            { this.state.matchedUsers.map( matchedUser => (
              <tr key={ matchedUser.id }>
                <td>{ matchedUser.name }</td>
                <td>{ matchedUser.phoneNumber }</td>
                <td>{ matchedUser.elo }</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}


export default RecommendedMatches;