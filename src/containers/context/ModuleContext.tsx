import React, { useState, createContext } from "react";
import { moduleContextType } from "../../../types";

interface Props {
  children: React.ReactNode;
}

export const ModuleContext = createContext<moduleContextType | null>(null);

const ModuleProvider: React.FC<Props> = ({ children }) => {
  const [moduleList, setModuleList] = useState<string[]>([]);

  return (
    <ModuleContext.Provider value={{ moduleList, setModuleList }}>
      {children}
    </ModuleContext.Provider>
  );
};

export default ModuleProvider;
