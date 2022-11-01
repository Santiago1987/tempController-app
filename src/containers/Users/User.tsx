import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserRegisterUpdInterface } from "../../../types";
import UserComponent from "../../components/Users/UserComponent";
import useUser from "../hooks/User/useUser";
import UserUpdatePass from "./UserUpdatePass";
import UserRegisterUpd from "../Register/UserRegisterUpd";

const User = () => {
  //LIST DE USUARIOS
  const [userList, setUserList] = useState<UserRegisterUpdInterface[]>([]);

  //COTROL DE LOGEO
  const { isLogged, logout, getUserList, deleteUser, isAdministrator } =
    useUser();
  const navigate = useNavigate();

  //BANDERA PARA INDICAR CUANDO ESTA BUSCANDO EN BD
  const [isLoading, seIsLoading] = useState(false);

  const [reloadUserList, setReloadUserList] = useState(false);

  const [passwordHide, setPasswordHide] = useState(true);

  const [selectedUser, setSelectedUser] = useState<UserRegisterUpdInterface>({
    id: "",
    userName: "",
    email: "",
    telephone: "",
    password: "",
  });

  useEffect(() => {
    if (!(isLogged && isAdministrator === "true")) {
      navigate("/login");
      return;
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

    setSelectedUser(selus);
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

  //---------------------------------------------------------
  //PASSWORD MANAGER
  const handleOnClickChangePass = (id: string): void => {
    setSelectedUser({ ...selectedUser, id });
    setPasswordHide(false);
  };

  //---------------------------------------------------------

  return (
    <>
      <h2>Usuarios</h2>
      {passwordHide ? (
        <UserRegisterUpd user={selectedUser} reloadUsers={reloadUsers} />
      ) : (
        <></>
      )}
      {passwordHide ? (
        <></>
      ) : (
        <UserUpdatePass
          id={selectedUser.id}
          setPasswordHide={setPasswordHide}
        />
      )}
      {isLoading ? (
        <h2>Loading....</h2>
      ) : (
        userList.map((us) => {
          return (
            <UserComponent
              key={us.id}
              user={{ ...us, password: "" }}
              display={false}
              handleOnClickEdit={handleOnClickEdit}
              handleOnClickDelete={handleOnClickDelete}
              hiddePass={true}
              handleOnClickChangePass={handleOnClickChangePass}
            />
          );
        })
      )}
    </>
  );
};

export default User;
