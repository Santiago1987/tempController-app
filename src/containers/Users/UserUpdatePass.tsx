import { useState, useEffect } from "react";
import UserUpdatePassComponent from "../../components/Users/UserUpdatePassComponent";
import useUser from "../hooks/User/useUser";
import { useNavigate, useLocation } from "react-router-dom";
import { messageType } from "../../typeEnum";

type LocationState = {
  state: { id: string };
};

const UserUpdatePass = () => {
  //CONTROL DE PASSWORD
  const [selectedID, setSelectedID] = useState("");
  const [passwordUPD, serPasswordsUPD] = useState({
    passwordOne: "",
    passwordTwo: "",
  });
  const navigate = useNavigate();
  const location = useLocation() as LocationState;

  const { isLogged, isAdministrator, updUserPassword } = useUser();

  useEffect(() => {
    if (!(isLogged && isAdministrator === "true")) {
      navigate("/login");
      return;
    }
    if (!(location.state && location.state.id)) {
      navigate("/users");
    }

    setSelectedID(location.state.id);
  }, []);

  //--------------------------------------------------------
  const handleOnClickSavePass = (
    ev: React.FormEvent<HTMLFormElement>,
    passwordOne: string,
    passwordTwo: string
  ): void => {
    ev.preventDefault();
    if (passwordOne.length < 8) return;
    if (passwordOne !== passwordTwo) return;

    updUserPassword(selectedID, passwordOne)
      .then((res) => {
        navigate("/users", {
          state: {
            type: messageType.success,
            message: "La contaseña fue actualizada",
          },
        });
      })
      .catch((err) => {
        navigate("/users", {
          state: {
            type: messageType.error,
            message: "No se pudo actualizar la contraseña",
          },
        });
        console.log("ERROR ON SAVING PASS", err);
      });
  };

  const handleOnChangePass = (
    ev: React.ChangeEvent<HTMLInputElement>
  ): void => {
    let { name, value } = ev.target;

    serPasswordsUPD({ ...passwordUPD, [name]: value });
  };

  const handleOnClickCancelPass = () => {
    navigate("/users");
  };

  return (
    <>
      <UserUpdatePassComponent
        passwordOne={passwordUPD.passwordOne}
        passwordTwo={passwordUPD.passwordTwo}
        handleOnChangePass={handleOnChangePass}
        handleOnClickSavePass={handleOnClickSavePass}
        handleOnClickCancelPass={handleOnClickCancelPass}
      />
    </>
  );
};

export default UserUpdatePass;
