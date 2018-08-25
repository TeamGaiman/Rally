import React from 'react';

import Pending from './Pending.jsx';
import Calendar from './Calendar.jsx';
import { Query } from 'react-apollo';
import { GET_CHALLENGES_BY_USER } from '../apollo/queries';
import { Tabs, Tab } from 'react-bootstrap';
class MatchesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming: [],
      history: [],
      editUserInfo: false,
      calendarModal: false,
      showCalendar: false
    };

    this.toggleCalendarModal = this.toggleCalendarModal.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  toggleCalendarModal() {
    this.setState({
      calendarModal: !this.state.calendarModal
    });
  }

  handleSelect(key) {
    console.log(key);
    if (key === 1) {
      this.setState({
        showCalendar: false
      });
    } else {
      this.setState({
        showCalendar: true
      });
    }
  }

  render() {
    return (
      <div>
        <Tabs
          id="search-map"
          onSelect={this.handleSelect}
          activeKey={this.state.showCalendar ? 2 : 1}
        >
          <Tab eventKey={1} title="Matches" />
          <Tab eventKey={2} title="Calendar View" />
        </Tabs>
        {this.state.showCalendar ? (
          <Calendar
            calendarModal={this.state.calendarModal}
            toggleCalendarModal={this.toggleCalendarModal}
          />
        ) : (
          <Pending
            playerData={this.props.playerData}
          />
        )}
      </div>
    );
  }
}

export default MatchesView;