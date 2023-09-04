// React
import { ReactElement } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./views/Main";
import Error from "./views/Error";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
