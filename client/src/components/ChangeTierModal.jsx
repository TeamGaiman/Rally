import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import { UPDATE_USER } from '../apollo/mutations.js';

const ChangeTierModal = (props) => {

  let nextLowestTier = props.playerTier;
  let nextHighestTier = props.playerTier;
  const playerMayRankUp = (props.playerElo > props.playerTierThreshold && props.playerTier < 4);
  const playerMayRankDown = ( props.playerTier > 1 );

  if ( props.playerTier < 4 ) {
    nextHighestTier += 1;
  }
  if ( props.playerTier > 1 ) {
    nextLowestTier -= 1;
  }

  const handleTierChange = (updateUser) => {
    props.toggleTierModal();
    return updateUser;
  };

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
        { 
          ( props.playerTier === 4 )
            ?
            <div>
              <p>You are already in the highest skill tier.</p>
              <small>
                Keep an eye on matchmaking to find new challengers of your level.
                <br/>
                Consider challenging lower-skill players to friendly matches.
              </small>
            </div>
            : null
        } {
          ( playerMayRankUp )
            ?
            <div>
              <p>You are qualified to move on to the next skill tier!</p>
              <small>
                After you move up in tier the opponents suggested in Matchmaking will belong to Skill Tier { nextHighestTier }.
                <br/>
                Matches you have already scheduled with players from Skill Tier { props.playerTier } will not affect your standings.
              </small>
            </div>
            :
            ( props.playerTier < 4 )
              ?
              <div>
                <p>When you have filled your progress bar, you will have the option of advancing to the next tier!</p>
              </div>
              : null
        } {
          ( playerMayRankDown )
            ?
            <div>
              <small>
                Click here to drop to { nextLowestTier }.
                <br/>
                This action is permanent and cannot be undone.
              </small>
            </div>
            : null
        }
      </Modal.Body>

      <Modal.Footer>
        {
          ( playerMayRankUp ) 
            ?
            <Mutation
              mutation={ UPDATE_USER }
              variables={{
                email: props.playerEmail,
                input: {
                  tier: nextHighestTier,
                  elo: 2000
                }
              }}
            >
              {( updateUser, { data } ) => (
                <Button
                  type="submit"
                  className="pull-left"
                  onClick={ e => {
                    updateUser({
                      variables: {
                        email: props.playerEmail,
                        input: {
                          tier: nextHighestTier,
                          elo: 2000
                        }
                      }});
                    props.toggleTierModal();
                  }}
                >
                  Advance to Skill Tier { nextHighestTier }
                </Button>
              )}
            </Mutation>
            :
            <Button
              type="submit"
              className="pull-left"
              disabled
            >
              Advance to Skill Tier { nextHighestTier }
            </Button>
        } {
          ( playerMayRankDown )
            ? 
            <Mutation mutation={ UPDATE_USER }>
              {( updateUser, { data } ) => (
                <Button
                  type="submit"
                  className="pull-left"
                  onClick={ e => {
                    updateUser({
                      variables: {
                        email: props.playerEmail,
                        input: {
                          tier: nextLowestTier,
                          elo: 2000
                        }
                      }});
                    props.toggleTierModal();
                  }}
                >
                  Revert to { nextLowestTier }
                </Button>
              )}
            </Mutation>
            :
            <Button
              type="submit"
              className="pull-left"
              disabled
            >
              <small>
                You are already in the lowest Skill Tier
              </small>
            </Button>
        }
        
        <Button onClick={ props.toggleTierModal }>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeTierModal;
