import React from "react";

type Props = {
  logValues: { username: string; password: string };
  handleLogin: (ev: React.FormEvent<HTMLFormElement>) => void;
  handleOnChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};

const LogingComponent = ({ logValues, handleLogin, handleOnChange }: Props) => {
  return (
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
  );
};

export default LogingComponent;
