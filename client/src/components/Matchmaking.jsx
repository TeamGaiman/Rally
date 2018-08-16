import React from 'react';
import RecommendedMatches from './RecommendedMatches.jsx';
import Challenges from './Challenges.jsx';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { GET_ALL_USERS, GET_USERS_BY_TIER } from '../apollo/localQueries.js';

class Matchmaking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let tier = 1;
    return (
      <Query query={ GET_USERS_BY_TIER }
        variables={{ tier }}>
        {( { loading, error, data } ) => {
          if ( loading ) {
            return <p>Loading...</p>;
          } else if ( error ) {
            return <p>Error</p>;
          }
          console.log(data.getUsersByTier);
          return (
            <div>
              <RecommendedMatches users={ data.getUsersByTier }/>
              <Challenges />
            </div>
          );
        }}
      </Query>
    );
  }
}


export default Matchmaking;