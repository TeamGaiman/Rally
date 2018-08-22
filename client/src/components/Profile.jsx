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
    this.setState({editUserInfo: !this.state.editUserInfo});
  }

  render() {
    const editUserInfo = this.state.editUserInfo;
    let view1, view2;

    if (editUserInfo) {
      view1 = <EditUserInfo { ...this.props } handleEditUserInfo = {this.handleEditUserInfo} />;
    } else {
      view1 = <UpcomingMatches upcoming={this.state.upcoming} />;
      view2 = <RecentMatches history={this.state.history} />;
    }

    return (
      <div>
        <Jumbotron className="profile-jumbotron">
          <div className="box">
            <Image className="profile-pic" src={ this.props.googleUserData.photoURL } circle />
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
            {this.state.editUserInfo 
              ? null 
              : <div>
                <Button 
                  className="edit-profile-button"
                  bsSize="xsmall" 
                  onClick={this.handleEditUserInfo}
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