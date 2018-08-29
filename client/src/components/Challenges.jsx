import React from 'react';
import { Table, Button, ProgressBar } from 'react-bootstrap';
import moment from 'moment';

import ChallengeModal from './ChallengeModal.jsx';

class Challenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeModalOpen: false,
      challengeClicked: null,
    };

    this.handleChallengeClick = this.handleChallengeClick.bind(this);
    this.hideChallengeModal = this.hideChallengeModal.bind(this);
  }

  handleChallengeClick ( challenge ) {
    this.setState({
      challengeModalOpen: true,
      challengeClicked: challenge
    });
  }

  hideChallengeModal () {
    this.setState({ 
      challengeModalOpen: false 
    });
  }

  render () {
    console.log(this.props.challengeData.challengesReceived)
    return (
      <div className="matches-container">
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
            { this.props.challengeData.challengesReceived.map(( challenge ) => {
              return (
                <tr
                  className="match-row"
                  key={ challenge.id }
                >
                  <td>{ challenge.challenger }</td>
                  <td>{ moment( new Date( challenge.startTime )).calendar() }</td>
                  <td>{ challenge.location }</td>
                  <td>
                    <ProgressBar
                      bsStyle="warning"
                      now={ 50 }
                      label={ `${50}%` }
                    />
                  </td>
                  <td>
                    <Button
                      bsStyle="primary"
                      onClick={ () => this.handleChallengeClick( challenge )}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <ChallengeModal
          challenge={ this.state.challengeClicked }
          challengeModalOpen={ this.state.challengeModalOpen }
          hideChallengeModal={ this.hideChallengeModal }
        />

      </div>
    );
  }
}

export default Challenges;
