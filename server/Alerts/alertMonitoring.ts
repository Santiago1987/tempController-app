import { sensorAfterReading } from "../../types";
import { settingStatus } from "../utils/settingStatus";
import sendEmail from "./mailer";
import moment from "moment";
import sendwasap from "./tiwiloWasap";
import { moduleList } from "./../utils/moduleList";
import User from "../models/user";

type monitor = {
  date: Date;
  sensorName: string;
  temperature: number;
  type: "inf" | "sup";
}[];

type history = {
  [chipID: string]: { last: number }[];
};

let alertHistory: history = {};

const alertMonitoring = async ({
  date,
  temperature,
  chipID,
}: sensorAfterReading) => {
  let { tempLimitSup, tempLimitInf, alertUser, sendMail, sendWasap } =
    settingStatus;

  let module = moduleList.find((mod) => mod.chipID === chipID);
  if (!module) {
    console.error("el modulo no se encuentra en la lista");
    return;
  }

  let { name, sensors } = module;
  let monitoring: monitor = [];

  for (let tempind in temperature) {
    let procced = true;
    //SE MANDA LA TEMP CADA CIERTO TIEMPO
    if (alertHistory[chipID] && alertHistory[chipID][tempind]) {
      let { last } = alertHistory[chipID][tempind];
      if (last !== undefined && last - moment().toDate().getTime() < 86400000) {
        procced = false;
      }
    }

    if (procced) {
      if (tempLimitSup !== "" && temperature[tempind] > tempLimitSup) {
        monitoring[tempind] = {
          date,
          temperature: temperature[tempind],
          type: "sup",
          sensorName: sensors[tempind],
        };
        if (!alertHistory[chipID]) alertHistory[chipID] = [];
        alertHistory[chipID][tempind] = { last: moment().toDate().getTime() };
      }

      if (tempLimitInf !== "" && temperature[tempind] < tempLimitInf) {
        monitoring[tempind] = {
          date,
          temperature: temperature[tempind],
          type: "inf",
          sensorName: sensors[tempind],
        };
        if (!alertHistory[chipID]) alertHistory[chipID] = [];
        alertHistory[chipID][tempind] = { last: moment().toDate().getTime() };
      }
    }
  }

  if (monitoring.length < 1) return;

  let userData = await User.find();
  if (userData.length < 1) return;

  //ALERTA POR MAIL
  if (sendMail) {
    let mailList = userData.map((us) => {
      let { email, id } = us;
      if (!(email && id)) return undefined;

      if (alertUser.includes(id)) {
        return email;
      }
      return undefined;
    });

    sendEmail(monitoring, mailList, name);
  }

  //ALERTA POR WASAP
  if (sendWasap) {
    let telList = userData.map((us) => {
      let { telephone, id } = us;
      if (!(telephone && id)) return undefined;

      if (alertUser.includes(id)) {
        return telephone;
      }
      return undefined;
    });

    sendwasap(monitoring, telList, name);
  }

  //ULTIMO ENVIO
  //alertHistory[chipID] = { last: moment().toDate().getTime() };
};

export default alertMonitoring;
