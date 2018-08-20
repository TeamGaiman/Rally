import React from 'react';
import { Table } from 'react-bootstrap';
import RecommendedModal from './RecommendedModal.jsx';

import matchmakeByElo from '../../../workers/matchmaking.js';

class RecommendedMatches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchedUsers: [],
      showMatch: false,
      matchClickUser: null,
      calendarDate: '',
      location: ''
    };

    this.handleMatchClick = this.handleMatchClick.bind(this);
    this.handleSendChallenge = this.handleSendChallenge.bind(this);
    this.handleHideMatch = this.handleHideMatch.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentDidMount() {
    let newMatches = matchmakeByElo(2000, this.props.users);
    this.setState({
      matchedUsers: newMatches
    });
  }

  handleMatchClick(user) {
    console.log('CLICKED??', user);
    this.setState({
      showMatch: true,
      matchClickUser: user
    });
  }

  handleHideMatch() {
    this.setState({ showMatch: false });
  }

  handleDateChange(e) {
    console.log('calendar change--', e._d);
    this.setState({ calendarDate: e._d });
  }

  handleSendChallenge() {
    if (this.state.calendarDate && this.state.location) {
      this.setState({ 
        showMatch: false, 
        calendarDate: '',
        location: ''
      });
    } else {
      window.alert('Fill out Date and Location');
    }
  }

  handleLocationChange(e) {
    console.log('location', e.target.value)
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
          ? 
          <Mutation
            mutation={ CREATE_MATCH }
          >
            { createMatch => (
              <RecommendedModal 
                showMatch={ this.state.showMatch }
                handleHideMatch={ this.handleHideMatch }
                matchClickUser={ this.state.matchClickUser }
                handleDateChange={ this.handleDateChange }
                calendarDate={ this.state.calendarDate }
                handleLocationChange={ this.handleLocationChange }
                location={ this.state.location }
                handleSendChallenge={ this.handleSendChallenge }
              />
            )}
          </Mutation>
          : null }
          

      </div>
    );
  }
}

export default RecommendedMatches;

// <Mutation
//   mutation={ CREATE_MATCH }
//   update={(cache, { data: { addTodo } }) => {
//     const { todos } = cache.readQuery({ query: GET_TODOS });
//     cache.writeQuery({
//       query: GET_TODOS,
//       data: { todos: todos.concat([addTodo]) }
//     });
//   }}
//   >
//   {addTodo => (
//     <div>
//       <form
//         onSubmit={e => {
//           e.preventDefault();
//           addTodo({ variables: { type: input.value } });
//           input.value = "";
//         }}
//       >
//         <input
//           ref={node => {
//             input = node;
//           }}
//         />
//         <button type="submit">Add Todo</button>
//       </form>
//     </div>
//   )}
// </Mutation>