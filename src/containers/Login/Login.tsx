import React, { useState } from "react";
import loginService from "../../services/loginService";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import useLoging from "../hooks/useLoging";

type userResponseFromApi =
  | {
      name: string;
      userName: string;
      token: string;
    }
  | undefined;

const Login = () => {
  const { logValues, setUsername, setPassword } = useLoging();
  const [error, setError] = useState<string>("");
  const [_user, setUser] = useState<userResponseFromApi>(undefined);

  const handleLogin = (ev: React.FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();

    let { username, password } = logValues;
    loginService
      .login(username, password)
      .then((res) => {
        setUser(res);
        console.log(res);

        //redireccionamiento a la home
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
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
      <form onSubmit={handleLogin}>
        <label>
          Name
          <input
            type="text"
            value={logValues.username}
            name="Username"
            placeholder="User name"
            onChange={handleOnChange}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={logValues.password}
            name="Password"
            placeholder="Password"
            onChange={handleOnChange}
          />
        </label>
        <button>Login</button>
      </form>
      <ErrorMsg message={error ? error : ""} />
    </>
  );
};

export default Login;
