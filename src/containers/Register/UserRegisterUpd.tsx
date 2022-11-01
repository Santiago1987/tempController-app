import { useState, useEffect } from "react";
import { UserRegisterUpdInterface } from "../../../types";
import useUser from "../hooks/User/useUser";
import useRegister from "../hooks/User/useRegister";
import UserRegisterUpdComponent from "../../components/Users/UserRegisterUpdComponent";

type props = {
  user: UserRegisterUpdInterface;
  reloadUsers: () => void;
};

const UserRegisterUpd = ({ user, reloadUsers }: props) => {
  const [selectedID, setselectedID] = useState("");
  const { updUserInfo, registerUser } = useUser();
  const [display, setDiplay] = useState(false);

  //BANDERA PARA SAVER SI ESTA EN EDITING MODE
  const [isRegister, setIsRegister] = useState(false);

  //REGISTER AND UPDATE COMPONENT
  const { registerValues, setUsername, setEmail, setTelephone, setPassword } =
    useRegister();

  useEffect(() => {
    let { id, userName, email, telephone, password } = user;
    setUsername(userName);
    setEmail(email);
    setTelephone(telephone);
    setselectedID(id);
    setPassword(password);

    if (id !== "") setDiplay(true);
  }, [user]);

  //-------------------------------------------------------------------------
  const handleOnClickRegister = (): void => {
    setIsRegister(true);
    setDiplay(true);

    setUsername("");
    setEmail("");
    setTelephone("");
    setselectedID("");
    setPassword("");
  };

  const handleOnClickCancelRegister = () => {
    setDiplay(false);
    setUsername("");
    setEmail("");
    setTelephone("");
    setselectedID("");
    setPassword("");
  };

  const handleOnClickSave = (
    ev: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    ev.preventDefault();
    setDiplay(false);

    //REGISTRO DE USUARIO
    if (isRegister) {
      registerUser({ ...registerValues, id: "" })
        .then((res) => {
          reloadUsers();
        })
        .then(() => {
          setUsername("");
          setEmail("");
          setTelephone("");
          setselectedID("");
          setPassword("");
          setIsRegister(false);
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
      return;
    }

    //EDICION DE USUARIO
    updUserInfo({ ...registerValues, id })
      .then((res) => {
        reloadUsers();
      })
      .catch((err) => console.log(`Error editing: ${err}`));
    return;
  };
  //-------------------------------------------------------------------------

  const handleOnChangeUser = (
    ev: React.ChangeEvent<HTMLInputElement>
  ): void => {
    let { name, value } = ev.target;
    if (name.length > 20) return;
    let formMod = {
      userName: setUsername,
      email: setEmail,
      telephone: setTelephone,
      password: setPassword,
    };

    formMod[name](value);
  };

  return (
    <>
      <button onClick={handleOnClickRegister} hidden={display}>
        Registrar nuevo usuario
      </button>
      {display ? (
        <UserRegisterUpdComponent
          handleOnClickCancelRegister={handleOnClickCancelRegister}
          handleOnClickSave={handleOnClickSave}
          handleOnChangeUser={handleOnChangeUser}
          userInfo={{ ...registerValues, id: selectedID }}
          isRegister={isRegister}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default UserRegisterUpd;
