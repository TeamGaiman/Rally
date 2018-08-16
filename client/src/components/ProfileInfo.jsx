import React from 'react';
import { Form, FormGroup, FormControl, Col, Button, DropdownButton, MenuItem, Modal  } from 'react-bootstrap';

class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openElo: false,
      username: '',
      phoneNumber: '',
      location: '',
      skillTier: 'Elo Tier'
    };
    this.handleHide = this.handleHide.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePhoneNumberInput = this.handlePhoneNumberInput.bind(this);
    this.handleLocationInput = this.handleLocationInput.bind(this);
    this.handleSkillSelect = this.handleSkillSelect.bind(this);
  }

  handleHide() {
    this.setState({ openElo: false });
  }

  handleUsernameInput(e) {
    console.log(e.target.value);
    this.setState({username: e.target.value});
  }

  handlePhoneNumberInput(e) {
    this.setState({phoneNumber: e.target.value});
  }

  handleLocationInput(e) {
    this.setState({location: e.target.value});
  }

  handleSkillSelect(e) {
    console.log(e);
    this.setState({skillTier: e});
  }





  render() {
    return (
      <div>
        <h3>Add Info</h3>
        <Form horizontal>
          <FormGroup onChange={this.handleUsernameInput} controlId="formHorizontalUsername" >
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
          <DropdownButton onSelect={this.handleSkillSelect}
            bsSize="large"
            title={this.state.skillTier}
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
              <Button onClick={this.props.handleSubmit} >Submit</Button>
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