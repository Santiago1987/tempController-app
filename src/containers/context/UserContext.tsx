import React, { useState, createContext } from "react";
import { userContextType } from "../../../types";

interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext<userContextType | null>(null); // este valor es el que accede un elemento que no esta dentro del context

const UserProvider: React.FC<Props> = ({ children }) => {
  const [jwt, setJWT] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ jwt, setJWT }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
