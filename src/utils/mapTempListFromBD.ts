import { Sensor, MapSensorList } from "../../types";

type elemts = {
  sensorNumber: number;
  date: Date;
  temperature: number;
};

const mapTempListFromBD = (listTemp: Sensor[], modList: string[]) => {
  let result = {};

  for (let index in modList) {
    let list: elemts[] = [];
    let modID = modList[index];

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
