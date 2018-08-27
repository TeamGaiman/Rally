import React from 'react';
import { Modal, Button, Form, FormControl, ControlLabel } from 'react-bootstrap';
import moment from 'moment';


const ChallengeModal = (props) => {
  return (
    <Modal
      show={ props.challengeModalOpen }
      onHide={ props.hideChallengeModal }
      className="accept-challenge-modal"
    >

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">
          { `You've been challenged by ${ props.challenge.challenger }` }
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Form horizontal className="form-width">
          <ControlLabel>Time</ControlLabel>
          <FormControl.Static>
            { moment( props.challenge.startTime ).calendar() }
          </FormControl.Static>
          <ControlLabel>Court Location</ControlLabel>
          <FormControl.Static>
            { props.challenge.location }
          </FormControl.Static>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={ props.hideChallengeModal }>
          Decline
        </Button>
        <Button
          bsStyle="primary"
          onClick={ props.acceptMatch }>
          Accept Challenge
        </Button>
      </Modal.Footer>

    </Modal>    
  );
};

export default ChallengeModal;
