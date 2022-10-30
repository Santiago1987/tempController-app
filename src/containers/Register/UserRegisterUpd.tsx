import { useState, useEffect } from "react";
import { UserRegisterUpdInterface } from "../../../types";
import useUser from "../hooks/User/useUser";
import useRegister from "../hooks/User/useRegister";
import UserRegisterUpdComponent from "../../components/Users/UserRegisterUpdComponent";

type props = {
  user: UserRegisterUpdInterface;
  isRegister: boolean;
  reloadUsers: () => void;
};

const UserRegisterUpd = ({ user, isRegister, reloadUsers }: props) => {
  const [selectedID, setselectedID] = useState("");
  const { updUserInfo, registerUser } = useUser();
  const [display, setDiplay] = useState(false);

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
    setDiplay(false);
    setUsername("");
    setEmail("");
    setTelephone("");
    setselectedID("");
    setPassword("");
    setDiplay(true);
  };

  const handleOnClickCancelRegister = () => {
    setDiplay(false);
    setUsername("");
    setEmail("");
    setTelephone("");
    setselectedID("");
    setPassword("");
  };

  const handleOnClickSave = () => {
    setDiplay(false);
    /*let { userName, email, telephone, password } = registerValues;
    console.log("registerValues", registerValues);
    if (!(userName.length < 5 || email.length < 5 || telephone.length < 8))
      return;*/
    //REGISTRO DE USUARIO
    console.log("isRegister", isRegister);
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
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
      return;
    }

    //EDICION DE USUARIO
    updUserInfo(registerValues)
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
