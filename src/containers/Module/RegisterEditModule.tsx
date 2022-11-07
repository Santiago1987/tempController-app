import useModuleActions from "../hooks/Module/useModuleActions";
import { ModuleFromBD } from "../../../types";
import useModule from "../hooks/Module/useModule";
import { useEffect, useState } from "react";
import useUser from "../hooks/User/useUser";
import { useNavigate, useLocation } from "react-router-dom";

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
  const [title, setTitle] = useState("Registro de Modulo");

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

      setTitle("Edicion de modulo");
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
          navigate("/modules", { state: true });
        })
        .catch((err) => {
          navigate("/modules", { state: false });
          console.log("ERROR", err);
        });
      return;
    }

    //EDICION DE MODULO
    updateModule({ ...registerModule, sensors: [{ name: "", active: false }] })
      .then((res) => {
        navigate("/modules", { state: true });
      })
      .catch((err) => {
        navigate("/modules", { state: false });
        console.log("ERROR", err);
      });
  };

  const handleOnClickCancelRegister = () => {
    navigate("/modules");
    return;
  };

  return (
    <>
      <div className="container">
        <p className="w-50 p-3 mx-auto h2">{title}</p>
        <form className="w-50 p-3 mx-auto" onSubmit={handleOnSubmit}>
          <div>
            <div hidden={!isRegister} className="form-group px-3">
              <label htmlFor="chipID">MAC</label>
              <input
                id="chipID"
                name="chipID"
                type="text"
                value={registerModule.chipID}
                onChange={handleOnChange}
                className="form-control"
                placeholder="Numero de MAC"
              />
            </div>
            <div className="form-group p-3">
              <label htmlFor="name">Nombre</label>
              <input
                className="form-control"
                id="name"
                name="name"
                value={registerModule.name}
                type="text"
                onChange={handleOnChange}
                placeholder="Nombre del modulo"
              />
            </div>
            <div className="form-group p-3">
              <label htmlFor="ubication">Ubicacion</label>
              <input
                id="ubication"
                name="ubication"
                type="text"
                className="form-control"
                value={registerModule.ubication}
                onChange={handleOnChange}
                placeholder="Ubicacion del modulo"
              />
            </div>
            <div className="form-group p-3">
              <label className="form-check-label" htmlFor="active">
                Activo
              </label>
              <input
                id="active"
                name="active"
                type="checkbox"
                className="form-check-input"
                checked={registerModule.active}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-75 p-3 mx-auto">
              <button
                type="submit"
                className="btn btn-primary btn-lg m-1"
                style={{ width: "200px" }}
              >
                Guardar cambios
              </button>
              <button
                type="button"
                className="btn btn-dark btn-lg m-1"
                style={{ width: "200px" }}
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
