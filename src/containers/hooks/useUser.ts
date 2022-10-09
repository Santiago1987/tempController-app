import { useCallback, useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { userContextType } from "../../../types";
import loginService from "../../services/loginService";
import registerService from "../../services/registerService";

// Hook para el manejo de usuarios
const useUser = () => {
  const { jwt, setJWT } = useContext<userContextType | null>(
    UserContext
  ) as userContextType;
  const [logState, setLogState] = useState({
    loading: false,
    error: false,
  });

  // Logeo de usuario
  const login = useCallback(
    (username: string, password: string): void => {
      setLogState({ loading: true, error: false });

      loginService(username, password)
        .then((res) => {
          if (res?.token) {
            window.localStorage.setItem("token", res.token);
            setLogState({ loading: false, error: false });
            setJWT(res.token);
            return;
          }
        })
        .catch((err) => {
          window.localStorage.removeItem("token");
          setLogState({ loading: false, error: true });
          console.error(err);
        });
    },
    [setJWT]
  );

  // logout de usuario
  const logout = useCallback(() => {
    window.localStorage.removeItem("token");
    setJWT(null);
  }, [setJWT]);

  // Register
  const register = useCallback(
    (username: string, password: string, email: string): void => {
      setLogState({ loading: true, error: false });

      registerService(username, password, email)
        .then((res) => {
          setLogState({ loading: false, error: false });
          return;
        })
        .catch((err) => {
          setLogState({ loading: false, error: true });
          console.error(err);
        });
    },
    []
  );

  return {
    isLogged: Boolean(jwt),
    login,
    logout,
    isLogingLoading: logState.loading,
    hasLoadingError: logState.error,
    register,
  };
};

export default useUser;
