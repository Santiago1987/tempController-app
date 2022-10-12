import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterComponent from "../../components/Register/RegisterComponent";

import useRegister from "../hooks/useRegister";
import useUser from "../hooks/useUser";

const Register = () => {
  const navigate = useNavigate();

  const { registerValues, setUsername, setPassword, setEmail } = useRegister();
  const { register, isLogingLoading, hasLoadingError, isLogged } = useUser();
  const [registerSucsess, _setRegisterSucsess] = useState(false);

  useEffect(() => {
    if (isLogged) navigate("/");
    if (registerSucsess) navigate("/login");
  }, [registerSucsess, isLogged]);

  const handleRegister = (ev: React.FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();
    let { username, password, email } = registerValues;

    register(username, password, email);
  };

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    let { value, name } = ev.target;
    if (name === "Username") {
      setUsername(value);
      return;
    }

    if (name === "Password") {
      setPassword(value);
      return;
    }

    if (name === "Email") {
      setEmail(value);
      return;
    }
  };
  return (
    <>
      <h2>Register</h2>
      {isLogingLoading && <strong>Checking credentials</strong>}
      {!isLogingLoading && (
        <RegisterComponent
          registerValues={registerValues}
          handleRegister={handleRegister}
          handleOnChange={handleOnChange}
        />
      )}
      {hasLoadingError && <h2>Register errro</h2>}
    </>
  );
};

export default Register;
