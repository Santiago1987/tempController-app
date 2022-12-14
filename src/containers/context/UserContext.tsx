import React, { useState, createContext } from "react";
import { userContextType } from "../../../types";

interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext<userContextType | null>(null); // este valor es el que accede un elemento que no esta dentro del context

const UserProvider: React.FC<Props> = ({ children }) => {
  const [jwt, setJWT] = useState<string | null>(() =>
    window.localStorage.getItem("token")
  ); //Buena practica usar funciones en los useState. Solo se ejecutan una vez

  return (
    <UserContext.Provider value={{ jwt, setJWT }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
