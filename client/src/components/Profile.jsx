import React from 'react';
import { Jumbotron, Button, Image } from 'react-bootstrap';

import UpcomingMatches from './UpcomingMatches.jsx';
import RecentMatches from './RecentMatches.jsx';
import EditUserInfo from './EditUserInfo.jsx';
import ProfileCalendar from './ProfileCalendar.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming: [],
      history: [],
      editUserInfo: false,
      calendarModal: false
    };

    this.handleEditUserInfo = this.handleEditUserInfo.bind(this);
    this.toggleCalendarModal = this.toggleCalendarModal.bind(this);
  }

  handleEditUserInfo() {
    this.setState({editUserInfo: !this.state.editUserInfo});
  }

  toggleCalendarModal() {
    this.setState({
      calendarModal: !this.state.calendarModal 
    });
  }

  render() {
    const editUserInfo = this.state.editUserInfo;
    let view1, view2;

    if (editUserInfo) {
      view1 = <EditUserInfo { ...this.props } handleEditUserInfo = {this.handleEditUserInfo} />;
    } else {
      // view1 = <UpcomingMatches upcoming={this.state.upcoming} />;
      // view2 = <RecentMatches history={this.state.history} />;
      view1 = <ProfileCalendar
        calendarModal={this.state.calendarModal}
        toggleCalendarModal={this.toggleCalendarModal}
      />;
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
            <div style={{ visibility: this.state.editUserInfo ? 'hidden' : 'visible' }} >
              <Button
                className="edit-profile-button"
                bsSize="small"
                onClick={this.handleEditUserInfo}
              >
                Edit Profile
              </Button>
            </div>
        </Jumbotron>

        {view1}
        {view2}
        
      </div>
    );
  }
}


export default Profile;