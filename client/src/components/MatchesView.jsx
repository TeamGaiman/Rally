import React from 'react';
import { Query } from 'react-apollo';
import { Tabs, Tab, TabList } from 'react-web-tabs';

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
    if ( key === 'one' ) {
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
      <div className="matches-container">
          <Tabs
            defaultTab="one"
            onChange={(tabId) => { this.handleSelect( tabId ) }}
          >
            <TabList>
              <Tab tabFor="one">Matches</Tab>
              <Tab tabFor="two">Upcoming Calendar</Tab>
            </TabList>
          </Tabs>

        <Query query={ GET_SCHEDULED_BY_USER }
          variables={{ email: this.props.playerData.email }}
          pollInterval={ 500 }
        >
          {({ loading, error, data }) => {
            if (loading) {
              return <p></p>;
            } else if (error) {
              return <p>Could not find any Matches</p>;
            }
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
