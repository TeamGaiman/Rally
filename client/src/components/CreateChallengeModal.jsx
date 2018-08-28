import React from 'react';
import { Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import Datetime from 'react-datetime';
import { Query } from 'react-apollo';
import { GET_ALL_COURTS } from '../apollo/queries.js';

import Map from './Map.jsx';

const CreateChallengeModal = (props) => {
  var yesterday = Datetime.moment().subtract( 1, 'day' );
  var valid = ( current ) => {
    return current.isAfter( yesterday );
  };

  return (
    <Modal
      show={ props.showMatch }
      onHide={ props.handleHideMatch }
      className="create-challenge-modal">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">
          Send a Challenge
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form horizontal className="form-width">
          <ControlLabel>Opponent</ControlLabel>
          <FormControl.Static>
            { props.matchClickUser.email }
          </FormControl.Static>
          <ControlLabel>Select Date and Time</ControlLabel>
          <Datetime
            isValidDate={ valid }
            // className="form-width"
            closeOnSelect={ false }
            inputProps={{
              placeholder: 'Select Date',
              readOnly: true
            }}
            input= { false }
            viewMode = { 'time' }
            onChange={ props.handleDateChange }
            value={ props.startTime }
          />
          <br/>
          <FormGroup controlId="formHorizontalEmail">
            <Col sm={12}>
              <ControlLabel>Location</ControlLabel>
              <FormControl.Static>
                { props.location ? props.location : 'Select court on map' }
              </FormControl.Static>
            </Col>
          </FormGroup>
        </Form>

        <Query query={ GET_ALL_COURTS }>
          {({ loading, error, data }) => {
            if ( loading ) { return <p>Loading courts...</p>; }
            if ( error ) { return <p>Error loading courts...</p>; }
            return (
              <Map 
                { ...props} 
                courts={ data.getAllCourts }
              />
            );
          }}
        </Query>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={ props.handleHideMatch }>
          Cancel
        </Button>
        <Button
          bsStyle="primary"
          onClick={ props.createMatch }
          disabled={ !(props.startTime && props.location) }
        >
          Send Challenge
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateChallengeModal;
