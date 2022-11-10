import moment from "moment";
import { useCallback, useReducer } from "react";
import { SettingsInterf } from "../../../../types";

type settingsReducerActions =
  | {
      type: "set_id";
      payload: string;
    }
  | {
      type: "temp_limit_sup";
      payload: number;
    }
  | {
      type: "temp_limit_inf";
      payload: number;
    }
  | {
      type: "set_from_date";
      payload: Date;
    }
  | {
      type: "set_to_date";
      payload: Date;
    }
  | {
      type: "set_users";
      payload: string[];
    };

const initStateSettings = {
  id: "",
  tempLimitSup: 999,
  tempLimitInf: -999,
  frDate: moment().toDate(),
  toDate: moment().toDate(),
  alertUser: [],
};

const settingsReducer = (
  state: SettingsInterf,
  { type, payload }: settingsReducerActions
) => {
  switch (type) {
    case "set_id":
      return { ...state, id: payload };
    case "temp_limit_sup":
      return { ...state, tempLimitSup: payload };
    case "temp_limit_inf":
      return { ...state, tempLimitInf: payload };
    case "set_from_date":
      return { ...state, frDate: payload };
    case "set_to_date":
      return { ...state, toDate: payload };
    case "set_users":
      return { ...state, alertUser: payload };
  }
};

const useSettings = () => {
  const [settingRedu, setSettingRedu] = useReducer(
    settingsReducer,
    initStateSettings
  );

  const setID = useCallback((id: string) => {
    setSettingRedu({ type: "set_id", payload: id });
  }, []);

  const setTempLimitSup = useCallback((tempLimitSup: number) => {
    setSettingRedu({ type: "temp_limit_sup", payload: tempLimitSup });
  }, []);

  const setTempLimitInf = useCallback((tempLimitInf: number) => {
    setSettingRedu({ type: "temp_limit_inf", payload: tempLimitInf });
  }, []);

  const setFrDate = useCallback((frDate: Date) => {
    setSettingRedu({ type: "set_from_date", payload: frDate });
  }, []);

  const setToDate = useCallback((toDate: Date) => {
    setSettingRedu({ type: "set_to_date", payload: toDate });
  }, []);

  const setUsers = useCallback((users: string[]) => {
    setSettingRedu({ type: "set_users", payload: users });
  }, []);

  return {
    settingRedu,
    setID,
    setTempLimitSup,
    setTempLimitInf,
    setFrDate,
    setToDate,
    setUsers,
  };
};

export default useSettings;
