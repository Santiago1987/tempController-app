import axios from "axios";
import { SettingsInterf } from "../../../types";

const serverURL = process.env.REACT_APP_SERVER_URL;
const getSettingsURL = process.env.REACT_APP_SETTINGS;

const getSettings = (jwt: string): Promise<SettingsInterf> => {
  if (!jwt) {
    console.error("missing parameters");
    throw new Error("missing parameters");
  }

  if (!serverURL || !getSettingsURL) {
    console.error("missing server URL");
    throw new Error("missing server URL");
  }

  return axios
    .get(`${serverURL}${getSettingsURL}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => {
      let {
        tempLimitSup,
        tempLimitInf,
        hoursLess,
        alertUser,
        sendMail,
        sendWasap,
        maxTemp,
        minTemp,
      } = res.data;

      tempLimitSup ??= "";
      tempLimitInf ??= "";
      hoursLess ??= "";
      alertUser ??= [];
      sendMail ??= false;
      sendWasap ??= false;
      maxTemp ??= "";
      minTemp ??= "";
      return {
        tempLimitSup,
        tempLimitInf,
        hoursLess,
        alertUser,
        sendMail,
        sendWasap,
        minTemp,
        maxTemp,
      };
    });
};

export default getSettings;
