import React from 'react';
import { Table, Button, ProgressBar } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import { CREATE_MATCH } from '../apollo/mutations';

import CreateChallengeModal from './CreateChallengeModal.jsx';
import matchmakeByElo from '../../dist/workers/matchmaking';
import courts from '../../dummyData/dummyCourts';
import {calcProbabilityOfWin} from '../../dist/workers/eloCalculations';

class RecommendedOpponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchedUsers: [],
      showMatch: false,
      matchClickUser: null,
      startTime: '',
      location: null,
      courts: []
    };

    this.handleMatchClick = this.handleMatchClick.bind(this);
    this.handleSendChallenge = this.handleSendChallenge.bind(this);
    this.handleHideMatch = this.handleHideMatch.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentDidMount () {
    let newMatches = matchmakeByElo( this.props.playerData.elo, this.props.users );
    this.setState({
      matchedUsers: newMatches.slice(
        newMatches.length / 2, (newMatches.length / 2) + 5
      ),
      courts
    });
  }

  handleMatchClick ( user ) {
    this.setState({
      showMatch: true,
      matchClickUser: user
    });
  }

  handleHideMatch () {
    this.setState({ showMatch: false });
  }

  handleDateChange ( e ) {
    this.setState({ startTime: e._d });
  }

  handleSendChallenge () {
    if ( this.state.startTime && this.state.location ) {
      let index = this.state.matchedUsers.indexOf( this.state.matchClickUser );
      this.state.matchedUsers.splice( index, 1 );
      this.setState({ 
        matchedUsers: this.state.matchedUsers,
        showMatch: false, 
        startTime: '',
        location: null
      });
    } else {
      window.alert( 'Fill in Date and Location' );
    }
  }

  handleLocationChange( location ) {
    this.setState({ location });
  }

  render () {
    let myElo = this.props.playerData.elo;
    return (
      <div className="matches-container">
        <h2>Recommended Opponents</h2>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Email</th>
              <th>User</th>
              <th>Win %</th>
            </tr>
          </thead>
          <tbody>
            { this.state.matchedUsers.map( matchedUser => {
              let winPercent = Math.floor(
                calcProbabilityOfWin(myElo, matchedUser.elo) * 100
              );
              return (
                <tr className="match-row" key={ matchedUser.id } >
                  <td> 
                    <img style={ {width: '80px'} } src={ matchedUser.image }/>
                    { matchedUser.email }
                  </td>
                  <td>{ matchedUser.name }</td>
                  <td><ProgressBar
                    bsStyle="warning"
                    now={ winPercent }
                    label={ `${winPercent}%` } /></td>
                  <td>
                    <Button 
                      bsStyle="primary"
                      onClick={ () => this.handleMatchClick( matchedUser )}>
                      Challenge
                    </Button>
                  </td>
                </tr>
              );
            })
            }
          </tbody>
        </Table>

        { this.state.showMatch
          ? <Mutation
            mutation={ CREATE_MATCH }
            update={ this.handleSendChallenge }
            variables={{
              input: {
                challenger: this.props.playerData.email,
                opponent: this.state.matchClickUser.email,
                startTime: this.state.startTime,
                location: this.state.location
              }
            }}>
            { createMatch => (
              <CreateChallengeModal 
                showMatch={ this.state.showMatch }
                handleHideMatch={ this.handleHideMatch }
                matchClickUser={ this.state.matchClickUser }
                handleDateChange={ this.handleDateChange }
                startTime={ this.state.startTime }
                handleLocationChange={ this.handleLocationChange }
                location={ this.state.location }
                courts = { this.state.courts }
                createMatch={ createMatch }
              />
            )}
          </Mutation>
          : null }
      </div>
    );
  }
}

export default RecommendedOpponents;
