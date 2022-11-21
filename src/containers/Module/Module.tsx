import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useModuleActions from "../hooks/Module/useModuleActions";
import { ModuleFromBD, alert } from "../../../types";
import useUser from "../hooks/User/useUser";
import ModuleComponent from "../../components/Module/ModuleComponent";
import { FaPlus } from "react-icons/fa";
import Loading from "../../components/Loading/Loading";
import Mensaje from "../../components/Mensajes/Mensaje";
import { messageType } from "../../typeEnum";

type modList = Omit<ModuleFromBD, "sensors">;

type LocationState = {
  state: alert;
};

const Module = () => {
  //LISTA DE MODULOS
  const [modulList, setModuleList] = useState<modList[]>([]);

  //CONTROL DE LOGEO
  const { isLogged, logout, isAdministrator } = useUser();
  const navigate = useNavigate();
  const location = useLocation() as LocationState;

  //BANDERA PARA INDICAR CUANDO ESTA BUSCANDO EN BD
  const [isLoading, seIsLoading] = useState(false);

  //ACCIONES CON LOS MODULOS
  const { getModuleList, deleteModule } = useModuleActions();

  //USADO PARA LOS MENSAJES
  const [alert, setAlert] = useState<alert>({ type: undefined, message: "" });

  useEffect(() => {
    if (!(isLogged && isAdministrator === "true")) {
      navigate("/login");
      return;
    }

    //EN CASO DE REGISTRO O EDICION
    if (location.state) {
      let { type, message } = location.state;
      setAlert({ type, message });

      setTimeout(() => {
        setAlert({ type: undefined, message: "" });
        location.state = { type: undefined, message: "" };
      }, 5000);
    }

    seIsLoading(true);
    getModuleList()
      .then((res) => {
        let result = res.map((m) => {
          let { chipID, name, ubication, active } = m;
          return { chipID, name, ubication, active };
        });

        setModuleList(result);
      })
      .catch((err) => {
        if (err.response && err.response.data.error === "token expired") {
          logout();
          navigate("/login");
          return;
        }
        //MENSAJE
        setAlert({
          type: messageType.error,
          message: "Error al cargar los datos",
        });
        setTimeout(() => {
          setAlert({ type: undefined, message: "" });
        }, 5000);
      })
      .finally(() => seIsLoading(false));
  }, []);

  //---------------------------------------------------------
  //BOTNONES DE REGISTRO
  const handleOnClickRegister = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    navigate("/modules/regedit");
    return;
  };

  const handleOnClickEdit = (id) => {
    let moduEdit = modulList.find((m) => m.chipID === id);
    if (!moduEdit) return;

    let { chipID, name, ubication, active } = moduEdit;
    navigate("/modules/regedit", {
      state: { chipID, name, ubication, active },
    });
    return;
  };

  const handleOnClickDelete = (id) => {
    if (!id) return;

    deleteModule(id)
      .then(getModuleList)
      .then((res) => {
        let result = res.map((m) => {
          let { chipID, name, ubication, active } = m;
          return { chipID, name, ubication, active };
        });

        setModuleList(result);

        //MENSAJE
        setAlert({ type: messageType.success, message: "Modulo borrado" });
        setTimeout(() => {
          setAlert({ type: undefined, message: "" });
        }, 5000);
      })
      .catch((err) => {
        if (err.response.data.error === "token expired") {
          logout();
          navigate("/login");
          return;
        }

        //MENSAJE
        setAlert({
          type: messageType.error,
          message: "Error, no se pudo borrar el modulo",
        });
        setTimeout(() => {
          setAlert({ type: undefined, message: "" });
        }, 5000);
        console.log("Error", err);
      })
      .finally(() => seIsLoading(false));
  };

  //---------------------------------------------------------

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="container position-relative">
        {alert.type ? (
          <Mensaje tipo={alert.type} message={alert.message} />
        ) : null}
        <div className="modules-container">
          <div className="d-flexbox flex-column justify-content-center module-list">
            <p className="h2">Lista de módulos</p>
            <button
              type="button"
              className="btn create-btn m-1"
              onClick={handleOnClickRegister}
            >
              <FaPlus /> Nuevo modulo
            </button>
            {modulList.map((mod, index) => {
              return (
                <ModuleComponent
                  key={index}
                  module={mod}
                  handleOnClickEdit={handleOnClickEdit}
                  handleOnClickDelete={handleOnClickDelete}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Module;
