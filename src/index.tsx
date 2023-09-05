// React DOM
import ReactDOM from "react-dom";
// Redux
import { Provider } from "react-redux";
// Style
import "./styles/index.scss";
// Components
import App from "./App";
// Store
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
