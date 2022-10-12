//import React from "react";
import UserContextProvider from "./containers/context/UserContext";
import { Routes, Route } from "react-router-dom";
import "./styles/app.css";

import Home from "./components/Home/Home";
import Header from "./components/header/Header";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";

function App() {
  return (
    <UserContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
