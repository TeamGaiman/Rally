import React from 'react';
import { Table, Modal, Button } from 'react-bootstrap';

class Challenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [
        {particpantB: 'TopSpin1', startTime: '2018-010-29 04:00:00', location: 'Battery Park', id: 1},
        {particpantB: 'DeuceLove', startTime: '2019-010-29 05:00:00', location: 'Sunset Park', id: 2},
        {particpantB: 'SliceMaster55', startTime: '2019-010-29 06:00:00', location: 'Sunset Park', id: 3},
        {particpantB: 'TopSpin1', startTime: '2018-010-29 04:00:00', location: 'Battery Park', id: 4},
        {particpantB: 'DeuceLove', startTime: '2019-010-29 05:00:00', location: 'Sunset Park', id: 5},
        {particpantB: 'SliceMaster55', startTime: '2019-010-29 06:00:00', location: 'Sunset Park', id: 6},
      ],
      matchClick: false,
      matchClickId: null,
    };

    this.handleMatchClick = this.handleMatchClick.bind(this);
    this.handleAcceptMatch = this.handleAcceptMatch.bind(this);
    this.handleDeclineMatch = this.handleDeclineMatch.bind(this);
  }

  getAllChallenges() {

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
        <h2>Challenges</h2>
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
              <tr key={ match.id } onClick={ () => this.handleMatchClick( match.id ) } style={{ cursor: 'pointer' }}>
                <td>{ match.particpantB }</td>
                <td>{ match.startTime }</td>
                <td>{ match.location }</td>
              </tr>
            ))}
          </tbody>
        </Table>

        { this.state.matchClick
          ? <div className="static-modal">
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
          : null }
          
      </div>
    );
  }
}


export default Challenges;