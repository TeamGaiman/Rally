import React from 'react';
import { Button, ProgressBar, Image } from 'react-bootstrap';
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
    console.log('challengers', this.props.challengeData.challengesReceived);
    return (
      <div>
        {/* <h2>Challenges</h2> */}

        <div className="scrolling-wrapper scrolling-wrapper-flexbox">
          { this.props.challengeData.challengesReceived.map(( challenge ) => {
            // let winPercent = this.getWinProbability( this.props.playerData.elo, challenge.challengerUserInfo.elo );
            return (
              <div className="card card-margin" key={ challenge.id }>
                <Image 
                  src={ challenge.challengerUserInfo.image } 
                  className="image-opacity"/>
                <Image 
                  src={ challenge.challengerUserInfo.image } 
                  className="profile-pic-card pic-shadow" circle/>
                <div className="card-container text-center">
                  <h4 className="username"><b>{ challenge.challengerUserInfo.name }</b></h4> 
                  W: { challenge.challengerUserInfo.wins } 
                  L: { challenge.challengerUserInfo.losses }
                  <br/>
                  <br/>
                  Win %
                  <ProgressBar
                    bsStyle="info"
                    now={ 50 }
                    label={ `${50}%` } />
                  <Button 
                    bsStyle="primary"
                    className="card-button"
                    onClick={ () => this.handleChallengeClick( challenge )}>
                    View
                  </Button>
                </div>
              </div>
            );
          })
          }
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
