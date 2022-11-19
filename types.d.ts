export interface UserFromBD {
  userName: string;
  id: string;
  email: string;
  passwordHash: string;
  administrator: boolean;
  telephone: string;
}

export type UserFromBDFilter = Omit<UserFromBD, "passwordHash">;

export type UserManag = Omit<UserFromBD, "passwordHash" | "administrator">;

type UserForHook = {
  userName: string;
  password: string;
  email: string;
  telephone: string;
};

interface UserRegisterUpdInterface {
  id: string;
  userName: string;
  password: string;
  email: string;
  telephone: string;
}

type UserUpd = Omit<UserRegisterUpdInterface, "password">;

// adding a new property to Request type from express
import { Request } from "express";
import { ObjectId } from "mongoose";
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
  sensors: { name: string; active: boolean }[];
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
  date: Date;
  temperature: number[];
}

export type AdministratorContextType = {
  isAdministrator: string | null;
  setIsAdministrator: React.Dispatch<React.SetStateAction<string | null>>;
};

export interface sensorMappingResult {
  [modID: string]: MapSensorList[];
}

export type moduleData = Map<
  Date,
  {
    sensor: number;
    temperature: number;
  }[]
>;

export interface moduleSensorsUPD {
  chipID: string;
  sensors: { name: string; active: boolean }[];
}

export interface sentorTitles {
  [chipID: string]: string[];
}

//------------------------Settings----------------------
export type SettingsInterf = {
  tempLimitSup: number;
  tempLimitInf: number;
  hoursLess: number;
  alertUser: string[];
  sendMail: boolean;
  sendWasap: boolean;
};

export type SettingAlert = Pick<
  SettingsInterf,
  "tempLimitSup" | "tempLimitInf" | "alertUser" | "sendMail" | "sendWasap"
>;

//-------------------------------
import { messageType } from "./src/typeEnum";
export type alert = { type: messageType | undefined; message: string };
