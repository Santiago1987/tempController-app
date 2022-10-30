//import React from "react";
import UserContextProvider from "./containers/context/UserContext";
import ModuleProvider from "./containers/context/ModuleContext";
import { Routes, Route } from "react-router-dom";
import "./styles/app.css";

import Home from "./containers/Home/Home";
import Header from "./components/header/Navbar";
import Login from "./containers/Login/Login";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Module from "./containers/Module/Module";
import User from "./containers/Users/User";

function App() {
  return (
    <UserContextProvider>
      <ModuleProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/modules" element={<Module />} />
          <Route path="/users" element={<User />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ModuleProvider>
    </UserContextProvider>
  );
}

export default App;
