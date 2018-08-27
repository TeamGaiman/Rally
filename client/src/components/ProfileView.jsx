import React from 'react';
import { Jumbotron, Button, Image, ProgressBar } from 'react-bootstrap';

import EditUserInfo from './EditUserInfo.jsx';


class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editUserInfo: false,
      tierThresholds: [null, 3000, 4000, 5000]
    };

    this.handleEditUserInfo = this.handleEditUserInfo.bind(this);
  }

  handleEditUserInfo () {
    this.setState({ editUserInfo: !this.state.editUserInfo });
  }

  getEloProgress () {
    const tierThreshold = this.state.tierThresholds[this.props.playerData.tier];
    const playerElo = this.props.playerData.elo;
    return Math.floor(( playerElo / tierThreshold ) * 100 );
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
            min={ 1000 }
            now={ this.props.playerData.elo }
            max={ this.state.tierThresholds[this.props.playerData.tier]}
            active={ true }
            label={ 'Win ranked matches to move on to the next skill tier.' }
          />
        </Jumbotron>

        {( this.state.editUserInfo )
          ? <EditUserInfo { ...this.props } 
            handleEditUserInfo={ this.handleEditUserInfo }/>
          : null}
      </div>
    );
  }
}

export default ProfileView;
