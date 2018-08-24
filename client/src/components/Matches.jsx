import React from 'react';

import Calendar from './Calendar.jsx';
import UpcomingMatches from './UpcomingMatches.jsx';
import { GET_USERS_BY_TIER, GET_CHALLENGES_BY_USER } from '../apollo/queries.js';

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming: [],
      history: [],
      editUserInfo: false,
      calendarModal: false
    };

    this.toggleCalendarModal = this.toggleCalendarModal.bind(this);
  }

  toggleCalendarModal() {
    this.setState({
      calendarModal: !this.state.calendarModal 
    });
  }

  render() {
    return (
      <div>
        <Calendar
          calendarModal={this.state.calendarModal}
          toggleCalendarModal={this.toggleCalendarModal}
        />
        <UpcomingMatches />
      </div>

    );
  }

}

export default Matches;