import React from 'react';
import { Form, FormGroup, FormControl, Col, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import Mutations, { Mutation } from 'react-apollo';

import EditUserInfo from './TierModal.jsx';

class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openElo: false,
      username: '',
      phoneNumber: '',
      location: '',
      skillTier: 'Skill Tier',
      tierModal: false
    };
    this.handleHide = this.handleHide.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePhoneNumberInput = this.handlePhoneNumberInput.bind(this);
    this.handleLocationInput = this.handleLocationInput.bind(this);
    this.handleSkillSelect = this.handleSkillSelect.bind(this);
    this.toggleTierModal = this.toggleTierModal.bind(this);
  }

  toggleTierModal() {
    this.setState({
      tierModal: !this.state.tierModal 
    });
  }

  handleHide() {
    this.setState({ openElo: false });
  }

  render() {
    return (
      <div>
        <h3>Add Info</h3>
        <EditUserInfo {... props} />
      </div>
    );
  }
}

export default ProfileInfo;
