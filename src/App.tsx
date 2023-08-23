// React
import { ReactElement } from "react";
// Style
import "./App.scss";
// Components
import Recorder from "./components/recorder";
import Calendar from "./components/calendar";
import { createUserEvent } from "./store/modules/user-events";
import { useDispatch } from "react-redux";

function App(): ReactElement {
  const dispatch = useDispatch();

  return (
    <div className="app">
      <Recorder
        onStop={(dateStart: string | undefined) => {
          if (!dateStart) return;
          dispatch(createUserEvent({ dateStart }));
        }}
      />
      <Calendar />
    </div>
  );
}

export default App;
