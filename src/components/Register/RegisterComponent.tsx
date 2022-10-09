import React from "react";

type Props = {
  registerValues: { username: string; password: string; email: string };
  handleRegister: (ev: React.FormEvent<HTMLFormElement>) => void;
  handleOnChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};

const RegisterComponent = ({
  registerValues,
  handleRegister,
  handleOnChange,
}: Props) => {
  return (
    <form onSubmit={handleRegister}>
      <label>
        Name
        <input
          type="text"
          value={registerValues.username}
          name="Username"
          placeholder="User name"
          onChange={handleOnChange}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={registerValues.password}
          name="Password"
          placeholder="Password"
          onChange={handleOnChange}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={registerValues.email}
          name="Email"
          placeholder="Email"
          onChange={handleOnChange}
        />
      </label>
      <button>Regiser</button>
    </form>
  );
};

export default RegisterComponent;
