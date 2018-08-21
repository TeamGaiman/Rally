import React from 'react';
import { Jumbotron, Button, Grid, Row, Col, Image } from 'react-bootstrap';
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
          <Grid>
            <Row className="show-grid">
              <Col xs={12} md={6}>
                <div className="box">
                  <Image className="profile-pic" src={ this.props.userData.photoURL } responsive />
                  <div>
                    <h2>{ this.props.userData.displayName }</h2>
                    W: 12 L: 2
                    <br/>
                    Tier: 3
                    <br/>
                    Trophies:
                  </div>
                </div>
              </Col>
            </Row>
          </Grid>

        </Jumbotron>
        <div>
          {this.state.showProfileInfo 
            ? null 
            : <div>
              <Button 
                className="edit-profile-button"
                bsSize="small" 
                bsStyle="success"
                onClick={this.handleProfileLinkClick}
              >
                Edit Profile
              </Button>
            </div>}
        </div>
        {view1}
        {view2}
        
      </div>
    );
  }
}


export default Profile;