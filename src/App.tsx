// React
import { ReactElement, useEffect } from "react";
// Components
import Stopwatch from "./components/stopwatch";
import TimeTable from "./components/time-table";
// Store
import {
  createUserEvent,
  deleteUserEvent,
  fetchUserEvents,
  updateUserEvent,
} from "./store/modules/user-events";
import { useDispatch, useSelector } from "react-redux";
import { selectGroupedEvents } from "./store/selectors/user-events";
// Types
import { UserEvent } from "./lib/services";

function App(): ReactElement {
  const dispatch = useDispatch();
  const events = useSelector(selectGroupedEvents);

  const handleStopStopwatch = (dateStart: string | undefined) => {
    if (!dateStart) return;
    dispatch(createUserEvent({ dateStart }));
  };

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

  return (
    <div className="app">
      <Stopwatch onStop={(dateStart) => handleStopStopwatch(dateStart)} />
      <TimeTable
        events={events}
        onDelete={(id) => handleDeleteEvent(id)}
        onUpdate={handleUpdateEvent}
      />
    </div>
  );
}

export default App;
