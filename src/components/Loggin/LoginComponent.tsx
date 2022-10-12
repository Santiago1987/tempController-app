import React from "react";
import "../../styles/login.css";

type Props = {
  logValues: { username: string; password: string };
  handleLogin: (ev: React.FormEvent<HTMLFormElement>) => void;
  handleOnChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};

const LogingComponent = ({ logValues, handleLogin, handleOnChange }: Props) => {
  return (
    <form className="longin_form" onSubmit={handleLogin}>
      <h3>Login</h3>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          value={logValues.username}
          name="Username"
          placeholder="Nombre de usuario"
          onChange={handleOnChange}
        />
      </div>
      <div>
        <label>Contraseña</label>
        <input
          type="password"
          value={logValues.password}
          name="Password"
          placeholder="Contraseña"
          onChange={handleOnChange}
        />
      </div>

      <button>Login</button>
    </form>
  );
};

export default LogingComponent;
