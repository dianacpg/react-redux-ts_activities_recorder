import "./App.scss";
import Recorder from "./components/recorder";
import Calendar from "./components/calendar";

function App() {
  return (
    <div className="app">
      <Recorder />
      <Calendar />
    </div>
  );
}

export default App;
