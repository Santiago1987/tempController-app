import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useModuleActions from "../hooks/Module/useModuleActions";
import { ModuleFromBD } from "../../../types";
import useUser from "../hooks/User/useUser";
import ModuleComponent from "../../components/Module/ModuleComponent";

type modList = Omit<ModuleFromBD, "sensors">;

const Module = () => {
  //LISTA DE MODULOS
  const [modulList, setModuleList] = useState<modList[]>([]);

  //CONTROL DE LOGEO
  const { isLogged, logout, isAdministrator } = useUser();
  const navigate = useNavigate();

  //BANDERA PARA INDICAR CUANDO ESTA BUSCANDO EN BD
  const [isLoading, seIsLoading] = useState(false);

  //ACCIONES CON LOS MODULOS
  const { getModuleList, deleteModule } = useModuleActions();

  useEffect(() => {
    if (!(isLogged && isAdministrator === "true")) {
      navigate("/login");
      return;
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
        if (err.response.data.error === "token expired") {
          logout();
          navigate("/login");
          return;
        }
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
      .then((res) => {
        seIsLoading(true);
      })
      .then(getModuleList)
      .then((res) => {
        let result = res.map((m) => {
          let { chipID, name, ubication, active } = m;
          return { chipID, name, ubication, active };
        });

        setModuleList(result);
      })
      .catch((err) => {
        if (err.response.data.error === "token expired") {
          logout();
          navigate("/login");
          return;
        }
        console.log("Error", err);
      })
      .finally(() => seIsLoading(false));
  };

  //---------------------------------------------------------

  return (
    <>
      <div className="container">
        <div className="w-50 mx-auto">
          <div className="d-flexbox flex-column justify-content-center">
            <p className="w-50 p-3 mx-auto h2">Lista de modulos</p>
            <button
              type="button"
              className="btn btn-primary m-1"
              onClick={handleOnClickRegister}
            >
              Registrar nuevo modulo
            </button>
            {isLoading ? (
              <h2>Loading....</h2>
            ) : (
              modulList.map((mod, index) => {
                return (
                  <ModuleComponent
                    key={index}
                    module={mod}
                    handleOnClickEdit={handleOnClickEdit}
                    handleOnClickDelete={handleOnClickDelete}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Module;
