import axios from "axios";
import { UserFromBDFilter } from "../../../types";

const serverURL = process.env.REACT_APP_SERVER_URL;
const updPassUsersURL = process.env.REACT_APP_USER_UPD_PASSWPRD;

const updPassUserService = (
  jwt: string,
  password: string
): Promise<UserFromBDFilter> => {
  if (!(jwt && password)) {
    console.error("missing parameter");
    throw new Error("missing parameter");
  }

  if (!serverURL || !updPassUsersURL) {
    console.error("missing server URL");
    throw new Error("missing server URL");
  }

  return axios
    .put(`${serverURL}${updPassUsersURL}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: { password },
    })
    .then((res) => {
      if (res.status !== 200) throw new Error("Response is not ok");
      return res.data;
    });
};

export default updPassUserService;
