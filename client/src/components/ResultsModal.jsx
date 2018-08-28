import React from 'react';
import moment from 'moment';
import { Modal, Button, Form, FormControl, ControlLabel, ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Mutation } from 'react-apollo';

import { UPDATE_MATCH } from '../apollo/mutations';
class ResultsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedWinner: null,
      loser: null
    };

    this.handleWinnerSelect = this.handleWinnerSelect.bind(this);
  }

  componentDidMount () {
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

  handleWinnerSelect (value) {
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
                    <Button bsStyle="primary">
                      I won this match.
                    </Button>
                    <br/> <br/>
                    <small>
                      If you did not win this match, wait for your opponent to claim a win then confirm the loss.
                    </small>
                  </div>
                  : null
              } {
                ( this.state.selectedWinner === '!' )

              } { 
                ( this.props.currentUser === this.state.selectedWinner )
                  ?
                  <div>
                    <Button disabled>
                      Please wait for your opponent to confirm these results.
                    </Button>
                  </div>
                  : null
              } {
                ( this.props.currentUser === this.state.loser )
                  ?
                  <div>
                    <Button>
                      Confirm that {this.props.winner} won this match.
                    </Button>
                    <Button>
                      Contest this result.
                    </Button>
                  </div>
                  : null
              }
            </ButtonToolbar>

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
