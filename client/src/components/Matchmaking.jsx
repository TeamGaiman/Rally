import React from 'react';
import RecommendedMatches from './RecommendedMatches.jsx';
import Challenges from './Challenges.jsx';

class Matchmaking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        This is the 'Matchmaking' component
        <RecommendedMatches />
        <Challenges />
      </div>
    );
  }
}


export default Matchmaking;