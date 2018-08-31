import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import TierInfoModal from './TierInfoModal.jsx';
import { CREATE_USER } from '../apollo/mutations.js';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tierInfoModal: false
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.toggleTierInfoModal = this.toggleTierInfoModal.bind(this);
  }

  toggleTierInfoModal () {
    this.setState({
      tierModal: !this.state.tierModal 
    });
  }

  handleFieldChange ( e ) {
    this.setState({
      [ e.target.id ]: e.target.value
    });
  }

  render () {
    if ( this.props.googleUserData ) {
      return (    
        <div className="signup-form center-text">
          <h3>Get Started</h3>
          <Form horizontal>

            <FormGroup controlId="email">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                onChange={ this.handleFieldChange }
                value={ this.props.googleUserData.email }
                disabled="true"/>
            </FormGroup>

            <FormGroup controlId="fullName" >
              <ControlLabel>Full Name</ControlLabel>
              <FormControl
                onChange={ this.handleFieldChange }
                value={ this.props.googleUserData.displayName }
                disabled="true"/>
            </FormGroup>

            <FormGroup controlId="username" >
              <ControlLabel>Username</ControlLabel>
              <FormControl
                onChange={ this.handleFieldChange } />
            </FormGroup>

            <FormGroup controlId="phone">
              <ControlLabel>Phone Number</ControlLabel>
              <FormControl
                onChange={ this.handleFieldChange }
                placeholder="optional"/>
            </FormGroup>

            <FormGroup controlId="location">
              <ControlLabel>Preferred Location</ControlLabel>
              <FormControl
                onChange={ this.handleFieldChange }
                placeholder="optional"/>
            </FormGroup>

            <FormGroup controlId="skillTier">
              <ControlLabel>
                Starting Tier - 
                <Button onClick={ this.toggleTierInfoModal }> ❔ </Button>
              </ControlLabel>
              <FormControl 
                componentClass="select"
                onChange={ this.handleFieldChange }>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </FormControl>
            </FormGroup>

            <FormGroup>
              <Link to="/matchmaking">
                <Mutation
                  mutation={ CREATE_USER }
                  variables={{
                    input: {
                      email: this.props.googleUserData.email,
                      image: this.props.googleUserData.photoURL,
                      name: this.state.username,
                      phoneNumber: this.state.phone,
                      tier: this.state.skillTier,
                      fullName: this.props.googleUserData.displayName
                    }
                  }}>
                  { createUser => (
                    <Button
                      type="submit"
                      className="pull-right"
                      onClick={ createUser }>
                      Enter Matchmaking
                    </Button>
                  )}
                </Mutation>
              </Link>
            </FormGroup>

          </Form>
          <TierInfoModal
            tierModal={ this.state.tierInfoModal }
            toggleTierModal={ this.toggleTierInfoModal }/>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Signup;
