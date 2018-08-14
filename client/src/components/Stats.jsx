import React from 'react';
import Trophies from './Trophies.jsx';
import dummyData from '../../../dummyData/dummyData.js';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {wins: 'a'}
    };
  }

  componentDidMount() {
    this.setState({
      stats: dummyData.userStats
    });
  }

  render() {
    return (
      <div>
        W: {this.state.stats.wins} <br/>
        L: {this.state.stats.losses} <br/>
        Elo: {this.state.stats.elo} <br/>
        Tier: {this.state.stats.tier}
      </div>
    );
  }
}


export default Stats;