import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserManag } from "../../../types";
import UserComponent from "../../components/Users/UserComponent";
import useUser from "../hooks/User/useUser";

const User = () => {
  //LIST DE USUARIOS
  const [userList, setUserList] = useState<UserManag[]>([]);

  //COTROL DE LOGEO
  const { isLogged, logout, getUserList } = useUser();
  const navigate = useNavigate();

  //BANDERA PARA INDICAR CUANDO ESTA BUSCANDO EN BD
  const [isLoading, seIsLoading] = useState(false);

  //TOOGLE PARA OCULTAR O NO EL FORMA DE REGISTRO
  const [hiddRegBut, setHiddRegBut] = useState(false);

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
      return;
    }

    seIsLoading(true);
    getUserList()
      .then((res) => {
        let result = res.map((us) => {
          let { userName, email, id } = us;
          return { userName, email, id };
        });

        setUserList(result);
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
    setHiddRegBut(true);
  };

  const handleOnClickCancelRegister = () => {
    setHiddRegBut(false);
  };

  //GUARDADO EN BD
  const handleOnClickSave = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    setHiddRegBut(!hiddRegBut);
    //REGISTRO DE MODULO
  };
  //---------------------------------------------------------

  const handleOnChange = () => {};

  return (
    <>
      <h2>Usuarios</h2>
      <button hidden={hiddRegBut} onClick={handleOnClickRegister}>
        Registrar nuevo usuario
      </button>
      <button hidden={!hiddRegBut} onClick={handleOnClickSave}>
        Guardar cambios
      </button>
      <button hidden={!hiddRegBut} onClick={handleOnClickCancelRegister}>
        Cancelar
      </button>
      {isLoading ? (
        <h2>Loading....</h2>
      ) : (
        userList.map((us) => {
          return <UserComponent user={us} handleOnChange={handleOnChange} />;
        })
      )}
    </>
  );
};

export default User;
