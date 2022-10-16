import { useCallback, useReducer } from "react";

interface Register {
  username: string;
  password: string;
  email: string;
}

type registerReducerAction =
  | { type: "set_username"; payload: string }
  | {
      type: "set_password";
      payload: string;
    }
  | { type: "set_email"; payload: string };

const initStateRegister = {
  username: "",
  password: "",
  email: "",
};

const registerReducer = (
  state: Register,
  { type, payload }: registerReducerAction
) => {
  switch (type) {
    case "set_username":
      return { ...state, username: payload };
    case "set_password":
      return { ...state, password: payload };
    case "set_email":
      return { ...state, email: payload };
  }
};

const useRegister = () => {
  const [registerValues, setRegisterValues] = useReducer(
    registerReducer,
    initStateRegister
  );

  const setUsername = useCallback((username: string): void => {
    setRegisterValues({ type: "set_username", payload: username });
  }, []);

  const setPassword = useCallback((password: string): void => {
    setRegisterValues({ type: "set_password", payload: password });
  }, []);

  const setEmail = useCallback((email: string) => {
    setRegisterValues({ type: "set_email", payload: email });
  }, []);

  return { registerValues, setUsername, setPassword, setEmail };
};

export default useRegister;
