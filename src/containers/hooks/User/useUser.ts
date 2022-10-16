import { useCallback, useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { userContextType, User } from "../../../../types";
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
          setLogState({ loading: false, error: res });
          return;
        })
        .catch((err) => {
          setLogState({ loading: false, error: true });
          console.error(err);
        });
    },
    []
  );

  //User list
  const getUserList = useCallback((): User[] => {
    setLogState({ loading: true, error: false });
    let result: User[] = [];

    if (!jwt) {
      setLogState({ loading: false, error: true });
      return [];
    }

    listUserService(jwt)
      .then((res) => {
        result = res;
        setLogState({ loading: false, error: false });
      })
      .catch((err) => {
        setLogState({ loading: false, error: true });
      });

    return result;
  }, []);

  //UPDATE EMAIL
  const updUserEmail = useCallback((email: string): User | undefined => {
    setLogState({ loading: true, error: false });
    let result: User | undefined = undefined;

    if (!jwt) {
      setLogState({ loading: false, error: true });
      return undefined;
    }

    updEmailUserService(jwt, email)
      .then((res) => {
        result = res;
        setLogState({ loading: false, error: false });
      })
      .catch((err) => {
        setLogState({ loading: false, error: true });
      });

    return result;
  }, []);

  //UPDATE PASSWORD
  const updUserPassword = useCallback((password: string): User | undefined => {
    setLogState({ loading: true, error: false });
    let result: User | undefined = undefined;

    if (!jwt) {
      setLogState({ loading: false, error: true });
      return undefined;
    }

    updPassUserService(jwt, password)
      .then((res) => {
        result = res;
        setLogState({ loading: false, error: false });
      })
      .catch((err) => {
        setLogState({ loading: false, error: true });
      });

    return result;
  }, []);

  //DELETE USER
  const deleteUser = useCallback((id: string): boolean => {
    setLogState({ loading: true, error: false });
    let result = false;

    if (!jwt) {
      setLogState({ loading: false, error: true });
      return false;
    }

    deleteUserService(jwt, id)
      .then((res) => {
        result = res;
        setLogState({ loading: false, error: false });
      })
      .catch((err) => {
        setLogState({ loading: false, error: true });
      });

    return result;
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
