import axios from "axios";
import { Sensor } from "../../../types";

const serverURL = process.env.REACT_APP_SERVER_URL;
const tempListURL = process.env.REACT_APP_SENSOR_LIST;

const tempListService = (
  jwt: string,
  frDate: Date,
  toDate: Date
): Promise<Sensor[]> => {
  if (!jwt) {
    console.error("missing jwt");
    throw new Error("missing jwt");
  }

  if (!serverURL || !tempListURL) {
    console.error("missing server URL");
    throw new Error("missing server URL");
  }

  return axios
    .get(`${serverURL}${tempListURL}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      params: {
        frDate,
        toDate,
      },
    })
    .then((res) => {
      if (res.status !== 200) throw new Error("Response is not ok");
      return res.data;
    });
};

export default tempListService;
