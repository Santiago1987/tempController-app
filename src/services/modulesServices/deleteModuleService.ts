import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;
const deleteModuleURL = process.env.REACT_APP_MODULE_DELETE;

const deleteModuleService = (jwt: string, id: string): Promise<boolean> => {
  if (!(jwt && id)) {
    console.error("missing parameter");
    throw new Error("missing parameter");
  }

  if (!serverURL || !deleteModuleURL) {
    console.error("missing server URL");
    throw new Error("missing server URL");
  }

  return axios.delete(`${serverURL}${deleteModuleURL}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    data: { id },
  });
};

export default deleteModuleService;
