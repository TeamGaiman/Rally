import React from 'react';
import { Table, Modal, Button } from 'react-bootstrap';

class RecommendedMatches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [
        {particpantB: 'Acer123', startTime: '2018-08-29 04:00:00', location: 'Central Park', id: 1},
        {particpantB: 'TennisPro', startTime: '2019-08-29 04:00:00', location: 'Bryant Park', id: 2},
      ],
      matchClick: false,
      matchClickId: null,
    };

    this.handleMatchClick = this.handleMatchClick.bind(this);
    this.handleAcceptMatch = this.handleAcceptMatch.bind(this);
    this.handleDeclineMatch = this.handleDeclineMatch.bind(this);
  }

  handleMatchClick(id) {
    console.log('CLICKED??', id);
    this.setState({
      matchClick: true,
      matchClickId: id
    });
  }

  handleAcceptMatch() {
    this.setState({ matchClick: false });
  }
  
  handleDeclineMatch() {
    this.setState({ matchClick: false });

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
              <tr key={ match.id } onClick={ () => this.handleMatchClick( match.id ) }>
                <td>{ match.particpantB }</td>
                <td>{ match.startTime }</td>
                <td>{ match.location }</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {this.state.matchClick ? 
          <div className="static-modal">
            <Modal.Dialog className="modal">
              <Modal.Header>
                <Modal.Title>Accept Challenge?</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button onClick={ this.handleDeclineMatch }>Decline</Button>
                <Button bsStyle="primary" onClick={ this.handleAcceptMatch }>Accept</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
          : null}
      </div>
    );
  }
}


export default RecommendedMatches;