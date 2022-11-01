import axios from "axios";
import { UserFromBDFilter } from "../../../types";

const serverURL = process.env.REACT_APP_SERVER_URL;
const updPassUsersURL = process.env.REACT_APP_USER_UPD_PASSWPRD;

const updPassUserService = (
  jwt: string,
  password: string,
  id: string
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
    .put(
      `${serverURL}${updPassUsersURL}`,
      { password, id },
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

export default updPassUserService;
