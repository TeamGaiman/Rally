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
      submitButtonText: ['Confirm Winner', 'Submit Match Results']
    };

    this.handleWinnerSelect = this.handleWinnerSelect.bind(this);
  }

  componentDidMount () {
    if ( this.props.match.winner ) {
      this.setState({
        selectedWinner: this.props.match.winner
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
    console.log(this.props.currentUserEmail);

    return (
      <Modal
        show={ this.props.resultsModalOpen }
        onExit={ () => {
          this.setState({
            selectedWinner: null
          });
        }}
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

            <ControlLabel>Winner</ControlLabel>
            {
              ( this.state.selectedWinner === this.props.currentUserEmail )
                ?
                <p>Please wait for your opponenent to confirm the results.</p>
                :
                ( this.state.selectedWinner )
                  ?
                  <p>{ this.state.selectedWinner } has been selected as the winner of this match.</p>
                  :
                  <ButtonToolbar>
                    <ToggleButtonGroup 
                      type="radio" 
                      name="winner" 
                      onChange={ this.handleWinnerSelect } 
                    >
                      <ToggleButton value={ 1 }>
                        { this.props.match.challenger }
                      </ToggleButton>
                      <ToggleButton value={ 2 }>
                        { this.props.match.opponent }
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </ButtonToolbar>
            }
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={ this.props.hideResultsModal }>
            Cancel
          </Button>
          {
            ( this.state.selectedWinner === this.props.currentUserEmail )
              ?
              <Button
                bsStyle="primary"
                disabled
              >
                Please wait for your opponent's confirmation.
              </Button>
              :
              ( this.state.selectedWinner && this.state.selectedWinner )
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
                            completed: true,
                          }
                        }}); 
                      }}
                    >
                      { this.state.submitButtonText[0] }
                    </Button>
                  )}
                </Mutation>
                :
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
                            winner: this.state.selectedWinner
                          }
                        }});
                      }}>
                      { this.state.submitButtonText[1] }
                    </Button>
                  )}
                </Mutation>
          }
        </Modal.Footer>
      </Modal>    
    );
  }
}

export default ResultsModal;
