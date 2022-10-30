import { useCallback, useReducer } from "react";

interface Register {
  userName: string;
  password: string;
  email: string;
  telephone: string;
}

type registerReducerAction =
  | { type: "set_username"; payload: string }
  | {
      type: "set_password";
      payload: string;
    }
  | { type: "set_email"; payload: string }
  | { type: "set_telephone"; payload: string };

const initStateRegister = {
  userName: "",
  password: "",
  email: "",
  telephone: "",
};

const registerReducer = (
  state: Register,
  { type, payload }: registerReducerAction
) => {
  switch (type) {
    case "set_username":
      return { ...state, userName: payload };
    case "set_password":
      return { ...state, password: payload };
    case "set_email":
      return { ...state, email: payload };
    case "set_telephone":
      return { ...state, telephone: payload };
  }
};

const useRegister = () => {
  const [registerValues, setRegisterValues] = useReducer(
    registerReducer,
    initStateRegister
  );

  const setUsername = useCallback((userName: string): void => {
    setRegisterValues({ type: "set_username", payload: userName });
  }, []);

  const setPassword = useCallback((password: string): void => {
    setRegisterValues({ type: "set_password", payload: password });
  }, []);

  const setEmail = useCallback((email: string) => {
    setRegisterValues({ type: "set_email", payload: email });
  }, []);

  const setTelephone = useCallback((telephone: string) => {
    setRegisterValues({ type: "set_telephone", payload: telephone });
  }, []);

  return { registerValues, setUsername, setPassword, setEmail, setTelephone };
};

export default useRegister;
