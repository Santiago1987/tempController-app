import axios from "axios";
import { SettingsInterf } from "../../../types";

const serverURL = process.env.REACT_APP_SERVER_URL;
const updSettingsURL = process.env.REACT_APP_SETTINGS_UPD;

const updSettings = (jwt: string, settings: SettingsInterf) => {
  if (!jwt) {
    console.error("missing parameters");
    throw new Error("missing parameters");
  }

  if (!serverURL || !updSettingsURL) {
    console.error("missing server URL");
    throw new Error("missing server URL");
  }

  let { id, tempLimitInf, tempLimitSup, frDate, toDate, alertUser } = settings;

  return axios
    .put(
      `${serverURL}${updSettingsURL}`,
      { id, tempLimitInf, tempLimitSup, frDate, toDate, alertUser },
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

export default updSettings;
