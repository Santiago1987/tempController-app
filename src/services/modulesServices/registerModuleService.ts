import axios from "axios";
import { Module } from "../../../types";

const serverURL = process.env.REACT_APP_SERVER_URL;
const registerModuleURL = process.env.REACT_APP_MODULE_REGISTER;

const registerModuleService = (
  jwt: string,
  module: Module
): Promise<Module> => {
  if (!(jwt && module)) {
    console.error("missing parameters");
    throw new Error("missing parameters");
  }

  if (!serverURL || !registerModuleURL) {
    console.error("missing server URL");
    throw new Error("missing server URL");
  }

  let { chipID, name, active, ubication } = module;
  return axios
    .post(`${serverURL}${registerModuleURL}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: { chipID, name, active, ubication },
    })
    .then((res) => {
      if (res.status !== 200) throw new Error("Response is not ok");
      return res.data;
    });
};

export default registerModuleService;
