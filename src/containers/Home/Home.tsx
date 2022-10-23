import React from "react";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../containers/hooks/User/useUser";
import { ModuleContext } from "../context/ModuleContext";

import { moduleContextType } from "../../../types";
import useModuleActions from "../hooks/Module/useModuleActions";

const Home: React.FC = () => {
  const { isLogged } = useUser();
  const navigate = useNavigate();

  const { moduleList, setModuleList } = useContext(
    ModuleContext
  ) as moduleContextType;

  useEffect(() => {
    // CHECK IF USER IS LOGGED
    if (!isLogged) {
      navigate("/login");
      return;
    }

    //CHECK IF THE LIST OF MODULES IS SET
    if (!moduleList.length) {
    }
  }, []);

  return (
    <div>
      <h1>HOME</h1>
      <ul>
        {moduleList.map((m) => {
          return <li>m</li>;
        })}
      </ul>
    </div>
  );
};

export default Home;
