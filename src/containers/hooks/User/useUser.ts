import { useCallback, useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { userContextType, UserFromBDFilter } from "../../../../types";
import loginService from "../../../services/userServices/loginService";
import registerService from "../../../services/userServices/registerService";
import listUserService from "../../../services/userServices/listUserService";
import updEmailUserService from "../../../services/userServices/updEmlService";
import updPassUserService from "../../../services/userServices/updPassUserService";
import deleteUserService from "../../../services/userServices/deleteUserService";

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
          console.error(err.name);
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
    (username: string, password: string, email: string): Promise<boolean> => {
      return registerService(username, password, email);
    },
    []
  );

  //User list
  const getUserList = useCallback((): Promise<UserFromBDFilter[]> => {
    if (!jwt) {
      setLogState({ loading: false, error: true });
      return Promise.reject(undefined);
    }

    return listUserService(jwt);
  }, []);

  //UPDATE EMAIL
  const updUserEmail = useCallback(
    (email: string): Promise<UserFromBDFilter> => {
      if (!jwt) {
        setLogState({ loading: false, error: true });
        return Promise.reject(undefined);
      }

      return updEmailUserService(jwt, email);
    },
    []
  );

  //UPDATE PASSWORD
  const updUserPassword = useCallback(
    (password: string): Promise<UserFromBDFilter> => {
      if (!jwt) {
        setLogState({ loading: false, error: true });
        return Promise.reject(undefined);
      }

      return updPassUserService(jwt, password);
    },
    []
  );

  //DELETE USER
  const deleteUser = useCallback((id: string): Promise<boolean> => {
    setLogState({ loading: true, error: false });

    if (!jwt) {
      setLogState({ loading: false, error: true });
      return Promise.reject(false);
    }

    return deleteUserService(jwt, id);
  }, []);

  return {
    isLogged: Boolean(jwt),
    login,
    logout,
    isLogingLoading: logState.loading,
    hasLoadingError: logState.error,
    register,
    getUserList,
    updUserEmail,
    updUserPassword,
    deleteUser,
  };
};

export default useUser;
