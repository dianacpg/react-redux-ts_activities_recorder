// React
import { ReactElement, useEffect } from "react";
// Components
import Stopwatch from "./components/stopwatch";
import Calendar from "./components/calendar";
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
import LoadingSpinner from "./components/loading-spinner";

function App(): ReactElement {
  const dispatch = useDispatch();
  const events = useSelector(selectGroupedEvents);
  const isLoading = events?.loading;

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
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Stopwatch onStop={(dateStart) => handleStopStopwatch(dateStart)} />
          <Calendar
            events={events}
            onDelete={(id) => handleDeleteEvent(id)}
            onUpdate={handleUpdateEvent}
          />
        </>
      )}
    </div>
  );
}

export default App;
