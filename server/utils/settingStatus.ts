import Settings from "../models/settings";
import { SettingAlert } from "../../types";

export let settingStatus: SettingAlert = {
  tempLimitSup: "",
  tempLimitInf: "",
  alertUser: [],
  sendMail: false,
  sendWasap: false,
};

export const loadSettings = async () => {
  try {
    let sett = await Settings.findOne();
    if (!sett) return;

    let { tempLimitInf, tempLimitSup, alertUser, sendMail, sendWasap } =
      sett as any;
    tempLimitInf ??= "";
    tempLimitSup ??= "";
    alertUser ??= [];

    settingStatus = {
      tempLimitInf,
      tempLimitSup,
      alertUser,
      sendMail,
      sendWasap,
    };
  } catch (err) {
    console.error(err);
  }
};
