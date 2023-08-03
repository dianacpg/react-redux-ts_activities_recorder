// React
import React, { useEffect } from 'react';
// Styles
import './Calendar.css';
// Components
import EventItem from './EventItem';
// Utils
import { groupEventsByDay } from '../../lib/utils/group-events-by-day';
// Store
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUserEvents } from '../store/modules/user-events';


const Calendar = ():  React.ReactElement => {
  const dispatch = useAppDispatch()
  const userEvents = useAppSelector(state => state.userEvents)
  const events = userEvents.allIds.map((id) => userEvents.byIds[id]);
  

  let groupedEvents: ReturnType<typeof groupEventsByDay> | undefined;
  let sortedGroupKeys: string[] | undefined;
  
  if(events.length) {
    groupedEvents = groupEventsByDay(events);
    sortedGroupKeys = Object.keys(groupedEvents).sort(
      (date1, date2) => +new Date(date2) - +new Date(date1)
    );
  }

  
  useEffect(() => {
  void dispatch(fetchUserEvents())
  }, [])


  return (
    <div className="calendar">
      {!!userEvents.loading && <p>Loading...</p> }
      {groupedEvents && sortedGroupKeys && sortedGroupKeys.map((dayKey, i) => {
        const events = groupedEvents![dayKey];
        const groupDate = new Date(dayKey);
        const day = groupDate.getDate();
        const month = groupDate.toLocaleDateString(undefined, {month: 'long'})
        return(
          <div className="calendar-day" key={`calendar-day-${dayKey}-${i}`}>
            <div className="calendar-day-label">
              <span> {day} {month}</span>
            </div>
            <div className="calendar-events">
              {events.map(event => {
                return <EventItem key={`event_${event.id}`} event={event} />
              })}
              
            </div>
          </div>
        )
    })}
    </div>
    )
};

export default Calendar;
