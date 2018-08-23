import React from 'react';
import Trophies from './Trophies.jsx';
import Map from './Map.jsx';
import courts from '../../dummyData/dummyCourts.js';
class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {wins: 'a'}
    };
  }

  render() {
    return (
      <div>
        <Map courts ={ courts } />
        W: {this.state.stats.wins} <br/>
        L: {this.state.stats.losses} <br/>
        Elo: {this.state.stats.elo} <br/>
        Tier: {this.state.stats.tier}
      </div>
    );
  }
}

export default Stats;
