import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const ProfileCalendar = () => {
  return (
    <div >
      <BigCalendar
        className="calendar"
        events={[]}
        startAccessor='startDate'
        endAccessor='endDate'
        defaultDate={moment().toDate()}
      />
    </div>
  );
};

export default ProfileCalendar;

//Warning: Failed prop type: The prop `events` is marked as required in `MonthView`, but its value is `undefined`.