import axios from "axios";
import { ModuleFromBD } from "../../../types";

const serverURL = process.env.REACT_APP_SERVER_URL;
const updModuleURL = process.env.REACT_APP_MODULE_UPD;

const updModuleService = (
  jwt: string,
  module: ModuleFromBD
): Promise<ModuleFromBD> => {
  if (!(jwt && module)) {
    console.error("missing parameters");
    throw new Error("missing parameters");
  }

  if (!serverURL || !updModuleURL) {
    console.error("missing server URL");
    throw new Error("missing server URL");
  }

  let { chipID, name, active, ubication } = module;

  return axios
    .put(`${serverURL}${updModuleURL}`, {
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

export default updModuleService;
