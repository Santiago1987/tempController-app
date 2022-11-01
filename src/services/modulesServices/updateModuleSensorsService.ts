import axios from "axios";
import { ModuleFromBD, moduleSensorsUPD } from "../../../types";

const serverURL = process.env.REACT_APP_SERVER_URL;
const updModuleSensorsURL = process.env.REACT_APP_MODULE_UPD_SENSORS;

const updateModuleSensorsService = (
  jwt: string,
  moduleSensors: moduleSensorsUPD
): Promise<ModuleFromBD> => {
  if (!(jwt && moduleSensors)) {
    console.error("missing parameters");
    throw new Error("missing parameters");
  }

  if (!serverURL || !updModuleSensorsURL) {
    console.error("missing server URL");
    throw new Error("missing server URL");
  }

  let { chipID, sensors } = moduleSensors;

  return axios
    .put(
      `${serverURL}${updModuleSensorsURL}`,
      { chipID, sensors },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((res) => {
      return res.data;
    });
};

export default updateModuleSensorsService;
