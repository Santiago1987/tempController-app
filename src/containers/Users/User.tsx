import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { UserRegisterUpdInterface, alert } from "../../../types";
import UserComponent from "../../components/Users/UserComponent";
import useUser from "../hooks/User/useUser";
import Mensaje from "../../components/Mensajes/Mensaje";

type LocationState = {
  state: alert;
};

const User = () => {
  //LIST DE USUARIOS
  const [userList, setUserList] = useState<UserRegisterUpdInterface[]>([]);

  //COTROL DE LOGEO
  const { isLogged, logout, getUserList, deleteUser, isAdministrator } =
    useUser();
  const navigate = useNavigate();
  const location = useLocation() as LocationState;

  //BANDERA PARA INDICAR CUANDO ESTA BUSCANDO EN BD
  const [isLoading, seIsLoading] = useState(false);

  const [reloadUserList, setReloadUserList] = useState(false);

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
    getUserList()
      .then((res) => {
        let result = res.map((us) => {
          let { userName, email, id, telephone } = us;
          return { userName, email, id, telephone, password: "" };
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
  }, [reloadUserList]);

  const handleOnClickEdit = (id) => {
    let selus = userList.find((us) => us.id === id);
    if (!selus) return;

    let { userName, email, telephone } = selus;
    navigate("/users/regedit", {
      state: { userName, email, telephone, id },
    });
    return;
  };

  const handleOnClickDelete = (id) => {
    if (!id) return;

    deleteUser(id)
      .then((res) => reloadUsers())
      .catch((err) => {
        if (err.response.data.error === "token expired") {
          logout();
          navigate("/login");
          return;
        }
        console.log("Error", err);
      });
  };

  const reloadUsers = () => {
    setReloadUserList(!reloadUserList);
  };

  const handleOnClickRegister = () => {
    navigate("/users/regedit");
    return;
  };

  //---------------------------------------------------------
  //PASSWORD MANAGER
  const handleOnClickChangePass = (id: string): void => {
    navigate("/users/editpass", { state: { id } });
  };

  //---------------------------------------------------------

  return (
    <>
      <div className="container main-container position-relative">
        {alert.type ? (
          <Mensaje tipo={alert.type} message={alert.message} />
        ) : (
          <></>
        )}
        <h2 className="main-title">Usuarios</h2>
        <button className="btn create-btn m-1" onClick={handleOnClickRegister}>
          Registrar nuevo usuario
        </button>
        {isLoading ? (
          <h2>Loading....</h2>
        ) : (
          userList.map((us) => {
            return (
              <UserComponent
                key={us.id}
                user={{ ...us, password: "" }}
                handleOnClickEdit={handleOnClickEdit}
                handleOnClickDelete={handleOnClickDelete}
                handleOnClickChangePass={handleOnClickChangePass}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default User;
