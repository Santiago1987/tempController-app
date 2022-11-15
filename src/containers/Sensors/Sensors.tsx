import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModuleFromBD } from "../../../types";
import SensorsComponent from "../../components/Sensors/SensorsComponent";
import useModuleActions from "../hooks/Module/useModuleActions";
import useUser from "../hooks/User/useUser";

const Sensors = () => {
  const { isLogged, logout, isAdministrator } = useUser();
  const navigate = useNavigate();

  const { getModuleList } = useModuleActions();

  const [isLoading, setIsLoading] = useState(false);

  const [moduleList, setModuleList] = useState<ModuleFromBD[]>([]);

  useEffect(() => {
    if (!(isLogged && isAdministrator === "true")) {
      navigate("/login");
      return;
    }

    setIsLoading(true);
    //GET LIST OF MODULES
    getModuleList()
      .then((res) => {
        setModuleList(res);
      })
      .catch((err) => {
        if (err.response.data.error === "token expired") {
          logout();
          navigate("/login");
          return;
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Loading.....</h1>
      ) : (
        <div className="container main-container">
          <p className="h2 main-title">Sensores</p>
          {moduleList.map((m) => {
            return <SensorsComponent key={m.chipID} module={m} />;
          })}
        </div>
      )}
    </>
  );
};

export default Sensors;
