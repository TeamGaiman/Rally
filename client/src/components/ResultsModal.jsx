import React from 'react';
import moment from 'moment';
import { Modal, Button, Form, FormControl, ControlLabel, ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

const ResultsModal = (props) => {
  return (
    <Modal
      show={ props.resultsModalOpen }
      onHide={ props.hideResultsModal }
      className="results-modal"
    >

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">
          { `Your match vs ${ props.match.opponent }` }
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Form horizontal className="form-width">

          <ControlLabel>Time</ControlLabel>
          <FormControl.Static>
            { moment( props.match.startTime ).calendar() }
          </FormControl.Static>

          <ControlLabel>Court Location</ControlLabel>
          <FormControl.Static>
            { props.match.location }
          </FormControl.Static>

          <ControlLabel>Winner</ControlLabel>
          <ButtonToolbar>
            <ToggleButtonGroup type="radio" name="winner" onChange={( val ) => props.handleWinner( val ) } >
              <ToggleButton value={props.match.challenger}>{ props.match.challenger }</ToggleButton>
              <ToggleButton value={props.match.opponent}>{ props.match.opponent }</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={ props.hideResultsModal }>
          Cancel
        </Button>
        <Button
          bsStyle="primary"
          onClick={ props.updateWinner }>
          Submit Results
        </Button>
      </Modal.Footer>

    </Modal>    
  );
};

export default ResultsModal;