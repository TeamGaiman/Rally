import React from 'react';
import { Query } from 'react-apollo';
import { Tabs, Tab, TabList } from 'react-web-tabs';

import RecommendedOpponents from './RecommendedOpponents.jsx';
import { GET_USERS_BY_TIER, GET_CHALLENGES_BY_USER } from '../apollo/queries.js';
import Challenges from './Challenges.jsx';
import { calcProbabilityOfWin } from '../../dist/js/index';

class Matchmaking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showChallenges: false
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.getWinProbability = this.getWinProbability.bind(this);
  }
  
  componentDidMount () {
    this.props.mapDBPlayerDataToState( this.props.dbPlayerData );
  }

  handleSelect ( tabId ) {
    if ( tabId === 'one' ) {
      this.setState({
        showChallenges: false
      });
    } else {
      this.setState({
        showChallenges: true
      });
    }
  }

  getWinProbability (elo1, elo2) {
    return Math.floor( calcProbabilityOfWin( elo1, elo2 ) * 100 ) || 1;
  }

  render() {
    if ( !this.props.playerData ) {
      return <div>Loading potential opponnents...</div>;
    } else {
      return (
        <div className="matches-container">
          <Tabs
            defaultTab="one"
            onChange={(tabId) => { this.handleSelect( tabId ); }}
          >
            <TabList>
              <Tab tabFor="one">Recommended Opponents</Tab>
              <Tab tabFor="two">Challenges</Tab>
            </TabList>
          </Tabs>
        
          {this.state.showChallenges 
            ? (
              <Query query={ GET_CHALLENGES_BY_USER }
                variables={{ email: this.props.playerData.email }}
              >
                {({ loading, error, data }) => {
                  if (loading) {
                    return <p>Loading your Challenges...</p>;
                  } else if (error) {
                    return <p>Could not find any Challenges</p>;
                  }
                  return (
                    <div>
                      <Challenges
                        challengeData={ data.getUserByEmail }
                        userDataElo={ this.props.playerData.elo }
                        getWinProbability={ this.getWinProbability }
                      />
                    </div>
                  );
                }}
              </Query>
            ) : (
              <Query query={ GET_USERS_BY_TIER }
                variables={{
                  tier: this.props.playerData.tier,
                  email: this.props.playerData.email
                }}
              >
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
                        getWinProbability={ this.getWinProbability }
                      />
                    </div>
                  );
                }}
              </Query>
            )}
        </div>
      );
    }
  }
}

export default Matchmaking;
