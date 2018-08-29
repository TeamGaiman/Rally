import React from 'react';
import moment from 'moment';
import { Modal, Button, Form, FormControl, ControlLabel, ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Mutation } from 'react-apollo';

import { UPDATE_MATCH } from '../apollo/mutations';

class ResultsModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedWinner: null,
      loser: null,
      opponentReview: [],
    };

    this.handleWinnerSelect = this.handleWinnerSelect.bind(this);
    this.handleOpponentReview = this.handleOpponentReview.bind(this);
  }

  componentDidUpdate () {
    if ( this.props.match.winner ) {
      if ( this.props.winner === this.props.match.opponent ) {
        var loser = this.props.match.challenger;
      } else if ( this.props.winner === this.props.challenger ) {
        var loser = this.props.match.opponent;
      }
      this.setState({
        selectedWinner: this.props.match.winner,
        loser
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

  handleUpdateUser ( e ) {
    const updateVariables = {
      claimWin: {
        input: {
          winner: this.state.selectedWinner
        }
      },
      contestWin: {
        input: {
          winner: '!'
        }
      },
      acceptResults: {
        input: {
          completed: true
        }
      },
      acceptContest: {
        input: {
          completed: true
        }
      }
    };

    updateMatch({
      variables: updateVariables[e.target.id]
    });
    this.props.hideResultsModal();
  }

  render () {
    return (
      <Modal
        show={ this.props.resultsModalOpen }
        className="results-modal"
      >

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">
            { `Your match vs ${ this.props.match.opponent }` }
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
            <ButtonToolbar>
              {
                ( this.state.selectedWinner === null)
                  ? 
                  <div>
                    <Mutation mutation={ UPDATE_MATCH }>
                      {( updateMatch, { data } ) => (
                        <Button
                          id="claimWin"
                          type="submit"
                          className="pull-right"
                          onClick={ this.handleUpdateUser }
                        >
                          I won this match!
                        </Button>
                      )}
                    </Mutation>
                    <br/> <br/>
                    <small>
                      If you did not win this match, wait for your opponent to claim victory.
                    </small>
                  </div> : null
              } {
                ( this.state.selectedWinner === '!' )
                  ? null
                  : null
              } {
                ( this.props.currentUser === this.props.match.winner )
                  ?
                  <div>
                    <Button
                      className="pull-right"
                      disabled
                    >
                      Please wait for your opponent to confirm these results.
                    </Button>
                  </div> : null
              } {
                ( this.props.currentUser === this.state.loser )
                  ?
                  <div>
                    <Mutation mutation={ UPDATE_MATCH }>
                      {( updateMatch, { data } ) => (
                        <Button
                          id="acceptResult"
                          type="submit"
                          className="pull-right"
                          onClick={ this.handleUpdateUser }
                        >
                          Accept result.
                          <small>
                            { this.props.match.winner } won this match.
                          </small>
                        </Button>
                      )}
                    </Mutation>
                    <Mutation mutation={ UPDATE_MATCH }>
                      {( updateMatch, { data } ) => (
                        <Button
                          id="contestWin"
                          type="submit"
                          className="pull-right"
                          onClick={ this.handleUpdateUser }
                        >
                          Contest result.
                          <small>
                            { this.props.match.winner } did not win this match.
                          </small>
                        </Button>
                      )}
                    </Mutation>
                  </div> : null
              }
            </ButtonToolbar>

            <ControlLabel>Review Opponent</ControlLabel>
            <ToggleButtonGroup
              type='checkbox'
              onChange={ this.handleOpponentReview }>
              <ToggleButton value={ 1 }>Good Sport</ToggleButton>
              <ToggleButton value={ 2 }>Rally</ToggleButton>
              <ToggleButton value={ 3 }>Great Server</ToggleButton>
            </ToggleButtonGroup>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={ this.props.hideResultsModal }>
            Cancel
          </Button>
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
                      completed: true,
                      winner: this.state.selectedWinner
                    }
                  }}); 
                }}>
                Submit Results
              </Button>
            )}
          </Mutation>
        </Modal.Footer>

      </Modal>    
    );
  }
}

export default ResultsModal;
