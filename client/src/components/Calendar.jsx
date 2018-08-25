import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const Calendar = (props) => {
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
      
        events={[
          {
            'title': 'ParticipantB',
            'startDate': new Date('Fri Aug 24 2018 20:00:00 GMT-0400 (Eastern Daylight Time)'), 
            'endDate': new Date('Fri Aug 24 2018 20:30:00 GMT-0400 (Eastern Daylight Time)'), 
          },
          {
            'title': 'ParticipantB',
            'startDate': new Date('Sat Aug 25 2018 20:00:00 GMT-0400 (Eastern Daylight Time)'), 
            'endDate': new Date('Sat Aug 25 2018 20:30:00 GMT-0400 (Eastern Daylight Time)'), 
          },
        ]}
        
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
            ParticipantB 
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
