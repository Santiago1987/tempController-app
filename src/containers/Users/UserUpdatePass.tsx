import { useState, useEffect } from "react";
import UserUpdatePassComponent from "../../components/Users/UserUpdatePassComponent";
import useUser from "../hooks/User/useUser";
type props = {
  id: string;
  setPasswordHide: (hidd: boolean) => void;
};

const UserUpdatePass = ({ id, setPasswordHide }: props) => {
  //CONTROL DE PASSWORD
  const [selectedID, setSelectedID] = useState("");
  const [passwordUPD, serPasswordsUPD] = useState({
    passwordOne: "",
    passwordTwo: "",
  });

  const { updUserPassword } = useUser();

  useEffect(() => {
    setSelectedID(id);
  }, [id]);

  //--------------------------------------------------------
  const handleOnClickSavePass = (
    passwordOne: string,
    passwordTwo: string
  ): void => {
    if (passwordOne.length < 8) return;
    if (passwordOne !== passwordTwo) return;

    updUserPassword(selectedID, passwordOne)
      .then((res) => {
        setPasswordHide(true);
      })
      .catch((err) => {
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
    setPasswordHide(true);
    serPasswordsUPD({
      passwordOne: "",
      passwordTwo: "",
    });
    setSelectedID("");
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
