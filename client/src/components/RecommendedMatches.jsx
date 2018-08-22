import React from 'react';
import { Table } from 'react-bootstrap';

import RecommendedModal from './RecommendedModal.jsx';
import { Mutation } from 'react-apollo';
import { CREATE_MATCH } from '../apollo/mutations.js';
import matchmakeByElo from '../../../workers/matchmaking.js';

class RecommendedMatches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchedUsers: [],
      showMatch: false,
      matchClickUser: null,
      startTime: '',
      location: ''
    };

    this.handleMatchClick = this.handleMatchClick.bind(this);
    this.handleSendChallenge = this.handleSendChallenge.bind(this);
    this.handleHideMatch = this.handleHideMatch.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentDidMount() {
    console.log('userData ', this.props.playerData)
    let newMatches = matchmakeByElo(2000, this.props.users);
    this.setState({
      matchedUsers: newMatches
    });
  }

  handleMatchClick(user) {
    console.log(user);
    this.setState({
      showMatch: true,
      matchClickUser: user
    });
  }

  handleHideMatch() {
    this.setState({ showMatch: false });
  }

  handleDateChange(e) {
    this.setState({ startTime: e._d });
  }

  handleSendChallenge() {
    if (this.state.startTime && this.state.location) {
      let index = this.state.matchedUsers.indexOf(this.state.matchClickUser);
      this.state.matchedUsers.splice(index, 1);
      this.setState({ 
        matchedUsers: this.state.matchedUsers,
        showMatch: false, 
        startTime: '',
        location: ''
      });
    } else {
      window.alert('Fill in Date and Location');
    }
  }

  handleLocationChange(e) {
    this.setState({ location: e.target.value });
  }

  render() {
    return (
      <div className='matches-container'>
        <h2>Recommended Matches</h2>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>User</th>
              <th>Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            { this.state.matchedUsers.slice(0, 5).map( matchedUser => (
              <tr className='match-row' key={ matchedUser.id } onClick={ () => this.handleMatchClick( matchedUser ) }>
                <td>{ matchedUser.name }</td>
                <td>{ matchedUser.phoneNumber }</td>
                <td>{ matchedUser.email }</td>
              </tr>
            ))}
          </tbody>
        </Table>

        { this.state.showMatch
          ? <Mutation
            mutation={ CREATE_MATCH }
            variables={{ 
              participantA: this.props.playerData.email, 
              participantB: this.state.matchClickUser.email, 
              startTime: this.state.startTime, 
              location: this.state.location
            }}
            update={ this.handleSendChallenge }
          >
            { createMatch => (
              <RecommendedModal 
                showMatch={ this.state.showMatch }
                handleHideMatch={ this.handleHideMatch }
                matchClickUser={ this.state.matchClickUser }
                handleDateChange={ this.handleDateChange }
                startTime={ this.state.startTime }
                handleLocationChange={ this.handleLocationChange }
                location={ this.state.location }
                createMatch={ createMatch }
              />
            )}
          </Mutation>
          : null }

      </div>
    );
  }
}

export default RecommendedMatches;