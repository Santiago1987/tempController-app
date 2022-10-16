import { Sensor, MapSensorList } from "../../types";

type result = { [modID: string]: MapSensorList[] };

const mapTempListFromBD = (listTemp: Sensor[], modList: string[] | []) => {
  let result: result | [] = [];

  for (let index in modList) {
    let list: MapSensorList[] = [];
    let modID: string = modList[index];

    listTemp.map((sensor) => {
      let { sensorNumber, date, temperature, chipID } = sensor;
      if (chipID !== modID) return;

      list.push({ sensorNumber, date, temperature });
    });

    result[modID] = list;
  }

  return result;
};

export default mapTempListFromBD;
