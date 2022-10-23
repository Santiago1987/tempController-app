//import React from "react";
import UserContextProvider from "./containers/context/UserContext";
import ModuleProvider from "./containers/context/ModuleContext";
import { Routes, Route } from "react-router-dom";
import "./styles/app.css";

import Home from "./containers/Home/Home";
import Header from "./components/header/Navbar";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  return (
    <UserContextProvider>
      <ModuleProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ModuleProvider>
    </UserContextProvider>
  );
}

export default App;
