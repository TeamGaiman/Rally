import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ChallengesModal = (props) => {
  return (
    <Modal
      show={ props.showMatch }
      onHide={ props.handleHideMatch }
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">
          { props.matchClickUser.particpantB }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {/* Profile Pic <img src={this.state.matchClickUser.}>
          <br/>
          <br/> */}
          W: { props.matchClickUser.wins } L: { props.matchClickUser.losses }
          <br/>
          <br/>
          Tier: { props.matchClickUser.tier }
          <br/>
          <br/>
          Trophies:
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={ props.handleHideMatch }>Decline</Button>
        <Button bsStyle="primary" onClick={ props.acceptMatch }>Accept Challenge</Button>
      </Modal.Footer>
    </Modal>    
  );
};

export default ChallengesModal;