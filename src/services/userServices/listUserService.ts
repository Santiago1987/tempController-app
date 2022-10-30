import axios from "axios";
import { UserRegisterUpdInterface } from "../../../types";

const serverURL = process.env.REACT_APP_SERVER_URL;
const listUsersURL = process.env.REACT_APP_USER_LIST_URL;

const listUserService = (jwt: string): Promise<UserRegisterUpdInterface[]> => {
  if (!jwt) {
    console.error("missing jwt");
    throw new Error("missing URL");
  }

  if (!serverURL || !listUsersURL) {
    console.error("missing server URL");
    throw new Error("missing server URL");
  }

  return axios
    .get(`${serverURL}${listUsersURL}`, {
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

export default listUserService;
