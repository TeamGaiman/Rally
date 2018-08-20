import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      email: '',
      username: '',
      fullName: '',
      phone: '',
      location: '',
      skillTier: '4',
      tierModal: false
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.toggleTierModal = this.toggleTierModal.bind(this);
  }

  toggleTierModal() {
    this.setState({ 
      tierModal: !this.state.tierModal 
    });
  }

  handleFieldChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div className='signup-form'>
          <h3>Get Started</h3>
          <Form horizontal>
            <FormGroup controlId="email">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                onChange={this.handleFieldChange}
                value={this.props.googleUserData.profile.email}
                disabled="true" 
              />
            </FormGroup>
            <FormGroup controlId="fullName" >
              <ControlLabel>Full Name</ControlLabel>
              <FormControl
                onChange={this.handleFieldChange}
                value={this.props.googleUserData.profile.name}
                disabled="true" 
              />
            </FormGroup>
            <FormGroup controlId="username" >
              <ControlLabel>Username</ControlLabel>
              <FormControl onChange={ this.handleFieldChange } />
            </FormGroup>
            <FormGroup controlId="phone">
              <ControlLabel>Phone Number</ControlLabel>
              <FormControl onChange={ this.handleFieldChange } placeholder='optional' />
            </FormGroup>
            <FormGroup controlId="location">
              <ControlLabel>Preferred Location</ControlLabel>
              <FormControl onChange={ this.handleFieldChange } placeholder='optional' />
            </FormGroup>
            <FormGroup controlId="skillTier">
              <ControlLabel>Starting Tier - <Button onClick={ this.toggleTierModal }> ❔ </Button> </ControlLabel>
              <FormControl componentClass="select" onChange={ this.handleFieldChange }>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <Link to='/matchmaker'>
                <Button type="submit" className='pull-right' >Enter Matchmaking</Button>
              </Link>
            </FormGroup>
          </Form>

          <Modal
            bsSize="large"
            className='tier-modal'
            show={this.state.tierModal}
            onHide={ this.toggleTierModal }
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
              <Button 
                onClick={this.toggleTierModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Signup;