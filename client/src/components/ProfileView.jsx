import React from 'react';
import { Jumbotron, Button, Image, ProgressBar, FormGroup, FormControl, ControlLabel, Badge, Popover, OverlayTrigger } from 'react-bootstrap';

import EditUserInfo from './EditUserInfo.jsx';
import TierInfoModal from './TierInfoModal.jsx';
import ChangeTierModal from './ChangeTierModal.jsx';
import { Mutation } from 'react-apollo';
import { UPDATE_USER } from '../apollo/mutations.js';
import Trophy1 from '../../dist/lib/trophy1.png';
import Trophy2 from '../../dist/lib/trophy2.png';
import Trophy3 from '../../dist/lib/trophy3.png';
import Trophy4 from '../../dist/lib/trophy4.png';

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleTierInfoModal: false,
      toggleTierChangeModal: false,
      editUserInfo: false,
      tierThresholds: [null, 3000, 4000, 5000, 2000]
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
    const goodSport = (
      <Popover id='popover-contained' title='Good Sport Trophy'>
        <strong>You're a joy to play with!</strong>
      </Popover>
    );
    
    const rally = (
      <Popover id='popover-contained' title='Rally Trophy'>
        <strong>You're great to rally with!</strong>
      </Popover>
    );
    
    const traveller = (
      <Popover id='popover-contained' title='Traveller Trophy'>
        <strong>You love playing at new courts!</strong>
      </Popover>
    );
    
    const greatServer = (
      <Popover id='popover-contained' title='Great Server Trophy'>
        <strong>Ace! You love serving people!</strong>
      </Popover>
    );
    
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
              <br/>
              <b>W: { this.props.playerData.wins }</b>{' '}
              <b>L: { this.props.playerData.losses }</b>
              <br/>
              {/* <b>Tier: { this.props.playerData.tier }</b> */}
              {/* <br/> */}
              <b style={{ paddingRight: '15px' }}>Trophies:</b> 

              <OverlayTrigger trigger="click" placement="bottom" overlay={ goodSport }>                
                <img src={ Trophy1 } className="trophies"/>
              </OverlayTrigger>
              <Badge className="trophy-badge">13</Badge>

              <OverlayTrigger trigger="click" placement="bottom" overlay={ rally }>                
                <img src={ Trophy2 } className="trophies"/>
              </OverlayTrigger>
              <Badge className="trophy-badge">5</Badge>
 
              <OverlayTrigger trigger="click" placement="bottom" overlay={ traveller }>                
                <img src={ Trophy3 } className="trophies"/>
              </OverlayTrigger>
              <Badge className="trophy-badge">22</Badge>

              <OverlayTrigger trigger="click" placement="bottom" overlay={ greatServer }>                
                <img src={ Trophy4 } className="trophies"/>
              </OverlayTrigger>
              <Badge className="trophy-badge">41</Badge>
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
        </Jumbotron>

        {/*--- PROFILE BODY ---*/}
        <FormGroup controlId="skillTier">
          <h3>You are currently in Skill Tier { this.props.playerData.tier }</h3>
          <Button 
            onClick={ this.toggleTierInfoModal }>
            Get info on Rally's skill tiers.
          </Button> 
        </FormGroup>

        <ProgressBar
          className="tierProg"
          min={ 1000 }
          now={ this.props.playerData.elo }
          max={ this.state.tierThresholds[this.props.playerData.tier]}
          active={ true }
          label={ 'Rank progress...' }
        />

        <FormGroup controlId="skillTier">
          <Button 
            onClick={ this.toggleTierChangeModal }>
            Ready to rank up? Need a break and want to revert to a lower tier?
          </Button> 
        </FormGroup>

        

        <TierInfoModal
          tierModal={ this.state.tierInfoModal }
          toggleTierModal={ this.toggleTierInfoModal }
        />

        <ChangeTierModal
          playerEmail={ this.props.playerData.email }
          playerTier={ this.props.playerData.tier }
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
