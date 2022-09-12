import axios from "axios";

type userResponseFromApi =
  | {
      name: string;
      userName: string;
      token: string;
    }
  | undefined;

const serverUrl = process.env.REACT_APP_SERVER_URL;

const login = async (
  username: string,
  password: string
): Promise<userResponseFromApi> => {
  let res: userResponseFromApi = undefined;

  if (!serverUrl) {
    console.error("missing server URL");
    throw new Error("missing server URL");
  }

  try {
    let { data, status } = await axios.post<userResponseFromApi>(
      `${serverUrl}/user/login`,
      {
        userName: username,
        password,
      }
    );
    console.log("status", status);
    if (status > 300) {
      console.log("invalid user or password");
      throw new Error("invalid user or password");
    }
    res = data;
  } catch (err) {
    console.error(err);
    throw new Error("login problems");
  }

  return res;
};

export default login;
