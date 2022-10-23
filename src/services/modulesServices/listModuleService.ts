import axios from "axios";
import { ModuleFromBD } from "../../../types";

const serverURL = process.env.REACT_APP_SERVER_URL;
const moduleListURL = process.env.REACT_APP_MODULE_LIST;

const listModuleService = (jwt: string): Promise<ModuleFromBD[]> => {
  if (!jwt) {
    console.error("missing parameters");
    throw new Error("missing parameters");
  }

  if (!serverURL || !moduleListURL) {
    console.error("missing server URL");
    throw new Error("missing server URL");
  }

  return axios
    .get(`${serverURL}${moduleListURL}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => {
      if (res.status !== 200) throw new Error("Response is not ok");
      return res.data;
    });
};

export default listModuleService;
