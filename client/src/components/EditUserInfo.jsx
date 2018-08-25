import React from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { UPDATE_USER } from '../apollo/mutations.js';
import { Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';

import TierModal from './TierModal.jsx';

class EditUserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tierModal: false,
      phoneNumber: '',
      validNumber: false,
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.toggleTierModal = this.toggleTierModal.bind(this);
    this.isValidPhoneNumber = this.isValidPhoneNumber.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
  }

  componentDidMount () {
    let { phoneNumber } = this.props.playerData;
    this.isValidPhoneNumber( phoneNumber );  
    this.setState({
      phoneNumber
    });
  }

  toggleTierModal () {
    this.setState({
      tierModal: !this.state.tierModal 
    });
  }

  handleFieldChange (e) {
    this.setState({
      [ e.target.id ]: e.target.value
    });
  }

  isValidPhoneNumber ( number ) {
    var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    var digits = number.replace(/\D/g, '');
    if ( phoneRe.test( digits ) && number[3] === '-' && number[7] === '-') {
      this.setState({
        validNumber: true
      });
    } else {
      this.setState({
        validNumber: false
      });
    }
  }

  handlePhoneNumberChange ( e ) {
    this.isValidPhoneNumber (e.target.value);
    this.setState({
      phoneNumber: e.target.value,
    });
  }

  render() {
    return ( 
      <div className="user-info-form">
        <Form horizontal>

          <FormGroup 
            controlId="email"
          >
            <ControlLabel>Email</ControlLabel>
            <FormControl
              onChange={ this.handleFieldChange }
              value={ this.props.googleUserData.email }
              disabled="true" 
            />
          </FormGroup>

          <FormGroup 
            controlId="fullName"
          >
            <ControlLabel>Full Name</ControlLabel>
            <FormControl
              onChange={ this.handleFieldChange }
              value={ this.props.googleUserData.displayName }
              disabled="true" 
            />
          </FormGroup>

          <FormGroup 
            controlId="username" 
          >
            <ControlLabel>Username</ControlLabel>
            <FormControl
              onChange={ this.handleFieldChange }
            />
          </FormGroup>

          <FormGroup 
            controlId="phoneNumber" 
            validationState={ this.state.validNumber ? 'success' : 'error'}
          >
            <ControlLabel>Phone Number</ControlLabel>
            <FormControl 
              onChange={ this.handlePhoneNumberChange }
              value={ this.state.phoneNumber }
            />
            <FormControl.Feedback />
            <HelpBlock>
              { this.state.validNumber ? null : 'Please use format: xxx-xxx-xxxx' }
            </HelpBlock>
          </FormGroup>

          <FormGroup 
            controlId="location"
          >
            <ControlLabel>Preferred Location</ControlLabel>
            <FormControl 
              placeholder="optional" 
            />
          </FormGroup>

          <FormGroup controlId="skillTier">
            <ControlLabel>
              Matchmaking Tier - 
              <Button 
                onClick={ this.toggleTierModal }> 
              ❔ 
              </Button> 
            </ControlLabel>

            <FormControl 
              componentClass="select" 
              onChange={ this.handleFieldChange }
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </FormControl>
          </FormGroup>

          <FormGroup>
            <Link 
              to='/profile' 
              onClick ={ this.props.handleEditUserInfo }
            >
              <Mutation
                mutation={ UPDATE_USER }
                variables={{
                  email: this.props.playerData.email,
                  input: {
                    name: this.state.username,
                    phoneNumber: this.state.phoneNumber,
                    tier: this.state.skillTier
                  }
                }}>
                { updateUser => (
                  <Button
                    type="submit"
                    className="pull-right"
                    onClick={ updateUser }
                    disabled={ !this.state.validNumber }
                  >
                    Submit
                  </Button>
                )}
              </Mutation>
            </Link>
          </FormGroup>

        </Form>

        <TierModal
          tierModal={ this.state.tierModal }
          toggleTierModal={ this.toggleTierModal }
        />

      </div>
    );
  }
}

export default EditUserInfo;
