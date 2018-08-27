import React from 'react';
import { Query } from 'react-apollo';

import RecommendedOpponents from './RecommendedOpponents.jsx';
import { GET_USERS_BY_TIER, GET_CHALLENGES_BY_USER } from '../apollo/queries.js';
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

          <Query query={ GET_CHALLENGES_BY_USER }
            variables={{ email: this.props.playerData.email }}>
            {({ loading, error, data }) => {
              if ( loading ) {
                return <p>Loading your Challenges...</p>;
              } else if ( error ) {
                return <p>Could not find any Challenges</p>;
              }
              return (
                <div>
                  <Challenges
                    challengeData={ data.getUserByEmail }
                  />
                  />
                </div>
              );
            }}
          </Query>
          
        </div>
      );
    }
  }
}

export default Matchmaking;
