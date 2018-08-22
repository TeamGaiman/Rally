import React from 'react';
import { Jumbotron, Button, Image } from 'react-bootstrap';
import UpcomingMatches from './UpcomingMatches.jsx';
import RecentMatches from './RecentMatches.jsx';
import ProfileInfo from './ProfileInfo.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming: [],
      history: [],
      showProfileInfo: false
    };
    this.handleProfileLinkClick = this.handleProfileLinkClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleProfileLinkClick() {
    this.setState({showProfileInfo: true});
  }

  handleSubmit() {
    this.setState({showProfileInfo: false});
  }

  render() {
    const showProfileInfo = this.state.showProfileInfo;
    let view1, view2;

    if (showProfileInfo) {
      view1 = <ProfileInfo 
        handleSubmit={this.handleSubmit}
        userProfile={this.props.userProfile}
      />;
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