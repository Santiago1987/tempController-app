import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const registerUrl = process.env.REACT_APP_REGISTER_URL;

const registerService = async (
  username: string,
  password: string,
  email: string
): Promise<boolean> => {
  let isok = false;

  if (!username || !password) {
    console.error("missing parameters");
    throw new Error("missing parameters");
  }

  if (!serverUrl || !registerUrl) {
    console.error("missing server URL");
    throw new Error("missing server URL");
  }

  axios
    .post(`${serverUrl}${registerUrl}`, {
      username,
      password,
      email,
    })
    .then((res) => {
      if (res.status === 200) isok = true;
      if (res.status > 300) isok = false;
    })
    .catch((err) => {
      console.error(err);
      throw new Error("Resgister problems");
    });

  return isok;
};

export default registerService;
