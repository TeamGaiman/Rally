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
        Tier Explanation
      </Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <h4>Tier One:</h4>
      <p>
        A tier one player may have just started playing tennis or is still
        lacking significant experience. A player in this tier may have obvious
        stroke weaknesses, limitted court coverage or may be able to sustain a
        short rally with other beginners.
      </p>
      <h4>Tier Two:</h4>
      <p>
        A tier two player can consistently hit medium-paced shots. A player in
        this tier may not be comfortable with all strokes although he or she may
        have developed dependable directional control with forehand and backhand
        strokes. Players on the high end of this tier may be able to
        occasionally force errors when serving.
      </p>
      <h4>Tier Three:</h4>
      <p>
        A tier three player should at least be starting to master power and
        spins. A player at this level should be beginning to handle his or her
        pace, control shot depth and generally adjust strategy based on his or
        her opponent. First serves can be executed with power and accuracy.
        Overhitting difficult shots may still be common at this tier.
      </p>
      <h4>Tier Four:</h4>
      <p>
        A tier four player has solid shot anticipation and frequently has an
        outstanding shot. Exceptional consistency, regular forcing of errors off
        of short balls, volleys, lobs, drop shots, half volleys and overhead
        smashes are all available to a player at this level. Power and
        consistency may be major weapons for these players as well as varying
        strategies and style of play.
      </p>
    </Modal.Body>

    <Modal.Footer>
      <Button onClick={ props.toggleTierModal } className="decline-button">Close</Button>
    </Modal.Footer>
  </Modal>
);

export default TierModal;
