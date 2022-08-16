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
}

// adding a new property to Request type from express
import { Request } from "express";

interface extreq extends Request {
  userID?: string;
}
