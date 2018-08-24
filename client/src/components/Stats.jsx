import React from 'react';
import Trophies from './Trophies.jsx';
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
        <h3>Your Stats</h3>
        W: {this.props.playerData.wins} <br/>
        L: {this.props.playerData.losses} <br/>
        Elo: {this.props.playerData.elo} <br/>
        Tier: {this.props.playerData.tier}
      </div>
    );
  }
}

export default Stats;
