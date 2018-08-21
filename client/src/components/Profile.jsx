import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import UpcomingMatches from './UpcomingMatches.jsx';
import RecentMatches from './RecentMatches.jsx';
import dummyData from '../../../dummyData/dummyData.js';
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

  componentDidMount() {
    
    this.setState({
      upcoming: dummyData.upcoming,
      history: dummyData.history
    });
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
      view1 = <ProfileInfo handleSubmit={this.handleSubmit}/>;
    } else {
      view1 = <UpcomingMatches upcoming={this.state.upcoming} />;
      view2 = <RecentMatches history={this.state.history} />;
    }

    return (
      <div>
        <Jumbotron className="jumbotron">
          <p>
            Stats:
            <br/>
            Tier
            <br/>
            Trophies
          </p>
          <p>
            {this.state.showProfileInfo 
              ? null 
              : <div>
                <Button bsStyle="primary" onClick={this.handleProfileLinkClick}>Edit Profile</Button>
              </div>}
          </p>
        </Jumbotron>
        
        {view1}
        {view2}
        
      </div>
    );
  }
}


export default Profile;