import axios from "axios";
import { Sensor } from "../../../types";

const serverURL = process.env.REACT_APP_SERVER_URL;
const listSensorModuleURL = process.env.REACT_APP_SENSOR_MODULE_LIST;

const tempModuleListService = (
  jwt: string,
  id: string,
  frDate: Date,
  toDate: Date
): Promise<Sensor[]> => {
  if (!jwt) {
    console.error("missing jwt");
    throw new Error("missing URL");
  }

  if (!serverURL || !listSensorModuleURL) {
    console.error("missing server URL");
    throw new Error("missing server URL");
  }

  return axios
    .get(`${serverURL}${listSensorModuleURL}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      params: {
        chipID: id,
        frDate,
        toDate,
      },
    })
    .then((res) => {
      if (res.status !== 200) throw new Error("Response is not ok");
      return res.data;
    });
};

export default tempModuleListService;
