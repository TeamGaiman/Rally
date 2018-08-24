import React from 'react';
import { Table, Button, ProgressBar } from 'react-bootstrap';

import ChallengesModal from './ChallengesModal.jsx';
import { Mutation } from 'react-apollo';
import {UPDATE_MATCH } from '../apollo/mutations';

class Challenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeModalOpen: false,
      challengeClicked: null,
    };

    this.handleChallengeClick = this.handleChallengeClick.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
    this.hideChallengeModal = this.hideChallengeModal.bind(this);
  }

  handleChallengeClick(challenge) {
    this.setState({
      challengeModalOpen: true,
      challengeClicked: challenge
    });
  }

  handleAccept() {
    //after user handles match remove it here
    // let index = this.state.matchedUsers.indexOf( this.state.challengeClicked );
    // this.state.matchedUsers.splice( index, 1 );
    this.setState({ 
      challengeModalOpen: false 
    });
  }
  
  handleDecline() {
    //after user handles challenge with decline remove it here
    this.setState({ matchClick: false });
  }

  hideChallengeModal() {
    this.setState({ challengeModalOpen: false });
  }

  render() {
    console.log('CHALLENGES: ', this.props.playerData.challengesReceived)
    return (
      <div className='matches-container'>
        <h2>Challenges</h2>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Challenger</th>
              <th>Date</th>
              <th>Location</th>
              <th>Win %</th>
            </tr>
          </thead>
          <tbody>
            { this.props.playerData.challengesReceived.slice(0, 5).map( (challenge, index) => {
              return (
                <tr className='match-row' key={ challenge.id }>
                  <td>{challenge.challenger}</td>
                  <td>{challenge.startTime.split(' GMT')[0]}</td>
                  <td>{challenge.location}</td>
                  <td><ProgressBar bsStyle="warning" now={50} label={`${50}%`} /></td>
                  <td><Button bsStyle='primary' onClick={() => this.handleChallengeClick(challenge)}>View</Button></td>
                </tr>
              );
            }
            )}
          </tbody>
        </Table>

        { this.state.challengeModalOpen
          ? <Mutation
            mutation={ UPDATE_MATCH }
            variables={
              {
                id: this.state.challengeClicked.id,
                input:
                  {
                    accepted: true
                  }
              }}
            update={ this.handleAccept }
          >
            { acceptMatch => (
              <ChallengesModal 
                challenge={ this.state.challengeClicked }
                challengeModalOpen={ this.state.challengeModalOpen }
                hideChallengeModal={ this.hideChallengeModal }
                challengeClicked={ this.state.challengeClicked }
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