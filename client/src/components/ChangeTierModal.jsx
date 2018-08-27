import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import { UPDATE_USER } from '../apollo/mutations.js';

const ChangeTierModal = (props) => {

  const nextLowestTier = props.playerTier - 1 || 1;

  return (
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
        { // WHAT IF PLAYER IS ALREADY AT TIER 1?
          
          ( props.playerElo < props.playerTierThreshold )
            ?
            <div>
              <p>When you have filled your progress bar, you will have the option of advancing to the next tier!</p>
              <Mutation
                mutation={ UPDATE_USER }
                variables={{
                  email: props.playerEmail,
                  input: {
                    tier: nextLowestTier,
                    elo: 2000
                  }
                }}
              >
                {( updateUser, { data } ) => {
                  console.log(nextLowestTier);
                  return (
                    <Button
                      type="submit"
                      className="pull-right"
                      onClick={ updateUser }
                    >
                      Click here to drop to {nextLowestTier}. This action is permanent and cannot be undone.
                    </Button>
                  );
                }}
              </Mutation>
            </div>
          
          : <p>You are qualified to move on to the next skill tier!</p>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={ props.toggleTierModal }>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeTierModal;
