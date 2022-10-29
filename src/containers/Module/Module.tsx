import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useModuleActions from "../hooks/Module/useModuleActions";
import { ModuleFromBD } from "../../../types";
import useUser from "../hooks/User/useUser";
import ModuleComponent from "../../components/Module/ModuleComponent";
import useModule from "../hooks/Module/useModule";

type modList = Omit<ModuleFromBD, "sensors">;

const Module = () => {
  //LISTA DE MODULOS
  const [modulList, setModuleList] = useState<modList[]>([]);

  //CONTROL DE LOGEO
  const { isLogged, logout } = useUser();
  const navigate = useNavigate();

  //BANDERA PARA INDICAR CUANDO ESTA BUSCANDO EN BD
  const [isLoading, seIsLoading] = useState(false);

  //BANDERA PARA SAVER SI ESTA EN EDITING MODE
  const [isEditing, setIsEditing] = useState(false);

  //ACCIONES CON LOS MODULOS
  const { getModuleList, registerModuleOnBD, updateModule, deleteModule } =
    useModuleActions();

  //TOOGLE PARA OCULTAR O NO EL FORMA DE REGISTRO
  const [hiddRegBut, setHiddRegBut] = useState(false);

  // MODULOS REDUCER PARA REGISTRAR
  const { registerModule, setChipID, setName, setUbication, setActive } =
    useModule();

  useEffect(() => {
    if (!isLogged) {
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

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {};

  //---------------------------------------------------------
  //BOTNONES DE REGISTRO
  const handleOnClickRegister = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    setHiddRegBut(true);
    setChipID("");
    setName("");
    setUbication("");
    setActive(false);
  };

  const handleOnClickCancelRegister = () => {
    setHiddRegBut(false);
    setIsEditing(false);
  };

  //GUARDADO EN BD
  const handleOnClickSave = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    setHiddRegBut(!hiddRegBut);
    //REGISTRO DE MODULO
    if (!isEditing) {
      registerModuleOnBD({ ...registerModule, sensors: [] })
        .then((res) => {
          setModuleList([...modulList, res]);
        })
        .then(() => {
          setChipID("");
          setName("");
          setUbication("");
          setActive(false);
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
      return;
    }

    //EDICION DE MODULO
    updateModule({ ...registerModule, sensors: [] })
      .then((res) => {
        let updModList = modulList.map((m) => {
          if (m.chipID === res.chipID) {
            m = { ...m, ...res };
          }

          return m;
        });

        setModuleList(updModList);
      })
      .catch((err) => console.log(`Error editing: ${err}`));

    setIsEditing(false);
  };

  const handleOnChangeSaving = (
    ev: React.ChangeEvent<HTMLInputElement>
  ): void => {
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

  const handleOnClickEdit = (id) => {
    console.log(id);
    let moduEdit = modulList.find((m) => m.chipID === id);
    if (!moduEdit) return;

    let { chipID, name, ubication, active } = moduEdit;
    setChipID(chipID);
    setName(name);
    setUbication(ubication);
    setActive(active);
    setHiddRegBut(true);

    setIsEditing(true);
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
        console.log("errrrrrr", err);
      })
      .finally(() => seIsLoading(false));
  };

  //---------------------------------------------------------

  return (
    <>
      <h2>Lista de modulos</h2>
      <button hidden={hiddRegBut} onClick={handleOnClickRegister}>
        Registrar nuevo modulo
      </button>
      <button hidden={!hiddRegBut} onClick={handleOnClickSave}>
        Guardar cambios
      </button>
      <button hidden={!hiddRegBut} onClick={handleOnClickCancelRegister}>
        Cancelar
      </button>
      <ModuleComponent
        key={"new"}
        module={registerModule}
        handleOnChange={handleOnChangeSaving}
        display={!hiddRegBut}
        handleOnClickEdit={handleOnClickEdit}
        handleOnClickDelete={handleOnClickDelete}
        hideID={false}
      />
      {isLoading ? (
        <h2>Loading....</h2>
      ) : (
        modulList.map((mod) => {
          return (
            <ModuleComponent
              key={mod.chipID}
              module={mod}
              handleOnChange={handleOnChange}
              display={false}
              handleOnClickEdit={handleOnClickEdit}
              handleOnClickDelete={handleOnClickDelete}
              hideID={true}
            />
          );
        })
      )}
    </>
  );
};

export default Module;
