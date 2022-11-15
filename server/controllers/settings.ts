import { NextFunction, Response, Request } from "express";
import Settings from "../models/settings";
import { SettingsInterf, extreq } from "../../types";
import { loadSettings } from "../utils/settingStatus";

interface req extends extreq {
  body: SettingsInterf;
}

// GUARDAR SETTINGS
export const saveSettings = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { body, userID } = request as req;
  //let saveSettings: any = undefined;

  let { tempLimitInf, tempLimitSup, hoursLess, alertUser } = body;

  try {
    if (userID === undefined) {
      let err = new Error();
      err.name = "missingParameters";
      throw err;
      return;
    }

    const record = await Settings.findOneAndUpdate(
      { userID },
      { $set: { tempLimitInf, tempLimitSup, hoursLess, alertUser } },
      { new: true, upsert: true }
    );

    loadSettings();
    response.status(200).send(record).end();
  } catch (err) {
    next(err);
    return;
  }
  return;
};

// GET SETTINGS
export const getSettings = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let settings: any = undefined;

  try {
    settings = await Settings.find();
    response.status(200).send(settings).end();
    return;
  } catch (err) {
    next(err);
    return;
  }
};
//SIN USO
export const updSettings = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { body, userID } = request as req;
  let updSettings: any = undefined;

  let { tempLimitInf, tempLimitSup, hoursLess, alertUser } = body;

  try {
    if (!userID) {
      let err = new Error();
      err.name = "missingParameters";
      throw err;
    }

    updSettings = await Settings.findOneAndUpdate(
      { _di: userID },
      { $set: { tempLimitInf, tempLimitSup, hoursLess, alertUser } },
      { new: true }
    );
    loadSettings();
    response.status(200).send(updSettings).end();
    return;
  } catch (err) {
    next(err);
    return;
  }
};
