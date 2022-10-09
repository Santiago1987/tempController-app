export interface User {
  username: string;
  name: string;
}

export interface LoginUser extends User {
  password: string;
}

export interface UserFromBD extends User {
  passwordHash: string;
  _id: string;
  email: string;
}

// adding a new property to Request type from express
import { Request } from "express";

interface extreq extends Request {
  userID?: string;
}

export type userContextType = {
  jwt: string | null;
  setJWT: React.Dispatch<React.SetStateAction<string | null>>;
};
