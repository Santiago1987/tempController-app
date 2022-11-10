import { useCallback, useContext } from "react";
import { sensorAfterReading, userContextType } from "../../../../types";
import tempListService from "../../../services/sesorsServices/tempListService";
import tempModuleListService from "../../../services/sesorsServices/tempModuleListService";
import { UserContext } from "../../context/UserContext";

const useSensorActions = () => {
  const { jwt } = useContext<userContextType | null>(
    UserContext
  ) as userContextType;

  // GET LIST TEMPERATURES FOR A SENSOR
  const getTempModuleList = useCallback(
    (id: string, frDate: Date, toDate: Date): Promise<sensorAfterReading[]> => {
      if (!jwt) {
        return Promise.reject(undefined);
      }

      return tempModuleListService(jwt, id, frDate, toDate);
    },
    []
  );

  // GET LIST OF TEMPERATURES
  const getTempList = useCallback(
    (frDate: Date, toDate: Date): Promise<sensorAfterReading[]> => {
      if (!jwt) {
        return Promise.reject(undefined);
      }

      return tempListService(jwt, frDate, toDate);
    },
    []
  );

  return {
    getTempModuleList,
    getTempList,
  };
};

export default useSensorActions;
