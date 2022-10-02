import React, { useEffect } from "react";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import useLoging from "../hooks/useLoging";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import LogingComponent from "../../components/Loging/LogingComponent";

const Login = () => {
  const navigate = useNavigate();

  const { logValues, setUsername, setPassword } = useLoging();
  const { login, isLogged, isLogingLoading, hasLoadingError } = useUser();

  useEffect(() => {
    if (isLogged) navigate("/");
  }, [isLogged, navigate]);

  const handleLogin = (ev: React.FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();
    let { username, password } = logValues;
    login(username, password);
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
  };

  return (
    <>
      <h2>Login</h2>
      {isLogingLoading && <strong>Checking credentials</strong>}
      {!isLogingLoading && (
        <LogingComponent
          logValues={logValues}
          handleLogin={handleLogin}
          handleOnChange={handleOnChange}
        />
      )}
      {hasLoadingError && <ErrorMsg message="Invalid creadentials" />}
    </>
  );
};

export default Login;
