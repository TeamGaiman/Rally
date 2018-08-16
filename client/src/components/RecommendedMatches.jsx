import React from 'react';
import { Table, Modal, Button } from 'react-bootstrap';

import matchmakeByElo from '../../../workers/matchmaking.js';

class RecommendedMatches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchedUsers: [],
      matchClick: false,
      matchClickId: null
    };

    this.handleMatchClick = this.handleMatchClick.bind(this);
    this.handleAcceptMatch = this.handleAcceptMatch.bind(this);
    this.handleDeclineMatch = this.handleDeclineMatch.bind(this);
  }

  componentDidMount () {
    let newMatches = matchmakeByElo(2000, this.props.users);
    this.setState({
      matchedUsers: newMatches
    });
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
            { this.state.matchedUsers.map( matchedUser => (
              <tr key={ matchedUser.id } onClick={ () => this.handleMatchClick( matchedUser.id ) }>
                <td>{ matchedUser.name }</td>
                <td>{ matchedUser.phoneNumber }</td>
                <td>{ matchedUser.elo }</td>
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


export default RecommendedMatches;