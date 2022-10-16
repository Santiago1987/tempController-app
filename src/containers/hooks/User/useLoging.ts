import { useCallback, useReducer } from "react";

interface Login {
  username: string;
  password: string;
}

type logReducerAction =
  | {
      type: "set_username";
      payload: string;
    }
  | {
      type: "set_password";
      payload: string;
    };

const iniStateLog = {
  username: "",
  password: "",
};

const logReducer = (state: Login, { type, payload }: logReducerAction) => {
  switch (type) {
    case "set_username":
      return { ...state, username: payload };
    case "set_password":
      return { ...state, password: payload };
  }
};

//REDUCER FOR LOGGING FORM
const useLoging = () => {
  const [logValues, setLogValues] = useReducer(logReducer, iniStateLog);

  const setUsername = useCallback((username: string): void => {
    setLogValues({ type: "set_username", payload: username });
  }, []);

  const setPassword = useCallback((password: string): void => {
    setLogValues({ type: "set_password", payload: password });
  }, []);

  return { logValues, setUsername, setPassword };
};

export default useLoging;
