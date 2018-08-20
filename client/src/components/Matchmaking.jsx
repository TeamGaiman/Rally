import React from 'react';
import RecommendedMatches from './RecommendedMatches.jsx';
import Challenges from './Challenges.jsx';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { GET_ALL_USERS, GET_USERS_BY_TIER, CHECK_EMAIL_IS_UNIQUE } from '../apollo/queries.js';

class Matchmaking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        tier: 1
      }
    };
  }

  componentDidMount () {
    this.props.mapGoogleDataToProfile();
    console.log(this.props.testState);
  }

  render () {
    return (
      <Query query={ GET_USERS_BY_TIER }
        variables={ this.state.player }>
        {( { loading, error, data } ) => {
          if ( loading ) {
            return <p>Loading...</p>;
          } else if ( error ) {
            return <p>Error</p>;
          }
          return (
            <div>
              <RecommendedMatches users={ data.getUsersByTier }/>
              <Challenges/>
            </div>
          );
        }}
      </Query>
    );
  }
}


export default Matchmaking;