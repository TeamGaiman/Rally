import React from 'react';
import { Jumbotron, Button, Image, ProgressBar, FormGroup, FormControl, ControlLabel, Badge, Popover, OverlayTrigger } from 'react-bootstrap';

import EditUserInfo from './EditUserInfo.jsx';
import TierInfoModal from './TierInfoModal.jsx';
import ChangeTierModal from './ChangeTierModal.jsx';
import Trophy1 from '../../dist/lib/trophy1.png';
import Trophy2 from '../../dist/lib/trophy2.png';
import Trophy3 from '../../dist/lib/trophy3.png';
import Trophy4 from '../../dist/lib/trophy4.png';

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleTierInfoModal: false,
      toggleTierChangeModal: false,
      editUserInfo: false,
      tierThresholds: [null, 3000, 4000, 5000, 2000]
    };

    this.handleEditUserInfo = this.handleEditUserInfo.bind(this);
    this.toggleTierInfoModal = this.toggleTierInfoModal.bind(this);
    this.toggleTierChangeModal = this.toggleTierChangeModal.bind(this);
    this.tierGauge = this.tierGauge.bind(this);
  }

  componentDidMount() {
    this.tierGauge();
  }
  handleEditUserInfo () {
    this.setState({ editUserInfo: !this.state.editUserInfo });
  }

  toggleTierInfoModal () {
    this.setState({
      tierInfoModal: !this.state.tierInfoModal 
    });
  }

  toggleTierChangeModal () {
    this.setState({
      tierChangeModal: !this.state.tierChangeModal 
    });
  }

  tierGauge () {
    c3.generate({
      bindto: '#tier-gauge',
      data: {
        columns: [
          ['Tier progress', 70.4]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      },
      tooltip: {
        show: false
      },
      legend: {
        show: false
      },
      gauge: {
        show: false,
        label: {
          show: false,
          show: false // to turn off the min/max labels.
        },
        //    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        //    max: 100, // 100 is default
        //    units: ' %',
        //    width: 39 // for adjusting arc thickness
      },
      color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
          //            unit: 'value', // percentage is default
          //            max: 200, // 100 is default
          values: [30, 60, 90, 100]
        }
      },
      size: {
        height: 180
      }
    });
  }

  render () {
    const goodSport = (
      <Popover id='popover-trigger-hover-focus' title='Good Sport Trophy'>
        <strong>You're a joy to play with!</strong>
      </Popover>
    );
    
    const rally = (
      <Popover id='popover-trigger-hover-focus' title='Rally Trophy'>
        <strong>You're great to rally with!</strong>
      </Popover>
    );
    
    const traveller = (
      <Popover id='popover-trigger-hover-focus' title='Traveller Trophy'>
        <strong>You love playing at new courts!</strong>
      </Popover>
    );
    
    const greatServer = (
      <Popover id='popover-trigger-hover-focus'title='Great Server Trophy'>
        <strong>Ace! You love serving people!</strong>
      </Popover>
    );

    return (
      
      <div>
        {/*--- PROFILE HEADER ---*/}
        <Jumbotron className="profile-jumbotron">
          <div className="box">
            <Image 
              className="profile-pic" 
              src={ this.props.googleUserData.photoURL }
            />
            
            <div className="user-info">
              <h3>{ this.props.playerData.fullName || this.props.googleUserData.displayName }</h3>
              <br/>
              <b>W: { this.props.playerData.wins }</b>{' '}
              <b>L: { this.props.playerData.losses }</b>
              <br/>
              {/* <b>Tier: { this.props.playerData.tier }</b> */}
              {/* <br/> */}
              <b style={{ paddingRight: '15px' }}>Trophies:</b> 

              <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={ goodSport }>                
                <img src={ Trophy1 } className="trophies"/>
              </OverlayTrigger>
              <Badge className="trophy-badge">13</Badge>

              <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={ rally }>                
                <img src={ Trophy2 } className="trophies"/>
              </OverlayTrigger>
              <Badge className="trophy-badge">5</Badge>
 
              <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={ traveller }>                
                <img src={ Trophy3 } className="trophies"/>
              </OverlayTrigger>
              <Badge className="trophy-badge">2</Badge>

              <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={ greatServer }>                
                <img src={ Trophy4 } className="trophies"/>
              </OverlayTrigger>
              <Badge className="trophy-badge">0</Badge>
            </div>
          </div>

          <div style={{ visibility: this.state.editUserInfo ? 'hidden' : 'visible' }}>
            <Button
              className="edit-profile-button"
              bsSize="small"
              onClick={ this.handleEditUserInfo }
            >
              Edit Profile
            </Button>
          </div>
        </Jumbotron>

        {/*--- PROFILE BODY ---*/}
        <div className="matches-container">
          <FormGroup controlId="skillTier">
            <h3>You are currently in Skill Tier { this.props.playerData.tier }</h3>
            <Button 
              onClick={ this.toggleTierInfoModal }>
              Get info on Rally's skill tiers.
            </Button> 
          </FormGroup>

          <ProgressBar
            className="tierProg"
            min={ 1000 }
            now={ this.props.playerData.elo }
            max={ this.state.tierThresholds[this.props.playerData.tier]}
            active={ true }
            label={ 'Rank progress...' }
          />

          <div id="tier-gauge"></div>
          { this.tierGauge() }

          

          <FormGroup controlId="skillTier">
            <Button 
              onClick={ this.toggleTierChangeModal }>
              Ready to rank up? Need a break and want to revert to a lower tier?
            </Button> 
          </FormGroup>

          

          <TierInfoModal
            tierModal={ this.state.tierInfoModal }
            toggleTierModal={ this.toggleTierInfoModal }
          />

          <ChangeTierModal
            playerEmail={ this.props.playerData.email }
            playerTier={ this.props.playerData.tier }
            playerElo={ this.props.playerData.elo }
            playerTierThreshold={ this.state.tierThresholds[this.props.playerData.tier] }
            tierModal={ this.state.tierChangeModal }
            toggleTierModal={ this.toggleTierChangeModal }
          />

          {( this.state.editUserInfo )
            ? <EditUserInfo { ...this.props } 
              handleEditUserInfo={ this.handleEditUserInfo }/>
            : null}
      </div>
      </div>
    );
  }
}

export default ProfileView;
