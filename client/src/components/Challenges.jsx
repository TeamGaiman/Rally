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
    return (
      <div>
        {/* <h2>Challenges</h2> */}

        <div className="scrolling-wrapper scrolling-wrapper-flexbox">
          { this.state.matchedUsers.slice( 0, 10 ).map( matchedUser => {
            let winPercent = this.getWinProbability( this.props.playerData.elo, matchedUser.elo );
            return (
              <div className="card" key={ matchedUser.id }>
                <Image src={ matchedUser.image } className="image-opacity"/>
                <Image src={ matchedUser.image } className="profile-pic-card pic-shadow" circle/>
                <div className="card-container text-center">
                  <h4 className="username"><b>{ matchedUser.name }</b></h4> 
                  W: { matchedUser.wins } L: { matchedUser.losses }
                  <br/>
                  <br/>
                  Win %
                  <ProgressBar
                    bsStyle="success"
                    now={ winPercent }
                    label={ `${winPercent}%` } />
                  <Button 
                    bsStyle="primary"
                    className="card-button"
                    onClick={ () => this.handleMatchClick( matchedUser )}>
                    Challenge
                  </Button>
                </div>
              </div>
            );
          })
          }
        </div>
        
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
