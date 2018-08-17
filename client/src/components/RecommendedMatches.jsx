import React from 'react';
import { Table, Modal, Button } from 'react-bootstrap';

import matchmakeByElo from '../../../workers/matchmaking.js';

class RecommendedMatches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchedUsers: [],
      showMatch: false,
      matchClickUser: null
    };

    this.handleMatchClick = this.handleMatchClick.bind(this);
    this.handleAcceptMatch = this.handleAcceptMatch.bind(this);
    this.handleHideMatch = this.handleHideMatch.bind(this);
  }

  componentDidMount () {
    let newMatches = matchmakeByElo(2000, this.props.users);
    this.setState({
      matchedUsers: newMatches
    });
  }

  handleMatchClick(user) {
    console.log('CLICKED??', user);
    this.setState({
      showMatch: true,
      matchClickUser: user
    });
  }

  handleAcceptMatch() {
    this.setState({ showMatch: false });
    
  }

  handleHideMatch() {
    this.setState({ showMatch: false });
  }

  render() {
    return (
      <div className='matches-container'>
        <h2>Recommended Matches</h2>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>User</th>
              <th>Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            { this.state.matchedUsers.slice(0, 5).map( matchedUser => (
              <tr className='match-row' key={ matchedUser.id } onClick={ () => this.handleMatchClick( matchedUser ) }>
                <td>{ matchedUser.name }</td>
                <td>{ matchedUser.phoneNumber }</td>
                <td>{ matchedUser.email }</td>
              </tr>
            ))}
          </tbody>
        </Table>
        { this.state.showMatch
          ? <Modal
            show={ this.state.showMatch }
            onHide={ this.handleHideMatch }
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">
                {this.state.matchClickUser ? this.state.matchClickUser.name : null}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                {/* Profile Pic
                <br/>
                <br/> */}
                W: {this.state.matchClickUser.wins} L: {this.state.matchClickUser.losses}
                <br/>
                <br/>
                Trophies:
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={ this.handleHideMatch }>Cancel</Button>
              <Button bsStyle="primary" onClick={ this.handleAcceptMatch }>Challenge</Button>
            </Modal.Footer>
          </Modal>
          : null }
      </div>
    );
  }
}


export default RecommendedMatches;