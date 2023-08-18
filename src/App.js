import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Card from "./components/card.js";
import Details from "./components/details.js";
import { UserContext, GlobalContext } from "./components/customContext.js";
import NotFound from "./components/notfound.js";

import Nav from "./components/nav.js";
export function App() {
  let [state, setState] = useState("");
  function inputNav(id) {
    setState(id);
  }
  return (
    <UserContext>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Card inputNav={inputNav} state={state} />}
            />
            <Route path="/video/:id" element={<Details />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext>
  );
}

export default App;
