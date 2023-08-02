import React, { useEffect } from 'react';
import './Calendar.css';
import { addZero } from '../../lib/utils';
import EventItem from './EventItem';
import { UserEvent } from '../../lib/services';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUserEvents } from '../store/modules/user-events';


export const createDateKey = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDay();
  return `${year}-${addZero(month) }-${addZero(day)}`;
}

export const groupEventsByDay = (events: UserEvent[]) => {
  const groups: Record<string, UserEvent[]> = {};

  const addToGroup = (dateKey: string, event: UserEvent) => {
    if (groups[dateKey] === undefined){
      groups[dateKey] = [];
    }

    groups[dateKey].push(event);
  }

  events.forEach((event) =>{
    const dateStartKey = createDateKey(new Date(event.dateStart));
    const dateEndKey = createDateKey(new Date(event.dateEnd));

    addToGroup(dateStartKey, event);

    if (dateEndKey !== dateStartKey){
      addToGroup(dateEndKey, event);
    }
  })

  return groups;
}

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
      {groupedEvents && sortedGroupKeys && sortedGroupKeys.map(dayKey => {
        const events = groupedEvents![dayKey];
        const groupDate = new Date(dayKey);
        const day = groupDate.getDate();
        const month = groupDate.toLocaleDateString(undefined, {month: 'long'})

        return(
          <div className="calendar-day">
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
