import React from 'react';
import { Jumbotron, Button, Image, ProgressBar, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import EditUserInfo from './EditUserInfo.jsx';
import TierInfoModal from './TierInfoModal.jsx';
import ChangeTierModal from './ChangeTierModal.jsx';

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleTierInfoModal: false,
      toggleTierChangeModal: false,
      editUserInfo: false,
      tierThresholds: [null, 3000, 4000, 5000]
    };

    this.handleEditUserInfo = this.handleEditUserInfo.bind(this);
    this.toggleTierInfoModal = this.toggleTierInfoModal.bind(this);
    this.toggleTierChangeModal = this.toggleTierChangeModal.bind(this);
  }

  handleEditUserInfo () {
    this.setState({ editUserInfo: !this.state.editUserInfo });
  }

  toggleTierInfoModal () {
    this.setState({
      tierInfoModal: !this.state.tierInfoModal 
    });
  }

  toggleTierChangeModal () {
    this.setState({
      tierChangeModal: !this.state.tierChangeModal 
    });
  }

  render () {
    return (
      <div>
        {/*--- PROFILE HEADER ---*/}
        <Jumbotron className="profile-jumbotron">
          <div className="box">
            <Image 
              className="profile-pic" 
              src={ this.props.googleUserData.photoURL }
            />
            
            <div className="user-info">
              <h3>{ this.props.playerData.fullName || this.props.googleUserData.displayName }</h3>
              W: { this.props.playerData.wins } 
              L: { this.props.playerData.losses }
              <br/>
              Tier: { this.props.playerData.tier }
              <br/>
              Trophies:
              <br/>
            </div>
          </div>

          <div style={{ visibility: this.state.editUserInfo ? 'hidden' : 'visible' }}>
            <Button
              className="edit-profile-button"
              bsSize="small"
              onClick={ this.handleEditUserInfo }
            >
              Edit Profile
            </Button>
          </div>

          {/*--- PROFILE BODY ---*/}
          <ProgressBar
            className="tierProg"
            min={ 1000 }
            now={ this.props.playerData.elo }
            max={ this.state.tierThresholds[this.props.playerData.tier]}
            active={ true }
            label={ 'Win ranked matches to move on to the next skill tier.' }
          />

          <FormGroup controlId="skillTier">
            <Button 
              onClick={ this.toggleTierInfoModal }>
              Get info on Rally's skill tiers.
            </Button> 
          </FormGroup>

          <FormGroup controlId="skillTier">
            <Button 
              onClick={ this.toggleTierChangeModal }>
              Change my skill tier!
            </Button> 
          </FormGroup>

        </Jumbotron>

        <TierInfoModal
          tierModal={ this.state.tierInfoModal }
          toggleTierModal={ this.toggleTierInfoModal }
        />

        <ChangeTierModal
          playerElo={ this.props.playerData.elo }
          playerTierThreshold={ this.state.tierThresholds[this.props.playerData.tier] }
          tierModal={ this.state.tierChangeModal }
          toggleTierModal={ this.toggleTierChangeModal }
        />

        {( this.state.editUserInfo )
          ? <EditUserInfo { ...this.props } 
            handleEditUserInfo={ this.handleEditUserInfo }/>
          : null}
      </div>
    );
  }
}

export default ProfileView;
