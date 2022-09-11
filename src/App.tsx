//import React from "react";
import Login from "./containers/Login/Login";
import UserContextProvider from "./containers/context/UserContext";

function App() {
  return (
    <UserContextProvider>
      <div>
        <Login />
      </div>
    </UserContextProvider>
  );
}

export default App;
