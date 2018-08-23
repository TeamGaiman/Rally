import React from 'react';
import { Table, Button, ProgressBar } from 'react-bootstrap';

import ChallengesModal from './ChallengesModal.jsx';
import { Mutation } from 'react-apollo';
import { ACCEPT_MATCH } from '../apollo/mutations';

class Challenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMatch: false,
      matchClickUser: null,
    };

    this.handleMatchClick = this.handleMatchClick.bind(this);
    this.handleAcceptMatch = this.handleAcceptMatch.bind(this);
    this.handleDeclineMatch = this.handleDeclineMatch.bind(this);
    this.handleHideMatch = this.handleHideMatch.bind(this);
  }

  handleMatchClick(user) {
    this.setState({
      showMatch: true,
      matchClickUser: user
    });
  }

  handleAcceptMatch() {
    //after user handles match remove it here
    // let index = this.state.matchedUsers.indexOf( this.state.matchClickUser );
    // this.state.matchedUsers.splice( index, 1 );
    this.setState({ 
      showMatch: false 
    });
  }
  
  handleDeclineMatch() {
    //after user handles match remove it here
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
              <th>Win %</th>
            </tr>
          </thead>
          <tbody>
            { this.props.challenges.slice(0, 5).map(challenge => {
              console.log('Challenge: ', challenge);
              return (
                <tr className='match-row' key={challenge.id} onClick={() => this.handleMatchClick(user)}>
                  <td>{challenge.participantA}</td>
                  <td>{challenge.startTime.split(' GMT')[0]}</td>
                  <td>{challenge.location}</td>
                  <td><ProgressBar bsStyle="warning" now={20} label={`${20}%`} /></td>
                  <td><Button bsStyle='primary' onClick={() => this.handleMatchClick(challenge)}>View</Button></td>
                </tr>
              );
            }
            )}
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