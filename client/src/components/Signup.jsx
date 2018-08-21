import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';

import TierModal from './TierModal.jsx';
import { CHECK_EMAIL_IS_UNIQUE } from '../apollo/queries.js';
import { CREATE_USER } from '../apollo/mutations.js';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      [ e.target.id ]: e.target.value
    });
  }

  render() {
    if ( this.props.googleUserData ) {
      return (    
        <div className='signup-form'>
          <h3>Get Started</h3>
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
              <Link to='/matchmaking'>
                <Mutation
                  mutation={ CREATE_USER }
                  variables={{ email: this.props.googleUserData.email }}>
                  { createUser => (
                    <Button
                      type="submit"
                      className='pull-right'
                      onClick={ createUser }>
                      Enter Matchmaking
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

export default Signup;
