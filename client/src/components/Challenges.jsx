import React from 'react';
import { Table } from 'react-bootstrap';
import ChallengesModal from './ChallengesModal.jsx';
import { Mutation } from 'react-apollo';
import { ACCEPT_MATCH } from '../apollo/mutations';

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
    let index = this.state.matchedUsers.indexOf(this.state.matchClickUser);
    this.state.matchedUsers.splice(index, 1);
    this.setState({ 
      matches: this.state.matches,
      showMatch: false 
    });
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
          ? <Mutation
            mutation={ ACCEPT_MATCH }
            variables={{ accepted: true }}
            update={ this.handleAcceptMatch }
          >
            { acceptMatch => (
              <ChallengesModal 
                showMatch={ this.state.showMatch }
                handleHideMatch={ this.handleHideMatch }
                matchClickUser={ this.state.matchClickUser }
                acceptMatch={ acceptMatch }
              />
            )}
          </Mutation>
          : null }
          
      </div>
    );
  }
}


export default Challenges;