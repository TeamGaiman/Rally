import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TierModal = (props) => (
  <Modal
    bsSize="large"
    className="tier-modal"
    show={ props.tierModal }
    onHide={ props.toggleTierModal }>

    <Modal.Header closeButton>
      <Modal.Title
        id="contained-modal-title">
        Ready to advance?
      </Modal.Title>
    </Modal.Header>

    <Modal.Body>
      
    </Modal.Body>

    <Modal.Footer>
      <Button onClick={ props.toggleTierModal }>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default TierModal;
