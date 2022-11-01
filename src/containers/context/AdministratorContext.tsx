import React, { useState, createContext } from "react";
import { AdministratorContextType } from "../../../types";

interface Props {
  children: React.ReactNode;
}

export const AdministratorContext =
  createContext<AdministratorContextType | null>(null);

const AdministratorProvider: React.FC<Props> = ({ children }) => {
  const [isAdministrator, setIsAdministrator] = useState<string | null>(() =>
    window.localStorage.getItem("adm")
  );

  return (
    <AdministratorContext.Provider
      value={{ isAdministrator, setIsAdministrator }}
    >
      {children}
    </AdministratorContext.Provider>
  );
};

export default AdministratorProvider;
