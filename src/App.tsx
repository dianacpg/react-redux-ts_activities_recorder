// React
import { ReactElement } from "react";
// Style
import "./App.scss";
// Components
import Recorder from "./components/recorder";
import Calendar from "./components/calendar";

function App(): ReactElement {
  return (
    <div className="app">
      <Recorder />
      <Calendar />
    </div>
  );
}

export default App;
