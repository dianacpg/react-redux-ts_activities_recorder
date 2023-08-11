// React
import { ReactElement, useState } from "react";
// Styles
import styles from "./styles/day-items.module.scss";
// Components
import EventItem from "../event-item";
// Store
import { UserEvent } from "../../lib/services";

interface DayItemsProps {
  month: string;
  day: string | number;
  events: UserEvent[];
  onDelete: (id: number) => void;
  onUpdate: (title: string, event: UserEvent) => void;
}

const DayItems = ({ day, month, events, onDelete, onUpdate }: DayItemsProps): ReactElement => {
  const initialEventsToShow = 3;
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleExpansion = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={styles["day-items"]}>
      <div className={styles["day-items__date"]}>
        <p className={styles["day-items__month"]}>{month}</p>
        <h1 className={styles["day-items__day"]}>{day}</h1>
      </div>
      <div className={styles["day-items__events-container"]}>
        <div className={styles["day-items__events"]}>
          {events.slice(0, !isCollapsed ? undefined : initialEventsToShow).map((event) => (
            <EventItem
              key={`event_${event.id}`}
              event={event}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
        {events.length > initialEventsToShow && (
          <button
            name="expand-items"
            className={styles["day-items__events-button"]}
            onClick={toggleExpansion}
          >
            {isCollapsed ? "expand" : "collapse"}
          </button>
        )}
      </div>
    </div>
  );
};

export default DayItems;
