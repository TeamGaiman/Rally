import React from 'react';

import { ProgressBar } from 'react-bootstrap';
import toNextTier from '../../../workers/toNextTier';

class Stats extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const percentToNextTier = toNextTier( this.props.playerData.tier, this.props.playerData.elo );
    return (
      <div className="tierText">
        <h3>Your Stats</h3>
        <h5>{ percentToNextTier }% to your next tier!</h5>

        <ProgressBar 
          className="tierProg" 
          striped bsStyle="info" 
          now={ percentToNextTier }>
        </ProgressBar>

        <h5>Your tier</h5>
        W: { this.props.playerData.wins }
        <br/>
        L: { this.props.playerData.losses }
        <br/>
        Elo: { this.props.playerData.elo }
        <br/>
        Tier: { this.props.playerData.tier }
      </div>
    );
  }
}

export default Stats;
