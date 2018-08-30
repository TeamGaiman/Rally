import React from 'react';
import { Query } from 'react-apollo';
import { Tabs, Tab, TabList } from 'react-web-tabs';

import { GET_SCHEDULED_BY_USER } from '../apollo/queries.js';
import ScheduledMatches from './ScheduledMatches.jsx';
import Calendar from './Calendar.jsx';
import ChallengeModal from './ChallengeModal.jsx';

class MatchesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming: [],
      history: [],
      editUserInfo: false,
      challengeModalOpen: false,
      challengeClicked: null
    };

    this.toggleChallengeModal = this.toggleChallengeModal.bind(this);
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.handleChallengeClicked = this.handleChallengeClicked.bind(this);
  }

  toggleChallengeModal () {
    this.setState({
      challengeModalOpen: !this.state.challengeModalOpen
    });
  }

  handleChallengeClicked ( challengeClicked ) {
    this.setState({
      challengeClicked
    });
  }

  handleTabSelect ( tabId ) {
    if ( tabId === 'one' ) {
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
          onChange={(tabId) => { this.handleTabSelect( tabId ); }}
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
                    handleChallengeClicked={ this.handleChallengeClicked }
                    toggleChallengeModal={ this.toggleChallengeModal }
                  />
                ) : (
                  <ScheduledMatches
                    currentUser={ this.props.playerData.email }
                    scheduledMatches={ data.getUserByEmail }
                    handleChallengeClicked={ this.handleChallengeClicked }
                    toggleChallengeModal={ this.toggleChallengeModal }
                  />
                )
            );
          }}
        </Query>

        <ChallengeModal
          challenge={ this.state.challengeClicked }
          challengeModalOpen={ this.state.challengeModalOpen }
          hideChallengeModal={ this.toggleChallengeModal }
          
        />

      </div>
    );
  }
}

export default MatchesView;
