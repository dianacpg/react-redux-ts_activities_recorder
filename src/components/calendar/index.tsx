// React
import { ReactElement } from "react";
// Components
import DayItems from "../day-items";
// Store
import { GroupedEventsData } from "../../store/selectors/user-events";
import { UserEvent } from "../../lib/services";

interface CalendarProps {
  events: GroupedEventsData | undefined;
  onDelete: (id: number) => void;
  onUpdate: (title: string, event: UserEvent) => void;
}

const Calendar = ({ events, onDelete, onUpdate }: CalendarProps): ReactElement => {
  return (
    <>
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
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        );
      })}
    </>
  );
};

export default Calendar;
