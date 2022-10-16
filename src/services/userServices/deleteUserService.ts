import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;
const deleteUsersURL = process.env.REACT_APP_USER_DELETE;

const deleteUserService = (jwt: string, id: string): Promise<boolean> => {
  if (!(jwt && id)) {
    console.error("missing parameter");
    throw new Error("missing parameter");
  }

  if (!serverURL || !deleteUsersURL) {
    console.error("missing server URL");
    throw new Error("missing server URL");
  }

  return axios
    .delete(`${serverURL}${deleteUsersURL}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      params: { id },
    })
    .then((res) => {
      if (res.status !== 200) false;
      return true;
    });
};

export default deleteUserService;
