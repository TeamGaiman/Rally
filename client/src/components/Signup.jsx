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
      openElo: false
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleSkillSelect = this.handleSkillSelect.bind(this);
    this.handlehandleFullName = this.handlehandleFullName.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }
  handleHide() {
    this.setState({ openElo: false });
  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }
  handlehandleFullName(e) {
    this.setState({ fullName: e.target.value });
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleLocation(e) {
    this.setState({ location: e.target.value });
  }
  handlePhone(e) {
    this.setState({ phone: e.target.value });
  }

  handleSkillSelect(e) {
    this.setState({skillTier: e.target.value});
  }

  handleHide() {
    this.setState({ openElo: false });
  }


  render() {
    if (this.props.loggedIn) {
      return (
        <div className='signup-form'>
          <h3>Get Started</h3>
          <Form horizontal>
            {/* *****************
            Temporarily comment out below I can figure out 
            how to auto populate from google
            **********************
            */}
            {/* <FormGroup controlId="formHorizontalEmail" >
              <ControlLabel>Email</ControlLabel>
              <FormControl onChange={ this.handleEmail }/>
            </FormGroup> */}
            {/* <FormGroup controlId="formHorizontalEmail" >
              <ControlLabel>Full Name</ControlLabel>
              <FormControl onChange={ this.handleFullName } />
            </FormGroup> */}
            <FormGroup controlId="formHorizontalUsername" >
              <ControlLabel>Username</ControlLabel>
              <FormControl type="username" value={this.state.username} onChange={this.handleUsername} />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Phone Number</ControlLabel>
              <FormControl onChange={this.handlePhone} placeholder='optional' />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Preferred Location</ControlLabel>
              <FormControl onChange={this.handleLocation} placeholder='optional' />
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Starting Tier - <Button onClick={() => this.setState({ openElo: true })}> ❔ </Button> </ControlLabel>
              <FormControl componentClass="select" onChange={this.handleSkillSelect}>
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
            show={this.state.openElo}
            onHide={this.handleHide}
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
    } else {
      return null;
    }
  }
}


export default Signup;