import React from 'react';
import { Jumbotron, Button, Image, Badge, Popover, Overlay } from 'react-bootstrap';

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
      showTrophyPopover: false
    };

    this.handleEditUserInfo = this.handleEditUserInfo.bind(this);
    this.handleTrophyClick = this.handleTrophyClick.bind(this);
  }

  handleEditUserInfo () {
    this.setState({ editUserInfo: !this.state.editUserInfo });
  }

  handleTrophyClick ( ) {
    this.setState({ 
      // target: e.target, 
      showTrophyPopover: !this.state.showTrophyPopover
    });
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

              <img 
                src={ Trophy1 } 
                className="trophies" 
                onClick={ this.handleTrophyClick }/>
              <Overlay
                trigger={ ['hover', 'focus', 'click'] }
                show={ this.state.showTrophyPopover } 
                // target={ this.state.target }
                placement="bottom"
                container={ this }
                containerPadding={ 20 }
              >
                <Popover id="popover-contained" title="Popover bottom">
                  <strong>Holy guacamole!</strong> Check this info.
                </Popover>
              </Overlay>

              <Badge className="trophy-badge">42</Badge>

              <img src={ Trophy2 } className="trophies"/>
              <Badge className="trophy-badge">42</Badge>

              <img src={ Trophy3 } className="trophies"/>
              <Badge className="trophy-badge">42</Badge>

              <img src={ Trophy4 } className="trophies"/>
              <Badge className="trophy-badge">42</Badge>
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

        </Jumbotron>

        { view }
      </div>
    );
  }
}

export default ProfileView;
