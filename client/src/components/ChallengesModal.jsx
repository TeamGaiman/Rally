import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ChallengesModal = (props) => {
  return (
    <Modal
      show={ props.challengeModalOpen }
      onHide={ props.handleHideMatch }
      className="accept-challenge-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">
          { `You've been challenged by ${props.challenge.participantA}` }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {props.challenge.location}
          <br/>
          <br/>
          {props.challenge.startTime.split(' GMT')[0]}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={ props.hideChallengeModal }>Decline</Button>
        <Button bsStyle="primary" onClick={ props.handleAccept }>Accept Challenge</Button>
      </Modal.Footer>
    </Modal>    
  );
};

export default ChallengesModal;