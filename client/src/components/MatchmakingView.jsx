import React from 'react';
import { Query } from 'react-apollo';
import { GET_USERS_BY_TIER } from '../apollo/queries.js';

import RecommendedOpponents from './RecommendedOpponents.jsx';
import Challenges from './Challenges.jsx';

class Matchmaking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount () {
    this.props.mapDBPlayerDataToState( this.props.dbPlayerData );
  }

  render() {
    if ( !this.props.playerData ) {
      return <div>Loading with Spinner...</div>;
    } else {
      return (
        <div>
          <Query query={ GET_USERS_BY_TIER }
            variables={{ tier: 1, email: this.props.playerData.email }}>
            
            
            {({ loading, error, data }) => {
              if ( loading ) {
                return <p>Loading...</p>;
              } else if ( error ) {
                return <p>Error</p>;
              }

              return (
                <div>
                  <RecommendedOpponents
                    users={ data.getUsersByTier }
                    playerData={ this.props.playerData }
                    courts={ this.state.courts }
                  />
                </div>
              );
            }}
          </Query>

          <Challenges
            playerData={ this.props.playerData }
          />
        </div>
      );
    }
  }
}

export default Matchmaking;
