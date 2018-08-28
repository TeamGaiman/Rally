import React from 'react';
import { Jumbotron, Button, Image, Badge, Popover, OverlayTrigger } from 'react-bootstrap';

import EditUserInfo from './EditUserInfo.jsx';
import Stats from './Stats.jsx';
import Trophy1 from '../../dist/lib/trophy1.png';
import Trophy2 from '../../dist/lib/trophy2.png';
import Trophy3 from '../../dist/lib/trophy3.png';
import Trophy4 from '../../dist/lib/trophy4.png';

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming: [],
      history: [],
      editUserInfo: false,
      showTrophyPopover: false,
      clickedTrophy: null
    };

    this.handleEditUserInfo = this.handleEditUserInfo.bind(this);
  }

  handleEditUserInfo () {
    this.setState({ editUserInfo: !this.state.editUserInfo });
  }

  render () {
    let view;
    if ( this.state.editUserInfo ) {
      view = <EditUserInfo 
        { ...this.props } 
        handleEditUserInfo={ this.handleEditUserInfo }/>;
    } else {
      view = <Stats playerData={ this.props.playerData }/>;
    }
    
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
        <Jumbotron className="profile-jumbotron">
          <div className="box">
            <Image 
              className="profile-pic" 
              src={ this.props.googleUserData.photoURL }
            />
            
            <div className="user-info">
              <h2>{ this.props.googleUserData.displayName }</h2>
              <b>W:</b> { this.props.playerData.wins } {' '}
              <b>L:</b> { this.props.playerData.losses }
              <br/>
              <br/>
              <b>Tier:</b> { this.props.playerData.tier }
              <br/>
              <b style={{ paddingRight: '15px' }}>Trophies:</b> 

              <OverlayTrigger trigger="click" placement="bottom" overlay={ goodSport }>                
                <img src={ Trophy1 } className="trophies"/>
              </OverlayTrigger>
              <Badge className="trophy-badge">3</Badge>

              <OverlayTrigger trigger="click" placement="bottom" overlay={ rally }>                
                <img src={ Trophy2 } className="trophies"/>
              </OverlayTrigger>
              <Badge className="trophy-badge">5</Badge>
 
              <OverlayTrigger trigger="click" placement="bottom" overlay={ traveller }>                
                <img src={ Trophy3 } className="trophies"/>
              </OverlayTrigger>
              <Badge className="trophy-badge">2</Badge>

              <OverlayTrigger trigger="click" placement="bottom" overlay={ greatServer }>                
                <img src={ Trophy4 } className="trophies"/>
              </OverlayTrigger>
              <Badge className="trophy-badge">1</Badge>
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

        { view }
      </div>
    );
  }
}

export default ProfileView;
