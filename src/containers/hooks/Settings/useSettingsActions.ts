import { useCallback, useContext } from "react";
import { SettingsInterf, userContextType } from "../../../../types";
import getSettings from "../../../services/settings/getSettings";
import saveSettings from "../../../services/settings/saveSettings";
import updSettings from "../../../services/settings/updSettings";
import { UserContext } from "../../context/UserContext";

const useSetttingsActions = () => {
  const { jwt } = useContext<userContextType | null>(
    UserContext
  ) as userContextType;

  const saveSettingsBD = useCallback(
    (settings: SettingsInterf): Promise<SettingsInterf> => {
      if (!jwt) {
        return Promise.reject(undefined);
      }
      return saveSettings(jwt, settings);
    },
    []
  );

  const getSettingsBD = useCallback((): Promise<SettingsInterf> => {
    if (!jwt) {
      return Promise.reject(undefined);
    }
    return getSettings(jwt);
  }, []);

  const updSettingsBD = useCallback(
    (settings: SettingsInterf): Promise<SettingsInterf> => {
      if (!jwt) {
        return Promise.reject(undefined);
      }
      return updSettings(jwt, settings);
    },
    []
  );

  return { saveSettingsBD, getSettingsBD, updSettingsBD };
};

export default useSetttingsActions;
