import useModuleActions from "../hooks/Module/useModuleActions";
import { ModuleFromBD } from "../../../types";
import useModule from "../hooks/Module/useModule";
import { useEffect, useState } from "react";
import useUser from "../hooks/User/useUser";
import { useNavigate, useLocation } from "react-router-dom";
import { messageType } from "../../typeEnum";

type module = Omit<ModuleFromBD, "sensors">;

type LocationState = {
  state: module;
};

const RegisterEditModule = () => {
  //CONTROL DE LOGEO
  const { isLogged, isAdministrator } = useUser();
  const navigate = useNavigate();
  const location = useLocation() as LocationState;

  //MODULE ACTIONS
  const { registerModuleOnBD, updateModule } = useModuleActions();

  // MODULOS REDUCER PARA REGISTRAR
  const { registerModule, setChipID, setName, setUbication, setActive } =
    useModule();

  //Register mode
  const [isRegister, setIsRegister] = useState(true);
  //Title
  const [title, setTitle] = useState("Registro de Módulo");

  useEffect(() => {
    if (!(isLogged && isAdministrator === "true")) {
      navigate("/login");
      return;
    }

    if (location.state) {
      const { chipID, name, ubication, active } = location.state;

      setIsRegister(false);
      setChipID(chipID);
      setName(name);
      setUbication(ubication);
      setActive(active);

      setTitle("Edición de modulo");
    }
  }, []);

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value, checked } = ev.target;

    let formMod = {
      chipID: setChipID,
      name: setName,
      ubication: setUbication,
      active: setActive,
    };
    let val = name === "active" ? checked : value;

    formMod[name](val);
  };

  const handleOnSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    //Registro
    if (isRegister) {
      registerModuleOnBD({
        ...registerModule,
        sensors: [{ name: "", active: false }],
      })
        .then((res) => {
          navigate("/modules", {
            state: {
              type: messageType.success,
              message: "Modulo registrado correctamente",
            },
          });
        })
        .catch((err) => {
          navigate("/modules", {
            state: {
              type: messageType.error,
              message: "Error al registrar el modulo",
            },
          });
          console.log("ERROR", err);
        });
      return;
    }

    //EDICION DE MODULO
    updateModule({ ...registerModule, sensors: [{ name: "", active: false }] })
      .then((res) => {
        navigate("/modules", {
          state: {
            type: messageType.success,
            message: "Los cambios fueron guardados",
          },
        });
      })
      .catch((err) => {
        navigate("/modules", {
          state: {
            type: messageType.error,
            message: "Error al guardar los cambios",
          },
        });
        console.log("ERROR", err);
      });
  };

  const handleOnClickCancelRegister = () => {
    navigate("/modules");
    return;
  };

  return (
    <>
      {/*<Alert show={}>
      <Alert.Heading></Alert.Heading>
  </Alert>*/}
      <div className="container main-container">
        <p className="h2 main-title">{title}</p>
        <form className="" onSubmit={handleOnSubmit}>
          <div>
            <div hidden={!isRegister} className="form-group">
              <div className="form-floating">
                <input
                  id="chipID"
                  name="chipID"
                  type="text"
                  value={registerModule.chipID}
                  onChange={handleOnChange}
                  className="form-control  shadow-none"
                  placeholder="MAC ID"
                />
                <label htmlFor="chipID">MAC ID</label>
              </div>
            </div>
            <div className="form-floating">
              <input
                className="form-control  shadow-none"
                id="name"
                name="name"
                value={registerModule.name}
                type="text"
                onChange={handleOnChange}
                placeholder="Nombre del módulo"
              />
              <label htmlFor="name">Nombre del módulo</label>
            </div>
            <div className="form-floating">
              <input
                id="ubication"
                name="ubication"
                type="text"
                className="form-control shadow-none"
                value={registerModule.ubication}
                onChange={handleOnChange}
                placeholder="Ubicación del módulo"
              />
              <label htmlFor="ubication">Ubicación del módulo</label>
            </div>
            <div className="form-check active-check p-3">
              <input
                id="active"
                name="active"
                type="checkbox"
                className="form-check-input"
                checked={registerModule.active}
                onChange={handleOnChange}
              />
              <div className="fake-input"></div>
              <label className="form-check-label" htmlFor="active">
                Activo
              </label>
            </div>
            <div className="btn-submit-container">
              <button type="submit" className="btn submit-btn">
                Guardar
              </button>
              <button
                type="button"
                className="btn cancel-btn"
                onClick={handleOnClickCancelRegister}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterEditModule;
