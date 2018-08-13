import React from 'react';
import UpcomingMatches from './UpcomingMatches.jsx';
import RecentMatches from './RecentMatches.jsx';
import dummyData from '../../../dummyData/dummyData.js';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming: [],
      history: []
    };
  }

  componentDidMount() {
    this.setState({
      upcoming: dummyData.upcoming,
      history: dummyData.history
    });
  }

  render() {
    return (
      <div>
        <UpcomingMatches upcoming={this.state.upcoming} />
        <RecentMatches history={this.state.history} />
      </div>
    );
  }
}


export default Profile;