import { sensorAfterReading } from "../../types";
import { settingStatus } from "../utils/settingStatus";
import sendEmail from "./mailer";
import moment from "moment";
//import sendwasap from "./tiwiloWasap";

/*type monitor = {
    [chipID:string] :[
        {date:Date,
        temperature: number,
        type: 'inf' | "sup"
        }

    ]
}*/

type monitor = { date: Date; temperature: number; type: "inf" | "sup" }[];

type history = {
  [chipID: string]: { last: number };
};

let alertHistory: history = {};

const alertMonitoring = ({ date, temperature, chipID }: sensorAfterReading) => {
  let { tempLimitSup, tempLimitInf, sendWasap } = settingStatus;

  let alertUser = "santiagora1987@gmail.com";
  let monitoring: monitor = [];

  for (let tempind in temperature) {
    if (temperature[tempind] > tempLimitSup) {
      monitoring[tempind] = {
        date,
        temperature: temperature[tempind],
        type: "sup",
      };
    }

    if (temperature[tempind] < tempLimitInf) {
      monitoring[tempind] = {
        date,
        temperature: temperature[tempind],
        type: "inf",
      };
    }
  }

  if (monitoring.length < 1) return;

  let last: number | undefined = undefined;
  if (alertHistory[chipID]) {
    last = alertHistory[chipID].last;
  }

  // UN ENVIO DE ALERTA CADA 24HS
  if (last !== undefined && last - moment().toDate().getTime() < 86400000)
    return;

  //ALERTA POR MAIL
  console.log("monitoring", monitoring);
  if (true) {
    sendEmail(monitoring, alertUser, chipID);
    alertHistory[chipID] = { last: moment().toDate().getTime() };
    console.log("alertHistory", alertHistory);
  }

  //ALERTA POR WASAP
  if (sendWasap) {
    //sendwasap(monitoring, "", chipID);
    alertHistory[chipID] = { last: moment().toDate().getTime() };
    console.log("alertHistory", alertHistory);
  }

  //ULTIMO ENVIO
  //alertHistory[chipID] = { last: moment().toDate().getTime() };
};

export default alertMonitoring;
