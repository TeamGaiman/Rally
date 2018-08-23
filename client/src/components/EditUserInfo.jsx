import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import TierModal from './TierModal.jsx';
import { UPDATE_USER } from '../apollo/mutations.js';

class EditUserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tierModal: false,
      phone: '',
      validNumber: false
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.toggleTierModal = this.toggleTierModal.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.isValid = this.isValid.bind(this);
  }



  toggleTierModal() {
    this.setState({
      tierModal: !this.state.tierModal 
    });
  }

  handleFieldChange(e) {
    this.setState({
      [ e.target.id ]: e.target.value
    });
  }

  isValid(number) {
    var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    var digits = number.replace(/\D/g, '');
    return phoneRe.test(digits) && number[3] === '-' && number[7] === '-';

  }

  

  getValidationState() {
    const number = this.state.phone;
    // let validNumber = false;

    // const isValid = (number) => {
    //   var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    //   var digits = number.replace(/\D/g, '');
    //   return phoneRe.test(digits);
    // };

    // if (isValid(number)) {
    //   validNumber = true;
    // }
    
    if (this.isValid(number)) { 
      return 'success';
    } else {
      return 'error';
    }
    
  }

  render() {
    if ( this.props.googleUserData ) {
      return (    
        <div className='user-info-form'>
          <h3>{this.state.phone}</h3>
          <Form horizontal>
            <FormGroup controlId="email">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                onChange={ this.handleFieldChange }
                value={ this.props.googleUserData.email }
                disabled="true" 
              />
            </FormGroup>
            <FormGroup controlId="fullName" >
              <ControlLabel>Full Name</ControlLabel>
              <FormControl
                onChange={this.handleFieldChange}
                value={this.props.googleUserData.displayName}
                disabled="true" 
              />
            </FormGroup>
            <FormGroup controlId="username" >
              <ControlLabel>Username</ControlLabel>
              <FormControl onChange={ this.handleFieldChange } />
            </FormGroup>
            <FormGroup controlId="phone" validationState={this.getValidationState()}>
              <ControlLabel>Phone Number</ControlLabel>
              <FormControl onChange={ this.handleFieldChange } placeholder='optional' />
              <HelpBlock>Please use format: xxx-xxx-xxxx</HelpBlock>
            </FormGroup>
            <FormGroup controlId="location">
              <ControlLabel>Preferred Location</ControlLabel>
              <FormControl onChange={ this.handleFieldChange } placeholder='optional' />
            </FormGroup>
            <FormGroup controlId="skillTier">
              <ControlLabel>Matchmaking Tier - <Button onClick={ this.toggleTierModal }> ❔ </Button> </ControlLabel>
              <FormControl componentClass="select" onChange={ this.handleFieldChange }>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <Link to='/profile' onClick ={this.props.handleEditUserInfo}>
                <Mutation
                  mutation={ UPDATE_USER }
                  variables={{
                    email: this.props.playerData.email,
                    name: this.state.username,
                    phoneNumber: this.state.phone
                  }}>
                  { updateUser => (
                    <Button
                      type="submit"
                      className='pull-right'
                      onClick={ updateUser }
                      disabled={!this.state.validNumber}>
                      Submit
                    </Button>
                  ) }
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
    } else {
      return null;
    }
  }
}

export default EditUserInfo;