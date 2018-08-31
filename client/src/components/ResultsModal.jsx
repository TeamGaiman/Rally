import React from 'react';
import moment from 'moment';
import { Modal, Button, Form, FormControl, ControlLabel, ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import { calcNewElos } from '../../dist/js/index';

import { UPDATE_MATCH, UPDATE_USER } from '../apollo/mutations';

class ResultsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWinner: '',
      opponentReview: [],
      winnerElo: ''
    };

    this.handleWinnerSelect = this.handleWinnerSelect.bind(this);
    this.handleOpponentReview = this.handleOpponentReview.bind(this);
    this.handleWinnerMutation = this.handleWinnerMutation.bind(this);
    this.getWinnerElo = this.getWinnerElo.bind(this);
    this.getLoserElo = this.getLoserElo.bind(this);
  }

  componentDidMount () {
    if ( this.props.winner ) {
      this.setState({
        selectedWinner: this.props.winner
      });
    }
  }

  handleWinnerSelect ( value ) {
    if ( value === 1 ) {
      this.setState({
        selectedWinner: this.props.match.challenger
      });
    } else if ( value === 2 ) {
      this.setState({
        selectedWinner: this.props.match.opponent
      });
    }
  }

  handleOpponentReview ( e ) {
    this.setState({
      opponentReview: e
    });
  }

  getWinnerElo(winnerElo, loserElo) {
    let newElos = calcNewElos(winnerElo, loserElo, 32);
    return Math.round(newElos[0]);
  }

  getLoserElo(winnerElo, loserElo) {
    let newElos = calcNewElos(winnerElo, loserElo, 32);
    return Math.round(newElos[1]);
  }

  handleWinnerMutation(updateMatch, updateUser) {
    let winnerElo = '';
    if (this.props.currentUser === this.props.match.opponent) {
      winnerElo = this.props.match.challengerUserInfo.elo;
    } else {
      winnerElo = this.props.match.opponentUserInfo.elo;
    }
    let newElo1 = this.getWinnerElo(winnerElo, this.props.currentElo);
    let newElo2 = this.getLoserElo(winnerElo, this.props.currentElo);
    updateMatch({
      variables: {
        id: this.props.match.id,
        input: {
          completed: true
        }
      }
    })
      .then(({data}) => {
        return updateUser({
          variables: {
            email: this.props.match.winner,
            input: {
              elo: newElo1
            }
          }
        });
      })
      .then(({data}) => {
        return updateUser({
          variables: {
            email: this.props.currentUser,
            input: {
              elo: newElo2
            }
          }
        });
      });
  }

  render () {
    let modalOpponent = null;
    if (this.props.match.opponent) {
      if (this.props.currentUser === this.props.match.opponent) {
        modalOpponent = this.props.match.challengerUserInfo.name ||
        this.props.match.challengerUserInfo.fullName;
      } else {
        modalOpponent = this.props.match.opponentUserInfo.name ||
          this.props.match.opponentUserInfo.fullName;
      }
    }

    return (
      <Modal
        show={ this.props.resultsModalOpen }
        onHide={ this.props.hideResultsModal }
        className="results-modal"
      >

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">
            { `Your match vs ${ modalOpponent }` }
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <Form horizontal className="form-width">

            <ControlLabel>Time</ControlLabel>
            <FormControl.Static>
              { moment( new Date( this.props.match.startTime )).calendar() }
            </FormControl.Static>

            <ControlLabel>Court Location</ControlLabel>
            <FormControl.Static>
              { this.props.match.location }
            </FormControl.Static>

            <ControlLabel>Review Opponent</ControlLabel>
            <ToggleButtonGroup
              type='checkbox'
              onChange={ this.handleOpponentReview }>
              <ToggleButton value={ 1 }>Good Sport</ToggleButton>
              <ToggleButton value={ 2 }>Rally</ToggleButton>
              <ToggleButton value={ 3 }>Great Server</ToggleButton>
            </ToggleButtonGroup>

            {
              ( this.props.match.winner === null )
                ?
                <div>
                  <p>If you were the winner of this match, click below to claim victory!</p>
                  <br/>
                  <small>Your opponent will have to confirm these results before they are recorded.</small>
                </div> : null
            } {
              ( this.props.match.winner === this.props.currentUser )
                ?
                <div>
                  <p> Wait for your opponent to confirm that you were the winner of this match.</p>
                  <br/>
                  <small>Your opponent will have to confirm these results before they are recorded.</small>
                </div> : null
            } {
              ( this.props.match.winner !== null
                && this.props.match.winner !== this.props.currentUser )
                ?
                <div>
                  <p>Your opponent has claimed victory in this match!</p>
                  <br/>
                  <small>Confirm his/her victory below. You may contest his/her claim if it is incorrect.</small>
                </div> : null
            }

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={ this.props.hideResultsModal }>
            Cancel
          </Button>
          {
            ( this.props.match.winner === null )
              ?
              <Mutation
                mutation={ UPDATE_MATCH }
                update={ this.props.hideResultsModal }
              >
                { updateMatch => (
                  <Button
                    bsStyle="primary"
                    onClick={ () => {
                      updateMatch({ variables: {
                        id: this.props.match.id,
                        input: {
                          winner: this.props.currentUser
                        }
                      }}); 
                    }}
                  >
                    I won this match.
                  </Button>
                )}
              </Mutation>
              : null
          } {
            ( this.props.match.winner === this.props.currentUser )
              ?
              <Button
                className="pull-right"
                disabled
              >
                Please wait for your opponent to confirm these results.
              </Button>
              : null
          } {
            ( this.props.match.winner !== null
              && this.props.match.winner !== this.props.currentUser )
              ?
              <Mutation
                mutation={ UPDATE_MATCH }
                update={ this.props.hideResultsModal }
              >
                { updateMatch => (

                  <Mutation mutation={ UPDATE_USER }>
                    {updateUser => (
                      <Button
                        bsStyle="primary"
                        onClick={ () => {
                          this.handleWinnerMutation(updateMatch, updateUser);
                        }}
                      >
                    Confirm that my opponent won this match
                      </Button>
                    )}
                  </Mutation>
                )}
              </Mutation>
              : null
          }
        </Modal.Footer>

      </Modal>    
    );
  }
}

export default ResultsModal;
