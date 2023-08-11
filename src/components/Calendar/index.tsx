// React
import { ReactElement, useEffect } from "react";
// Components
import DayItems from "../day-items";
// Store
import { useAppDispatch } from "../../store/hooks";
import { deleteUserEvent, fetchUserEvents, updateUserEvent } from "../../store/modules/user-events";
import { selectGroupedEvents } from "../../store/selectors/user-events";
import { useSelector } from "react-redux";
import { UserEvent } from "../../lib/services";

const Calendar = (): ReactElement => {
  const dispatch = useAppDispatch();
  const events = useSelector(selectGroupedEvents);

  const handleDeleteEvent = (id: number) => {
    dispatch(deleteUserEvent(id));
  };

  const handleUpdateEvent = (title: string, event: UserEvent) => {
    if (title !== event.title) {
      const { id, ...updatedEvent } = event;

      dispatch(updateUserEvent({ id, dto: { ...updatedEvent, title } }));
    }
  };

  useEffect(() => {
    void dispatch(fetchUserEvents());
  }, []);

  if (!events?.groupedEvents && !events?.sortedGroupKeys) return <p>Loading...</p>;

  return (
    <div className="calendar">
      {events?.sortedGroupKeys?.map((dayKey, i) => {
        const dayEvents = events?.groupedEvents ? events?.groupedEvents[dayKey] : [];
        const groupDate = new Date(dayKey);
        const day = groupDate.getDate();
        const month = groupDate.toLocaleDateString(undefined, { month: "short" });

        return (
          <DayItems
            key={`day-item-${dayKey}-${i}`}
            day={day}
            month={month}
            events={dayEvents}
            onDelete={handleDeleteEvent}
            onUpdate={handleUpdateEvent}
          />
        );
      })}
    </div>
  );
};

export default Calendar;
