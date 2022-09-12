//import React from "react";
import UserContextProvider from "./containers/context/UserContext";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Header from "./components/header/Header";

function App() {
  return (
    <UserContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
