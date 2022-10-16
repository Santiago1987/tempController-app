import { useCallback, useContext, useState } from "react";
import { Module, userContextType } from "../../../../types";
import deleteModuleService from "../../../services/modulesServices/deleteModuleService";
import listModuleService from "../../../services/modulesServices/listModuleService";
import registerModuleService from "../../../services/modulesServices/registerModuleService";
import updModuleService from "../../../services/modulesServices/updModuleService";
import { UserContext } from "../../context/UserContext";

const useModuleActions = () => {
  const { jwt } = useContext<userContextType | null>(
    UserContext
  ) as userContextType;
  const [logState, setLogState] = useState({
    loading: false,
    error: false,
  });

  //REGISTRO DE MODULO
  const registerModule = useCallback((module: Module): Module | undefined => {
    setLogState({ loading: true, error: false });
    let result = undefined;

    if (!jwt) {
      setLogState({ loading: false, error: true });
      return undefined;
    }

    registerModuleService(jwt, module)
      .then((res) => {
        result = res;
        setLogState({ loading: false, error: false });
      })
      .catch((err) => {
        setLogState({ loading: false, error: true });
        console.error(err);
      });
    return result;
  }, []);

  //LIST OF MODULES
  const getModuleList = useCallback((): Module | undefined => {
    setLogState({ loading: true, error: false });
    let result = undefined;

    if (!jwt) {
      setLogState({ loading: false, error: true });
      return undefined;
    }

    listModuleService(jwt)
      .then((res) => {
        result = res;
        setLogState({ loading: false, error: false });
      })
      .catch((err) => {
        setLogState({ loading: false, error: true });
        console.error(err);
      });

    return result;
  }, []);

  //UPDATE MODULE
  const updateModule = useCallback((module: Module): Module | undefined => {
    setLogState({ loading: true, error: false });
    let result = undefined;

    if (!jwt) {
      setLogState({ loading: false, error: true });
      return undefined;
    }

    updModuleService(jwt, module)
      .then((res) => {
        result = res;
        setLogState({ loading: false, error: false });
      })
      .catch((err) => {
        setLogState({ loading: false, error: true });
        console.error(err);
      });

    return result;
  }, []);

  //DELETE MODULE
  const deleteModule = useCallback((id: string): boolean => {
    setLogState({ loading: true, error: false });
    let result = false;

    if (!jwt) {
      setLogState({ loading: false, error: true });
      return false;
    }

    deleteModuleService(jwt, id)
      .then((res) => {
        result = res;
        setLogState({ loading: false, error: res });
      })
      .catch((err) => {
        setLogState({ loading: false, error: true });
        console.error(err);
      });
    return result;
  }, []);

  return {
    logState,
    registerModule,
    getModuleList,
    updateModule,
    deleteModule,
  };
};

export default useModuleActions;
