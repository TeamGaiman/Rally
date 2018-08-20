import React from 'react';
import { Form, FormGroup, FormControl, Col, Button, DropdownButton, MenuItem, Modal } from 'react-bootstrap';

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
    this.setState({username: e.target.value});
  }

  handlePhoneNumberInput(e) {
    this.setState({phoneNumber: e.target.value});
  }

  handleLocationInput(e) {
    this.setState({location: e.target.value});
  }

  handleSkillSelect(e) {
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

          <FormGroup>
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
              Tier Explanation
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Tier One:</h4>
            <p>A tier one player may have just started playing tennis or is still lacking significant experience. A player in this tier may have obvious stroke weaknesses, limitted court coverage or may be able to sustain a short rally with other beginners.</p>
            <h4>Tier Two:</h4>
            <p>A tier two player can consistently hit medium-paced shots. A player in this tier may not be comfortable with all strokes although he or she may have developed dependable directional control with forehand and backhand strokes. Players on the high end of this tier may be able to occasionally force errors when serving.</p>
            <h4>Tier Three:</h4>
            <p>A tier three player should at least be starting to master power and spins. A player at this level should be beginning to handle his or her pace, control shot depth and generally adjust strategy based on his or her opponent. First serves can be executed with power and accuracy. Overhitting difficult shots may still be common at this tier.</p>
            <h4>Tier Four:</h4>
            <p>A tier four player has solid shot anticipation and frequently has an outstanding shot. Exceptional consistency, regular forcing of errors off of short balls, volleys, lobs, drop shots, half volleys and overhead smashes are all available to a player at this level. Power and consistency may be major weapons for these players as well as varying strategies and style of play.</p>
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