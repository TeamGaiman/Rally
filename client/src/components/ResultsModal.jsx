import React from 'react';
import moment from 'moment';
import { Modal, Button, Form, FormControl, ControlLabel, ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Mutation } from 'react-apollo';

import { UPDATE_MATCH } from '../apollo/mutations';
class ResultsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedWinner: ''
    };

    this.handleWinnerSelect = this.handleWinnerSelect.bind(this);
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
        onHide={ this.props.hideResultsModal }
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
            <ButtonToolbar>
              <ToggleButtonGroup 
                type="radio" 
                name="winner" 
                onChange={ this.handleWinnerSelect } 
              >
                <ToggleButton value={ 1 }>{ this.props.match.challenger }</ToggleButton>
                <ToggleButton value={ 2 }>{ this.props.match.opponent }</ToggleButton>
              </ToggleButtonGroup>
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
            { updateWinner => (
              <Button
                bsStyle="primary"
                onClick={ () => {
                  updateWinner({ variables: {
                    id: this.props.matchClicked.id,
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
