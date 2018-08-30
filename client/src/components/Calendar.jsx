import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const Calendar = (props) => {

  //Reformat the upcoming matches array for the calendar
  let events = props.scheduledMatches.pendingMatches.map( ( match ) => {
    let endDate = new Date( match.startTime );
    endDate.setHours( endDate.getHours() + 3 );

    if (props.currentUser === match.opponent) {
      var matchOpponent = match.challengerUserInfo;
    } else {
      var matchOpponent = match.opponentUserInfo;
    }

    return {
      title: 'vs ' + matchOpponent.name,
      startDate: new Date( match.startTime ),
      endDate,
      match
    };
  });

  return (
    <div className="calendar">
      <BigCalendar
        events={ [] }
        defaultDate={ moment().toDate() }
        step={ 60 }
        defaultView={ BigCalendar.Views.WEEK }
        views={ ['day', 'week'] }
        startAccessor='startDate'
        endAccessor='endDate'
        events={ events }
        
        onSelectEvent={ event => {
          props.handleChallengeClicked( event.match );
          props.toggleChallengeModal();
        }}
      />
      
      <Modal
        bsSize="large"
        className="profile-upcoming-modal"
        show={ props.calendarModal }
        onHide={ props.toggleCalendarModal }
      >
        <Modal.Header closeButton>
          <Modal.Title >
            Challenge Title
            <br/>
            W: L:
            <br/>
            Tier:
            <br/>
            Location: 
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button
            onClick={ props.toggleCalendarModal }>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Calendar;
