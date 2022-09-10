import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "../common/GlobalStyles";
import UserContext from "../contexts/UserContext";
import TokenContext from "../contexts/TokenContext";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import AddRecord from "./AddRecord";

export default function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <TokenContext.Provider value={{ setToken }}>
                  <Login />
                </TokenContext.Provider>
              }
            />
            <Route
              path="/add/deposit"
              element={
                <TokenContext.Provider value={{ setToken }}>
                  <AddRecord type="deposit" />
                </TokenContext.Provider>
              }
            />
            <Route
              path="/add/withdrawal"
              element={
                <TokenContext.Provider value={{ setToken }}>
                  <AddRecord type="withdrawal" />
                </TokenContext.Provider>
              }
            />
            <Route path="/sign-up" element={<Register />} />
            <Route
              path="/home"
              element={
                <TokenContext.Provider value={{ token }}>
                  <Home />
                </TokenContext.Provider>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

// font-family: 'Raleway', sans-serif;
// font-family: 'Saira Stencil One', cursive;
