import React from 'react';
import RecommendedMatches from './RecommendedMatches.jsx';
import Challenges from './Challenges.jsx';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { GET_ALL_USERS } from '../apollo/localQueries.js';

class Matchmaking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Query query={ GET_ALL_USERS }>
        {( { loading, error, data } ) => {
          if ( loading ) {
            return <p>Loading...</p>;
          } else if ( error ) {
            return <p>Error</p>;
          }
          return (
            <RecommendedMatches users={ data.getAllUsers }/>
          );
        }}
      </Query>
    );
    <div>
      <div>
        <p>This is the 'Matchmaking' component</p>

        <Challenges />
      </div>
    </div>
  }
}


export default Matchmaking;