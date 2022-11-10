import React, { useEffect } from "react";
import useLoging from "../hooks/User/useLoging";
import useUser from "../hooks/User/useUser";
import { useNavigate } from "react-router-dom";
import LogingComponent from "../../components/Loggin/LoginComponent";

const Login = () => {
  const navigate = useNavigate();

  const { logValues, setUsername, setPassword } = useLoging();
  const { login, isLogged, isLogingLoading, hasLoadingError } = useUser();
  //const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    if (isLogged) navigate("/home");
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
      {isLogingLoading && <strong>Checking credentials</strong>}
      {!isLogingLoading && (
        <LogingComponent
          logValues={logValues}
          handleLogin={handleLogin}
          handleOnChange={handleOnChange}
          hasLoadingError={hasLoadingError}
        />
      )}
    </>
  );
};

export default Login;
