import { useCallback, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { userContextType } from "../../../types";

const useUser = () => {
  const { jwt, setJWT } = useContext<userContextType | null>(
    UserContext
  ) as userContextType;

  const login = useCallback(() => {
    setJWT("");
  }, [setJWT]);

  return {
    isLoggedIn: Boolean(jwt),
    login,
  };
};

export default useUser;
