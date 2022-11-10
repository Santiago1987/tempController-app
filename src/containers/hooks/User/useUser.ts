import { useCallback, useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import {
  userContextType,
  UserFromBDFilter,
  UserUpd,
  UserRegisterUpdInterface,
  AdministratorContextType,
} from "../../../../types";
import loginService from "../../../services/userServices/loginService";
import registerService from "../../../services/userServices/registerService";
import listUserService from "../../../services/userServices/listUserService";
import updEmailUserService from "../../../services/userServices/updUserInfo";
import updPassUserService from "../../../services/userServices/updPassUserService";
import deleteUserService from "../../../services/userServices/deleteUserService";
import { AdministratorContext } from "../../context/AdministratorContext";

// Hook para el manejo de usuarios
const useUser = () => {
  const { jwt, setJWT } = useContext<userContextType | null>(
    UserContext
  ) as userContextType;

  const { isAdministrator, setIsAdministrator } =
    useContext<AdministratorContextType | null>(
      AdministratorContext
    ) as AdministratorContextType;

  const [logState, setLogState] = useState({
    loading: false,
    error: "",
  });

  // Logeo de usuario
  const login = useCallback(
    (username: string, password: string): void => {
      setLogState({ loading: true, error: "" });

      loginService(username, password)
        .then((res) => {
          if (res?.token) {
            window.localStorage.setItem("token", res.token);
            setLogState({ loading: false, error: "" });
            setJWT(res.token);
            setIsAdministrator(res.administrator === true ? "true" : "false");
            window.localStorage.setItem("adm", String(res.administrator));
            return;
          }
        })
        .catch((err) => {
          window.localStorage.removeItem("token");
          setLogState({
            loading: false,
            error: "Usuario o contraseña incorrectos",
          });
          console.error(err.name);
        });
    },
    [setJWT, setIsAdministrator]
  );

  // logout de usuario
  const logout = useCallback(() => {
    window.localStorage.removeItem("token");
    setJWT(null);
    setIsAdministrator("false");
    window.localStorage.removeItem("adm");
  }, [setJWT]);

  // Register
  const registerUser = useCallback(
    (user: UserRegisterUpdInterface): Promise<UserRegisterUpdInterface> => {
      if (!jwt) {
        return Promise.reject(undefined);
      }
      return registerService(jwt, user);
    },
    [jwt]
  );

  //User list
  const getUserList = useCallback((): Promise<UserRegisterUpdInterface[]> => {
    if (!jwt) {
      setLogState({ loading: false, error: "la session a expirado" });
      return Promise.reject(undefined);
    }

    return listUserService(jwt);
  }, [jwt]);

  //UPDATE EMAIL
  const updUserInfo = useCallback(
    (user: UserUpd): Promise<UserFromBDFilter> => {
      if (!jwt) {
        return Promise.reject(undefined);
      }
      return updEmailUserService(jwt, user);
    },
    [jwt]
  );

  //UPDATE PASSWORD
  const updUserPassword = useCallback(
    (id: string, password: string): Promise<UserFromBDFilter> => {
      if (!jwt) {
        return Promise.reject(undefined);
      }

      return updPassUserService(jwt, password, id);
    },
    [jwt]
  );

  //DELETE USER
  const deleteUser = useCallback(
    (id: string): Promise<boolean> => {
      setLogState({ loading: true, error: "" });

      if (!jwt) {
        return Promise.reject(false);
      }

      return deleteUserService(jwt, id);
    },
    [jwt]
  );

  return {
    isLogged: Boolean(jwt),
    login,
    logout,
    isLogingLoading: logState.loading,
    hasLoadingError: logState.error,
    registerUser,
    getUserList,
    updUserInfo,
    updUserPassword,
    deleteUser,
    isAdministrator,
  };
};

export default useUser;
