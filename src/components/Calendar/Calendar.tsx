// React
import React, { useEffect } from 'react';
// Styles
import './Calendar.css';
// Components
import EventItem from './EventItem';
// Store
import { useAppDispatch } from '../store/hooks';
import { fetchUserEvents } from '../store/modules/user-events';
import { selectGroupedEvents } from '../store/selectors/user-events';
import { useSelector } from 'react-redux';


const Calendar = ():  React.ReactElement => {
  const dispatch = useAppDispatch()
  const events = useSelector(selectGroupedEvents);

  
  useEffect(() => {
  void dispatch(fetchUserEvents())
  }, [])

  if (!events?.groupedEvents && !events?.sortedGroupKeys) return <p>Loading....</p>

  return (
    <div className="calendar">
      {events?.sortedGroupKeys?.map((dayKey, i) => {
        const dayEvents = events?.groupedEvents![dayKey];
        const groupDate = new Date(dayKey);
        const day = groupDate.getDate();
        const month = groupDate.toLocaleDateString(undefined, {month: 'long'})
      
        return(
          <div className="calendar-day" key={`calendar-day-${dayKey}-${i}`}>
            <div className="calendar-day-label">
              <span> {day} {month}</span>
            </div>
            <div className="calendar-events">
              {dayEvents.map(event => {
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
