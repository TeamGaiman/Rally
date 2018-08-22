import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const ProfileCalendar = () => {
  return (
    <div className="calendar">
      <BigCalendar
        events={[]}
        defaultDate={moment().toDate()}
        step={60}
        view='week'
        views={['day', 'week', 'agenda']}
        startAccessor='startDate'
        endAccessor='endDate'

        events={[
          {
            'title': 'My event',
            'allDay': false,
            'startDate': new Date("Thu Aug 23 2018 20:00:00 GMT-0400 (Eastern Daylight Time)"), 
            'endDate': new Date("Thu Aug 23 2018 20:30:00 GMT-0400 (Eastern Daylight Time)"), 
          }
        ]}
        
        // onView={ () => view }
        // drilldownView="agenda"
      />
    </div>
  );
};

export default ProfileCalendar;