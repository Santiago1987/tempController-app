import moment from "moment";
import { sensorAfterReading, sensorMappingResult } from "../../types";

const mapTempListFromBD = (listTemp: sensorAfterReading[]) => {
  let result: sensorMappingResult = {};

  for (let temps of listTemp) {
    let { chipID, date, temperature } = temps;

    let dateformat = moment(date).format();

    if (!result[chipID]) result[chipID] = [];

    result[chipID].push({ dateformat, temperature });
  }
  return result;
};

export default mapTempListFromBD;
