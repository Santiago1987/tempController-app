import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const registerUrl = process.env.REACT_APP_REGISTER_URL;

const registerService = (
  username: string,
  password: string,
  email: string
): Promise<boolean> => {
  if (!username || !password) {
    console.error("missing parameters");
    throw new Error("missing parameters");
  }

  if (!serverUrl || !registerUrl) {
    console.error("missing server URL");
    throw new Error("missing server URL");
  }

  return axios
    .post(`${serverUrl}${registerUrl}`, {
      username,
      password,
      email,
    })
    .then((res) => {
      if (res.status !== 200) return false;
      return true;
    });
};

export default registerService;
