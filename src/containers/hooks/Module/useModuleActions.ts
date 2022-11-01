import { useCallback, useContext } from "react";
import {
  ModuleFromBD,
  userContextType,
  moduleSensorsUPD,
} from "../../../../types";
import deleteModuleService from "../../../services/modulesServices/deleteModuleService";
import listModuleService from "../../../services/modulesServices/listModuleService";
import registerModuleService from "../../../services/modulesServices/registerModuleService";
import updModuleService from "../../../services/modulesServices/updModuleService";
import updateModuleSensorsService from "../../../services/modulesServices/updateModuleSensorsService";
import { UserContext } from "../../context/UserContext";

const useModuleActions = () => {
  const { jwt } = useContext<userContextType | null>(
    UserContext
  ) as userContextType;

  //REGISTRO DE MODULO
  const registerModuleOnBD = useCallback(
    (module: ModuleFromBD): Promise<ModuleFromBD> => {
      if (!jwt) {
        return Promise.reject(undefined);
      }

      return registerModuleService(jwt, module);
    },
    []
  );

  //LIST OF MODULES
  const getModuleList = useCallback((): Promise<ModuleFromBD[]> => {
    if (!jwt) {
      return Promise.reject(undefined);
    }

    return listModuleService(jwt);
  }, []);

  //UPDATE MODULE
  const updateModule = useCallback(
    (module: ModuleFromBD): Promise<ModuleFromBD> => {
      if (!jwt) {
        return Promise.reject(undefined);
      }

      return updModuleService(jwt, module);
    },
    []
  );

  //DELETE MODULE
  const deleteModule = useCallback((id: string): Promise<boolean> => {
    if (!jwt) {
      return Promise.reject(undefined);
    }

    return deleteModuleService(jwt, id);
  }, []);

  const updateModuleSensors = useCallback(
    (moduleSensor: moduleSensorsUPD): Promise<ModuleFromBD> => {
      if (!jwt) {
        return Promise.reject(undefined);
      }

      return updateModuleSensorsService(jwt, moduleSensor);
    },
    []
  );

  return {
    registerModuleOnBD,
    getModuleList,
    updateModule,
    deleteModule,
    updateModuleSensors,
  };
};

export default useModuleActions;
