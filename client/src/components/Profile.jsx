import React from 'react';
import { Jumbotron, Button, Grid, Row, Col, Image } from 'react-bootstrap';
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
        <Jumbotron className="jumbotron">
          <Grid>
            <Row className="show-grid">
              <Col xs={12} md={6}>
                <div className="box">
                  <Image className="profile-pic" src={ this.props.googleUserData.photoURL } responsive />
                  <div>
                    <h2>{ this.props.googleUserData.displayName }</h2>
                    W: { this.props.playerData.wins } L: { this.props.playerData.losses }
                    <br/>
                    Tier: 
                    <br/>
                    Trophies:
                    <div>
                      {this.state.editUserInfo
                        ? null
                        : 
                        <Button
                          className="edit-profile-button"
                          bsSize="small"
                          onClick={this.handleEditUserInfo}
                        >
                          Edit Profile
                        </Button>
                      }
                    </div>
                
                  </div>
                 
                </div>
              </Col>
            </Row>
          </Grid>

        </Jumbotron>

        <div>
          
        </div>

        {view1}
        {view2}
        
      </div>
    );
  }
}


export default Profile;