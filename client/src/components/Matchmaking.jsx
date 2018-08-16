import React from 'react';
import RecommendedMatches from './RecommendedMatches.jsx';
import Challenges from './Challenges.jsx';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { CHECK_EMAIL_IS_UNIQUE } from '../apollo/localQueries.js';

class Matchmaking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div>
          <p>This is the 'Matchmaking' component</p>
          <RecommendedMatches />
          <Challenges />
        </div>
      </div>
    );
  }
}


export default Matchmaking;