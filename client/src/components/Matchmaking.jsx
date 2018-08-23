import React from 'react';

import RecommendedOpponents from './RecommendedOpponents.jsx';
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
              <RecommendedOpponents
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