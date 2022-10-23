import { useCallback, useContext, useState } from "react";
import {
  moduleContextType,
  sensorReading,
  userContextType,
} from "../../../../types";
import tempListService from "../../../services/sesorsServices/tempListService";
import tempModuleListService from "../../../services/sesorsServices/tempModuleListService";
import mapTempListFromBD from "../../../utils/mapTempListFromBD";
import { ModuleContext } from "../../context/ModuleContext";
import { UserContext } from "../../context/UserContext";

const useSensorActions = () => {
  const { jwt } = useContext<userContextType | null>(
    UserContext
  ) as userContextType;
  const { moduleList } = useContext<moduleContextType | null>(
    ModuleContext
  ) as moduleContextType;
  const [logState, setLogState] = useState({
    loading: false,
    error: false,
  });

  // GET LIST TEMPERATURES FOR A SENSOR
  const getTempModuleList = useCallback(
    (id: string, frDate: Date, toDate: Date): sensorReading[] | undefined => {
      setLogState({ loading: true, error: false });
      let result: sensorReading[] | undefined = undefined;

      if (!jwt) {
        setLogState({ loading: false, error: true });
        return undefined;
      }

      tempModuleListService(jwt, id, frDate, toDate)
        .then((res) => {
          result = res;
          setLogState({ loading: false, error: false });
        })
        .catch((err) => {
          setLogState({ loading: false, error: true });
          console.error(err);
        });
      return result;
    },
    []
  );

  // GET LIST OF TEMPERATURES
  const getTempList = useCallback((frDate: Date, toDate: Date) => {
    setLogState({ loading: true, error: false });
    let result = [];

    if (!jwt) {
      setLogState({ loading: false, error: true });
      return undefined;
    }

    tempListService(jwt, frDate, toDate)
      .then((res) => {
        result = mapTempListFromBD(res, moduleList);
        setLogState({ loading: false, error: false });
      })
      .catch((err) => {
        setLogState({ loading: false, error: true });
        console.error(err);
      });
    return result;
  }, []);

  return {
    logState,
    getTempModuleList,
    getTempList,
  };
};

export default useSensorActions;
