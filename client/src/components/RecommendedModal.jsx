import React from 'react';
import { Modal, Button, Form, FormGroup, FormControl, Col } from 'react-bootstrap';
import Datetime from 'react-datetime';

const RecommendedModal = (props) => {
  var yesterday = Datetime.moment().subtract(1, 'day');
  var valid = ( current ) => {
    return current.isAfter( yesterday );
  };

  return (
    <Modal
      show={ props.showMatch }
      onHide={ props.handleHideMatch }
      className="challenge-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">
          { props.matchClickUser.name }
          <div>
            {/* Profile Pic
            <br/>
            <br/> */}
            W: { props.matchClickUser.wins } L: { props.matchClickUser.losses }
            <br/>
            Trophies:
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Datetime 
          isValidDate={ valid } 
          className="form-width" 
          closeOnSelect={ true } 
          inputProps={{ placeholder: 'Select Date' }}
          onChange={ props.handleDateChange }
          value={ props.calendarDate }
        />
        <br/> 
        <Form horizontal className="form-width">
          <FormGroup controlId="formHorizontalEmail">
            <Col sm={12}>
              <FormControl placeholder="Location" onChange={ props.handleLocationChange } value={ props.location }/>
            </Col>
          </FormGroup>
        </Form>
      </Modal.Body>
      
      <Modal.Footer>
        <Button onClick={ props.handleHideMatch }>Cancel</Button>
        <Button bsStyle="primary" onClick={ props.handleSendChallenge }>Send Challenge</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecommendedModal;