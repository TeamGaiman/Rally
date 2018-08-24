import React from 'react';
import Trophies from './Trophies.jsx';
import { ProgressBar } from 'react-bootstrap';
import toNextTier from '../../../workers/toNextTier';
class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {wins: 'a'}
    };
  }

  render() {
    return (
      <div className='tierText'>
        <h3>Your Stats</h3>
        <h5>Distance to you next tier!</h5>
        <ProgressBar className='tierProg' active now={toNextTier(this.props.playerData.tier, this.props.playerData.elo)}>
        </ProgressBar>

        W: {this.props.playerData.wins} <br/>
        L: {this.props.playerData.losses} <br/>
        Elo: {this.props.playerData.elo} <br/>
        Tier: {this.props.playerData.tier}
      </div>
    );
  }
}

export default Stats;
