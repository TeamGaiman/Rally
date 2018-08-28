import React from 'react';
import { Modal, Button, Form, FormControl, ControlLabel } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import { UPDATE_MATCH, DELETE_MATCH } from '../apollo/mutations';
import moment from 'moment';


const ChallengeModal = (props) => {
  if (props.challenge) {
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
              { moment( new Date( props.challenge.startTime )).calendar() }
            </FormControl.Static>
            <ControlLabel>Court Location</ControlLabel>
            <FormControl.Static>
              { props.challenge.location }
            </FormControl.Static>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Mutation
            mutation={ DELETE_MATCH }
            update={ props.hideChallengeModal }
            variables={{
              id: props.challenge.id,
              input: {
                accepted: true
              }
            }}
          >
            { deleteMatch => (
              <Button
                onClick={ deleteMatch }>
                Decline
              </Button>
            )}
          </Mutation>

          <Mutation
            mutation={ UPDATE_MATCH }
            update={ props.hideChallengeModal }
            variables={{
              id: props.challenge.id,
              input: {
                accepted: true
              }
            }}
          >
            {acceptMatch => (
              <Button
                bsStyle="primary"
                onClick={ acceptMatch }>
                Accept Challenge
              </Button>
            )}
          </Mutation>
        </Modal.Footer>

      </Modal>    
    );
  } else { 
    return null;
  }
};

export default ChallengeModal;
