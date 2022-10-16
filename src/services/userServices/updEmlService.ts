import axios from "axios";
import { User } from "../../../types";

const serverURL = process.env.REACT_APP_SERVER_URL;
const updEmlUserURL = process.env.REACT_APP_USER_UPD_EMAIL;

const updEmailUserService = (jwt: string, email: string): Promise<User> => {
  if (!(jwt && email)) {
    console.error("missing parameters");
    throw new Error("missing parameters");
  }

  if (!serverURL || !updEmlUserURL) {
    console.error("missing server URL");
    throw new Error("missing server URL");
  }

  return axios
    .put(`${serverURL}${updEmlUserURL}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: { email },
    })
    .then((res) => {
      if (res.status !== 200) throw new Error("Response is not ok");
      return res.data;
    });
};

export default updEmailUserService;
