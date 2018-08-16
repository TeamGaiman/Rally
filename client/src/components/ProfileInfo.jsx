import React from 'react';
import { Form, FormGroup, FormControl, Col, Button, DropdownButton, MenuItem, Modal  } from 'react-bootstrap';

class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openElo: false
    };
    this.handleHide = this.handleHide.bind(this);
  }

  handleHide() {
    this.setState({ openElo: false });
  }


  render() {
    return (
      <div>
        <h3>Add Info</h3>
        <Form horizontal>
          <FormGroup controlId="formHorizontalUsername" >
            <Col sm={2}>
              Username
            </Col>
            <Col sm={4}>
              <FormControl type="username" placeholder="Username" />
            </Col>
          </FormGroup>

          <FormGroup  >
            <Col sm={2}>
              Phone Number
            </Col>
            <Col sm={4}>
              <FormControl placeholder="Phone Number" />
            </Col>
          </FormGroup>
          
          <FormGroup controlId="formHorizontalEmail" >
            <Col sm={2}>
              Location
            </Col>
            <Col sm={4}>
              <FormControl placeholder="Location" />
            </Col>
          </FormGroup>
          <DropdownButton
            bsSize="large"
            title="Elo Tier"
            id="dropdown-size-large"
          >
            <MenuItem eventKey="1">1</MenuItem>
            <MenuItem eventKey="2">2</MenuItem>
            <MenuItem eventKey="3">3</MenuItem>
            <MenuItem eventKey="4">4</MenuItem>
          </DropdownButton>
          <Button onClick={() => this.setState({ openElo: true })} bsStyle="primary" bsSize="small">
             How do I know my tier?
          </Button>
        


          <FormGroup>
            <Col smOffset={2} sm={4}>
              <Button type="submit">Submit</Button>
            </Col>
          </FormGroup>
        </Form>

        <Modal
          show={this.state.openElo}
          onHide={ this.handleHide }
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Elo Explanation
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Test text in modal
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


export default ProfileInfo;