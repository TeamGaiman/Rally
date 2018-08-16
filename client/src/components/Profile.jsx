import React from 'react';
import UpcomingMatches from './UpcomingMatches.jsx';
import RecentMatches from './RecentMatches.jsx';
import dummyData from '../../../dummyData/dummyData.js';
import { Button } from 'react-bootstrap';
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
  }

  componentDidMount() {
    
    this.setState({
      upcoming: dummyData.upcoming,
      history: dummyData.history
    });
  }

  handleProfileLinkClick() {
    this.setState({showProfileInfo: true});
  }

  render() {
    const showProfileInfo = this.state.showProfileInfo;
    let view1, view2;

    if (showProfileInfo) {
      view1 = <ProfileInfo />;
    } else {
      view1 = <UpcomingMatches upcoming={this.state.upcoming} />, <RecentMatches upcoming={this.state.history} />;
      view2 = <RecentMatches history={this.state.history} />;
    }

    return (
      <div>
        {this.state.showProfileInfo ? <div></div> : <div>Want to get personalized matches? <Button onClick={this.handleProfileLinkClick} bsStyle="success">Add Profile Info</Button></div>}
        
        {view1}
        {view2}
        
      </div>
    );
  }
}


export default Profile;