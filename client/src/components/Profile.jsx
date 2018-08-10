import React from 'react';
import UpcomingMatches from './UpcomingMatches.jsx';
import RecentMatches from './RecentMatches.jsx';
import Trophies from './Trophies.jsx';
import Stats from './Stats.jsx';

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
        <Trophies />
        <Stats />
      </div>
    );
  }
}


export default Profile;