import React from 'react';

import RecommendedPartners from './RecommendedPartners.jsx';
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
    // this.props.mapGoogleDataToProfile();
    this.props.mapDBPlayerDataToState( this.props.dbPlayerData );
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
              <RecommendedPartners
                users={data.getUsersByTier}
                playerData={this.props.playerData}
                courts={this.state.courts}
              />
              <Challenges/>
            </div>
          );
        }}
      </Query>
    );
  }
}


export default Matchmaking;