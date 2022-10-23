export interface UserFromBD {
  userName: string;
  id: string;
  email: string;
  passwordHash: string;
}

export type UserFromBDFilter = Omit<UserFromBD, "passwordHash">;

// adding a new property to Request type from express
import { Request } from "express";
import { type } from "os";

interface extreq extends Request {
  userID?: string;
}

export type userContextType = {
  jwt: string | null;
  setJWT: React.Dispatch<React.SetStateAction<string | null>>;
};

export interface ModuleFromBD {
  chipID: string;
  name: string;
  active: boolean;
  ubication: string;
}

export interface sensorReading {
  sensorNumber: number;
  date: Date;
  temperature: number[];
  chipID: string;
}

export interface MapSensorList {
  sensorNumber: number;
  date: Date;
  temperature: number[];
}

export type moduleContextType = {
  moduleList: string[] | [];
  setModuleList: React.Dispatch<React.SetStateAction<string[]>>;
};
