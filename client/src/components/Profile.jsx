import React from 'react';
import UpcomingMatches from './UpcomingMatches.jsx';
import RecentMatches from './RecentMatches.jsx';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        This is the 'Profile' component
        <UpcomingMatches />
        <RecentMatches />
      </div>
    );
  }
}


export default Profile;