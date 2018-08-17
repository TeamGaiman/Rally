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
      showMatch: false,
      matchClickUser: null,
    };

    this.handleMatchClick = this.handleMatchClick.bind(this);
    this.handleAcceptMatch = this.handleAcceptMatch.bind(this);
    this.handleDeclineMatch = this.handleDeclineMatch.bind(this);
    this.handleHideMatch = this.handleHideMatch.bind(this);
  }

  getAllChallenges() {

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
  
  handleDeclineMatch() {
    this.setState({ matchClick: false });
  }

  handleHideMatch() {
    this.setState({ showMatch: false });
  }

  render() {
    return (
      <div className='matches-container'>
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
            {this.state.matches.slice(0, 5).map(user => (
              <tr className='match-row' key={ user.id } onClick={ () => this.handleMatchClick( user ) }>
                <td>{ user.particpantB }</td>
                <td>{ user.startTime }</td>
                <td>{ user.location }</td>
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
                { this.state.matchClickUser.particpantB }
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                {/* Profile Pic <img src={this.state.matchClickUser.}>
                <br/>
                <br/> */}
                W: { this.state.matchClickUser.wins } L: { this.state.matchClickUser.losses }
                <br/>
                <br/>
                Tier: { this.state.matchClickUser.tier }
                <br/>
                <br/>
                Trophies:
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={ this.handleHideMatch }>Decline</Button>
              <Button bsStyle="primary" onClick={ this.handleAcceptMatch }>Accept Challenge</Button>
            </Modal.Footer>
          </Modal>
          : null }
          
      </div>
    );
  }
}


export default Challenges;