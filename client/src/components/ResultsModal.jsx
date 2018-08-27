import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ResultsModal = (props) => {
  return (
    <Modal
      show={ props.resultsModalOpen }
      onHide={ props.hideResultsModal }
      className="results-modal"
    >

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">
          { `Your match vs ${ props.challenge.challenger }` }
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <div>
          { props.challenge.location }
          <br/>
          <br/>
          { props.challenge.startTime.split(' GMT')[0] }
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={ props.hideResultsModal }>
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

export default ResultsModal;