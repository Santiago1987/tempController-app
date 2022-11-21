import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModuleFromBD, alert } from "../../../types";
import Loading from "../../components/Loading/Loading";
import Mensaje from "../../components/Mensajes/Mensaje";
import SensorsComponent from "../../components/Sensors/SensorsComponent";
import useModuleActions from "../hooks/Module/useModuleActions";
import useUser from "../hooks/User/useUser";
import { messageType } from "../../typeEnum";

const Sensors = () => {
  const { isLogged, logout, isAdministrator } = useUser();
  const navigate = useNavigate();

  const { getModuleList } = useModuleActions();

  const [isLoading, setIsLoading] = useState(false);

  const [moduleList, setModuleList] = useState<ModuleFromBD[]>([]);

  //USADO PARA LOS MENSAJES
  const [alert, setAlert] = useState<alert>({ type: undefined, message: "" });

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
        if (err.response.data && err.response.data.error === "token expired") {
          logout();
          navigate("/login");
          return;
        }
        //MENSAJE
        setAlert({
          type: messageType.error,
          message: "Error, no se pudo cargar los sensores",
        });
        setTimeout(() => {
          setAlert({ type: undefined, message: "" });
        }, 5000);
        console.log("Error", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="container main-container position-relative">
        {alert.type ? (
          <Mensaje tipo={alert.type} message={alert.message} />
        ) : null}
        <p className="h2 main-title">Sensores</p>
        {moduleList.map((m) => {
          return <SensorsComponent key={m.chipID} module={m} />;
        })}
      </div>
    </>
  );
};

export default Sensors;
