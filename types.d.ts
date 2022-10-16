export interface User {
  userName: string;
  id: string;
  email: string;
}

export interface LoginUser extends User {
  password: string;
}

export interface UserFromBD extends User {
  passwordHash: string;
  id: string;
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

export interface Module {
  chipID: string;
  name: string;
  active: boolean;
  ubication: string;
}

export interface Sensor {
  sensorNumber: number;
  date: Date;
  temperature: number;
  chipID: string;
}

export interface MapSensorList {
  chipID: {
    sensorNumber: number;
    date: Date;
    temperature;
  };
}

export type moduleContextType = {
  moduleList: string[] | [];
  setModuleList: React.Dispatch<React.SetStateAction<string[]>>;
};
