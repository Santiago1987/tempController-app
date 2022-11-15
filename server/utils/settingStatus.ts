import Settings from "../models/settings";
import { SettingAlert } from "../../types";

export let settingStatus: SettingAlert = {
  tempLimitSup: 999,
  tempLimitInf: -999,
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
    tempLimitInf ??= -999;
    tempLimitSup ??= 999;
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
