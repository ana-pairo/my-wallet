import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "../common/GlobalStyles";
import UserContext from "../contexts/UserContext";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import AddRecord from "./AddRecord";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/add/deposit" element={<AddRecord type="deposit" />} />
            <Route
              path="/add/withdrawal"
              element={<AddRecord type="withdrawal" />}
            />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

// font-family: 'Raleway', sans-serif;
// font-family: 'Saira Stencil One', cursive;
