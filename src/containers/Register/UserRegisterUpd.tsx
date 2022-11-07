import { useState, useEffect } from "react";
import { UserRegisterUpdInterface } from "../../../types";
import useUser from "../hooks/User/useUser";
import useRegister from "../hooks/User/useRegister";
import UserRegisterUpdComponent from "../../components/Users/UserRegisterUpdComponent";
import { useNavigate, useLocation } from "react-router-dom";

type LocationState = {
  state: UserRegisterUpdInterface;
};

const UserRegisterUpd = () => {
  const [selectedID, setselectedID] = useState("");
  const { isLogged, isAdministrator, updUserInfo, registerUser } = useUser();

  const navigate = useNavigate();
  const location = useLocation() as LocationState;

  //BANDERA PARA SAVER SI ESTA EN EDITING MODE
  const [isRegister, setIsRegister] = useState(false);

  //REGISTER AND UPDATE COMPONENT
  const { registerValues, setUsername, setEmail, setTelephone, setPassword } =
    useRegister();

  //Title
  const [title, setTitle] = useState("Registro de usuarios");

  useEffect(() => {
    if (!(isLogged && isAdministrator === "true")) {
      navigate("/login");
      return;
    }

    if (location.state) {
      const { userName, email, telephone, id } = location.state;

      setIsRegister(false);
      setUsername(userName);
      setEmail(email);
      setTelephone(telephone);
      setselectedID(id);
      setPassword("");

      setTitle("Edicion de usuario");
      return;
    }
    setIsRegister(true);
  }, []);

  //-------------------------------------------------------------------------

  const handleOnClickCancelRegister = () => {
    navigate("/users");
    return;
  };

  const handleOnClickSave = (
    ev: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    ev.preventDefault();

    //REGISTRO DE USUARIO
    if (isRegister) {
      registerUser({ ...registerValues, id: "" })
        .then(() => {
          navigate("/users", { state: true });
        })
        .catch((err) => {
          navigate("/users", { state: false });
          console.log("ERROR", err);
        });
      return;
    }

    //EDICION DE USUARIO
    updUserInfo({ ...registerValues, id })
      .then((res) => {
        navigate("/users", { state: true });
      })
      .catch((err) => {
        navigate("/users", { state: false });
        console.log(`Error editing: ${err}`);
      });
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
      <UserRegisterUpdComponent
        handleOnClickCancelRegister={handleOnClickCancelRegister}
        handleOnClickSave={handleOnClickSave}
        handleOnChangeUser={handleOnChangeUser}
        userInfo={{ ...registerValues, id: selectedID }}
        isRegister={isRegister}
        title={title}
      />
    </>
  );
};

export default UserRegisterUpd;
