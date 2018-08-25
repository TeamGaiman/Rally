import React from 'react';
import { Query } from 'react-apollo';

import RecommendedOpponents from './RecommendedOpponents.jsx';
import { GET_USERS_BY_TIER, GET_ALL_USERS } from '../apollo/queries.js';
import Challenges from './Challenges.jsx';
import SearchUsers from './SearchUsers.jsx';

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
          <Query query={ GET_ALL_USERS }>
            {({ loading, error, data }) => {
              if ( loading ) { console.log('loading all users'); }
              if ( error ) { console.error( error ); }
              console.log(data.getAllUsers);
              return (
                <SearchUsers
                  allUsers={ data.getAllUsers }/>
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
