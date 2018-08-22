import React from 'react';
import { Jumbotron, Button, Image } from 'react-bootstrap';
import UpcomingMatches from './UpcomingMatches.jsx';
import RecentMatches from './RecentMatches.jsx';
import EditUserInfo from './EditUserInfo.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming: [],
      history: [],
      editUserInfo: false
    };

    this.handleEditUserInfo = this.handleEditUserInfo.bind(this);
  }

  handleEditUserInfo() {
    this.setState({editUserInfo: true});
  }

  render() {
    const editUserInfo = this.state.editUserInfo;
    let view1, view2;

    if (editUserInfo) {
      view1 = <EditUserInfo { ...this.props } />;
    } else {
      view1 = <UpcomingMatches upcoming={this.state.upcoming} />;
      view2 = <RecentMatches history={this.state.history} />;
    }

    return (
      <div>
        <Jumbotron className="profile-jumbotron">
          <div className="box">
            <Image className="profile-pic" src={ this.props.googleUserData.photoURL }  />
            <div className="user-info">
              <h3>{ this.props.googleUserData.displayName }</h3>
              W: { this.props.playerData.wins } L: { this.props.playerData.losses }
              <br/>
              Tier: 
              <br/>
              Trophies:
              <br/>
            </div>
          </div>

          <div>
            {this.state.showProfileInfo 
              ? null 
              : <div>
                <Button 
                  className="edit-profile-button"
                  bsSize="xsmall" 
                  onClick={this.handleProfileLinkClick}
                >
                  Edit Profile
                </Button>
              </div>}
          </div>
        </Jumbotron>


        {/* <ProfileCxalendar /> */}

        {view1}
        {view2}
        
      </div>
    );
  }
}


export default Profile;