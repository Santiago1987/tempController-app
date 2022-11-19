import { useCallback, useReducer } from "react";
import { SettingsInterf } from "../../../../types";

type settingsReducerActions =
  | {
      type: "temp_limit_sup";
      payload: number | "";
    }
  | {
      type: "temp_limit_inf";
      payload: number | "";
    }
  | {
      type: "set_hours_less";
      payload: number | "";
    }
  | {
      type: "set_users";
      payload: string[];
    }
  | {
      type: "set_send_mail";
      payload: boolean;
    }
  | {
      type: "set_send_wasap";
      payload: boolean;
    }
  | {
      type: "set_minTemp";
      payload: number | "";
    }
  | {
      type: "set_maxTemp";
      payload: number | "";
    };

const initStateSettings: SettingsInterf = {
  tempLimitSup: "",
  tempLimitInf: "",
  hoursLess: "",
  alertUser: [],
  sendMail: false,
  sendWasap: false,
  maxTemp: "",
  minTemp: "",
};

const settingsReducer = (
  state: SettingsInterf,
  { type, payload }: settingsReducerActions
) => {
  switch (type) {
    case "temp_limit_sup":
      return { ...state, tempLimitSup: payload };
    case "temp_limit_inf":
      return { ...state, tempLimitInf: payload };
    case "set_hours_less":
      return { ...state, hoursLess: payload };
    case "set_users":
      return { ...state, alertUser: payload };
    case "set_send_mail":
      return { ...state, sendMail: payload };
    case "set_send_wasap":
      return { ...state, sendWasap: payload };
    case "set_minTemp":
      return { ...state, minTemp: payload };
    case "set_maxTemp":
      return { ...state, maxTemp: payload };
  }
};

const useSettings = () => {
  const [settingRedu, setSettingRedu] = useReducer(
    settingsReducer,
    initStateSettings
  );

  const setTempLimitSup = useCallback((tempLimitSup: number | "") => {
    setSettingRedu({ type: "temp_limit_sup", payload: tempLimitSup });
  }, []);

  const setTempLimitInf = useCallback((tempLimitInf: number | "") => {
    setSettingRedu({ type: "temp_limit_inf", payload: tempLimitInf });
  }, []);

  const setHoursLess = useCallback((hours: number | "") => {
    setSettingRedu({ type: "set_hours_less", payload: hours });
  }, []);

  const setUsers = useCallback((users: string[]) => {
    setSettingRedu({ type: "set_users", payload: users });
  }, []);

  const setEmail = useCallback((email: boolean) => {
    setSettingRedu({ type: "set_send_mail", payload: email });
  }, []);

  const setWasap = useCallback((wasap: boolean) => {
    setSettingRedu({ type: "set_send_wasap", payload: wasap });
  }, []);

  const setMinTemp = useCallback((temp: number | "") => {
    setSettingRedu({ type: "set_minTemp", payload: temp });
  }, []);

  const setMaxTemp = useCallback((temp: number | "") => {
    setSettingRedu({ type: "set_maxTemp", payload: temp });
  }, []);

  return {
    settingRedu,
    setTempLimitSup,
    setTempLimitInf,
    setHoursLess,
    setUsers,
    setEmail,
    setWasap,
    setMinTemp,
    setMaxTemp,
  };
};

export default useSettings;
