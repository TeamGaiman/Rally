import React from 'react';
import { Button, ProgressBar, Image } from 'react-bootstrap';
import moment from 'moment';

import ChallengeModal from './ChallengeModal.jsx';
import { calcProbabilityOfWin } from '../../dist/js/index';


class Challenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeModalOpen: false,
      challengeClicked: null,
    };

    this.handleChallengeClick = this.handleChallengeClick.bind(this);
    this.hideChallengeModal = this.hideChallengeModal.bind(this);
    this.getWinProbability = this.getWinProbability.bind(this);
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

  getWinProbability(elo1, elo2) {
    return Math.floor( calcProbabilityOfWin( elo1, elo2 ) * 100 ) || 1;
  }

  render () {
    // console.log('challengers', this.props.userDataElo);
    return (
      <div>
        <div className="scrolling-wrapper scrolling-wrapper-flexbox">
          { this.props.challengeData.challengesReceived.length 
            ? (
              this.props.challengeData.challengesReceived.map(( challenge ) => {
                let winPercent = this.getWinProbability( this.props.userDataElo, challenge.challengerUserInfo.elo );
                return (
                  <div className="challenge-card card-margin" key={ challenge.id }>
                    <Image
                      src={ challenge.challengerUserInfo.image }
                      className="image-opacity" />
                    <Image
                      src={ challenge.challengerUserInfo.image }
                      className="profile-pic-card pic-shadow" circle />
                    <div className="card-container text-center">
                      <h4 className="username">
                        <b>{ challenge.challengerUserInfo.name }</b>
                      </h4>
                      W: { challenge.challengerUserInfo.wins }
                      L: { challenge.challengerUserInfo.losses }
                      <br />
                      <br />
                      Win %
                      <ProgressBar
                        bsStyle="success"
                        now={ winPercent }
                        label={`${ winPercent }%`} />
                      <Button
                        bsStyle="primary"
                        className="challenge-button"
                        onClick={ () => this.handleChallengeClick( challenge )}>
                        View
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center">No Challenges</div>
            )}
        </div>

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
