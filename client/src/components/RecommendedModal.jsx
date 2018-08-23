import React from 'react';
import { Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import Datetime from 'react-datetime';
import Map from './Map.jsx';

const RecommendedModal = (props) => {
  var yesterday = Datetime.moment().subtract(1, 'day');
  var valid = ( current ) => {
    return current.isAfter( yesterday );
  };

  return (
    <Modal
      show={ props.showMatch }
      onHide={ props.handleHideMatch }
      className="create-challenge-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">
          Send a Challenge
        </Modal.Title>
      </Modal.Header>
      <div>
        <Modal.Body>
          <Form horizontal className="form-width">
            <ControlLabel>Opponent</ControlLabel>
            <FormControl.Static>{props.matchClickUser.email}</FormControl.Static>
            <ControlLabel>Select Time</ControlLabel>
            <Datetime
              isValidDate={valid}
              className="form-width"
              closeOnSelect={true}
              inputProps={{ placeholder: 'Select Date', readOnly: true }}
              onChange={props.handleDateChange}
              value={props.startTime}
            />
            <br/>
            <FormGroup controlId="formHorizontalEmail">
              <Col sm={12}>
                <ControlLabel>Location</ControlLabel>
                <FormControl.Static>
                  {props.location ? props.location : 'Select court on map'}
                </FormControl.Static>
              </Col>
            </FormGroup>
          </Form>
          <Map 
            {...props} 
          />
        </Modal.Body>
      </div>
      <Modal.Footer>
        <Button onClick={ props.handleHideMatch }>Cancel</Button>
        <Button bsStyle="primary" onClick={ props.createMatch }>Send Challenge</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecommendedModal;