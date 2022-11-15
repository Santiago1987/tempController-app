import axios from "axios";
import { SettingsInterf } from "../../../types";

const serverURL = process.env.REACT_APP_SERVER_URL;
const saveSettingsURL = process.env.REACT_APP_SETTINGS_SAVE;

const saveSettings = (
  jwt: string,
  settings: SettingsInterf
): Promise<SettingsInterf> => {
  if (!jwt) {
    console.error("missing parameters");
    throw new Error("missing parameters");
  }

  if (!serverURL || !saveSettingsURL) {
    console.error("missing server URL");
    throw new Error("missing server URL");
  }

  let { tempLimitInf, tempLimitSup, hoursLess, alertUser } = settings;

  return axios
    .post(
      `${serverURL}${saveSettingsURL}`,
      { tempLimitInf, tempLimitSup, hoursLess, alertUser },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((res) => {
      return res.data;
    });
};

export default saveSettings;
