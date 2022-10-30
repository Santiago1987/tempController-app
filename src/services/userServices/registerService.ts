import axios from "axios";
import { UserRegisterUpdInterface } from "../../../types";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const registerUrl = process.env.REACT_APP_REGISTER_URL;

const registerService = (
  jwt: string,
  user: UserRegisterUpdInterface
): Promise<UserRegisterUpdInterface> => {
  let { userName, password, email, telephone } = user;
  if (!userName || !password) {
    console.error("missing parameters");
    throw new Error("missing parameters");
  }

  if (!serverUrl || !registerUrl) {
    console.error("missing server URL");
    throw new Error("missing server URL");
  }

  return axios.post(
    `${serverUrl}${registerUrl}`,
    {
      userName,
      password,
      email,
      telephone,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
};

export default registerService;
