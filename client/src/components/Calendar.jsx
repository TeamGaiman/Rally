import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const Calendar = (props) => {

  //Reformat the upcoming matches array for the calendar
  let events = props.playerData.pendingMatches.map( ( match ) => {
    let endDate = new Date( match.startTime );
    endDate.setHours( endDate.getHours() + 3 );
    return {
      title: 'Match vs ' + match.opponent,
      startDate: new Date( match.startTime ),
      endDate
    };
  });

  return (
    <div className="calendar">
      <BigCalendar
        events={ [] }
        defaultDate={ moment().toDate() }
        step={ 60 }
        defaultView={ BigCalendar.Views.WEEK }
        views={ ['day', 'week', 'agenda'] }
        startAccessor='startDate'
        endAccessor='endDate'
        // formats={ formats }
        // showMultiDayTimes

        events={ events }
        
        onSelectEvent={ event => {
          props.toggleCalendarModal();
        }}
        // drilldownView="agenda"
      />
      
      <Modal
        bsSize="large"
        className="profile-upcoming-modal"
        show={ props.calendarModal }
        onHide={ props.toggleCalendarModal }
      >
        <Modal.Header closeButton>
          <Modal.Title >
            {ParticipantB }
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
