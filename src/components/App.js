import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import GlobalStyle from "../common/GlobalStyles";
import UserContext from "../contexts/UserContext";
import TokenContext from "../contexts/TokenContext";
import Register from "./Register";
import Login from "./Login";

export default function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

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
            <Route path="/sign-up" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

// font-family: 'Raleway', sans-serif;
// font-family: 'Saira Stencil One', cursive;
