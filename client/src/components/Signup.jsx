import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
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
      skillTier: '4'
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleSkillSelect = this.handleSkillSelect.bind(this);
    this.handlehandleFullName = this.handlehandleFullName.bind(this);
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
              <ControlLabel>Starting Tier</ControlLabel>
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
        </div>
      );
    } else {
      return null;
    }
  }
}


export default Signup;