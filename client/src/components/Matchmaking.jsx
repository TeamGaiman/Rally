import React from 'react';

import RecommendedMatches from './RecommendedMatches.jsx';
import Challenges from './Challenges.jsx';
import { Query } from 'react-apollo';
import { GET_USERS_BY_TIER } from '../apollo/queries.js';

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
    this.props.mapDBPlayerDataToState( this.props.playerData );
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
              <RecommendedMatches users={ data.getUsersByTier } userData={ this.props.userData }/>
              <Challenges/>
            </div>
          );
        }}
      </Query>
    );
  }
}


export default Matchmaking;