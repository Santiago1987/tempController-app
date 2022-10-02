//import React from "react";
import UserContextProvider from "./containers/context/UserContext";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Header from "./components/header/Header";
import Login from "./containers/Login/Login";

function App() {
  return (
    <UserContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
