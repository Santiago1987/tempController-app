import axios from "axios";
import { UserFromBDFilter, UserUpd } from "../../../types";

const serverURL = process.env.REACT_APP_SERVER_URL;
const updEmlUserURL = process.env.REACT_APP_USER_UPD_INFO;

const updUserInfo = (jwt: string, user: UserUpd): Promise<UserFromBDFilter> => {
  let { userName, telephone, email } = user;
  if (!jwt) {
    console.error("missing parameters");
    throw new Error("missing parameters");
  }

  if (!serverURL || !updEmlUserURL) {
    console.error("missing server URL");
    throw new Error("missing server URL");
  }
  console.log("ads", `${serverURL}${updEmlUserURL}`);
  return axios.put(
    `${serverURL}${updEmlUserURL}`,
    { userName, telephone, email },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
};

export default updUserInfo;
