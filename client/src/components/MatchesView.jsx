import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Query } from 'react-apollo';

import { GET_SCHEDULED_BY_USER } from '../apollo/queries.js';
import ScheduledMatches from './ScheduledMatches.jsx';
import Calendar from './Calendar.jsx';

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

  toggleCalendarModal () {
    this.setState({
      calendarModal: !this.state.calendarModal
    });
  }

  handleSelect ( key ) {
    if ( key === 1 ) {
      this.setState({
        showCalendar: false
      });
    } else {
      this.setState({
        showCalendar: true
      });
    }
  }

  render () {
    return (
      <div>
        <Tabs
          id='search-map'
          onSelect={ this.handleSelect }
          activeKey={ this.state.showCalendar ? 2 : 1 }
        >
          <Tab eventKey={1} title='Matches'/>
          <Tab eventKey={2} title='Calendar View'/>
        </Tabs>
        <Query query={ GET_SCHEDULED_BY_USER }
          variables={{ email: this.props.playerData.email }}
          pollInterval={ 500 }
        >
          {({ loading, error, data }) => {
            if (loading) {
              return <p>Loading your Scheduled Matches...</p>;
            } else if (error) {
              return <p>Could not find any Matches</p>;
            }
            console.log(data.getUserByEmail);
            return (
              this.state.showCalendar 
                ? (
                  <Calendar
                    calendarModal={ this.state.calendarModal }
                    toggleCalendarModal={ this.toggleCalendarModal }
                    scheduledMatches={ data.getUserByEmail }
                  />
                ) : (
                  <ScheduledMatches
                    currentUser={ this.props.playerData.email }
                    scheduledMatches={ data.getUserByEmail }
                  />
                )
            );
          }}
        </Query>
      </div>
    );
  }
}

export default MatchesView;
