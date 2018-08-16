import React from 'react';
import { Table } from 'react-bootstrap';

class RecommendedMatches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };
  }

  componentDidMount () {
    this.setState({
      matches: this.props.users
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
            {this.state.matches.map(match => (
              <tr key={match.id}>
                <td>{match.name}</td>
                <td>{match.phoneNumber}</td>
                <td>{match.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}


export default RecommendedMatches;