export interface UserFromBD {
  userName: string;
  id: string;
  email: string;
  passwordHash: string;
  administrator: boolean;
}

export type UserFromBDFilter = Omit<UserFromBD, "passwordHash">;

export type UserManag = Omit<UserFromBD, "passwordHash" | "administrator">;

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
  sensors: [{ name: string; active: boolean }] | [];
}

//------------------------Sensores--------
export interface Sensor {
  temperature: number;
  date: Date;
}

export interface sensorReading {
  date: Date;
  temperature: string;
  chipID: string;
}

export interface sensorAfterReading {
  date: Date;
  temperature: number[];
  chipID: string;
}

export interface MapSensorList {
  dateformat: string;
  temperature: number[];
}

export type moduleContextType = {
  moduleList: string[] | [];
  setModuleList: React.Dispatch<React.SetStateAction<string[]>>;
};

export interface sensorMappingResult {
  [modID: string]: MapSensorList[];
}

export interface moduleData {
  [sensor: number]: [{ date: Date; temperature: number }];
}
