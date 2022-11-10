import { NextFunction, Response, Request } from "express";
import Settings from "../models/settings";
import { SettingsInterf } from "../../types";

type req = {
  body: SettingsInterf;
};

// GUARDAR SETTINGS
export const saveSettings = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { body } = request as req;
  let saveSettings: any = undefined;

  let { tempLimitInf, tempLimitSup, frDate, toDate, alertUser } = body;

  try {
    const settings = new Settings({
      tempLimitInf,
      tempLimitSup,
      frDate,
      toDate,
      alertUser,
    });

    saveSettings = await settings.save();
    response.status(200).send(saveSettings).end();
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

export const updSettings = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { body } = request as req;
  let updSettings: any = undefined;

  let { id, tempLimitInf, tempLimitSup, frDate, toDate, alertUser } = body;

  try {
    if (!id) {
      let err = new Error();
      err.name = "missingParameters";
      throw err;
    }

    updSettings = await Settings.findOneAndUpdate(
      { _di: id },
      { $set: { tempLimitInf, tempLimitSup, frDate, toDate, alertUser } },
      { new: true }
    );
    response.status(200).send(updSettings).end();
    return;
  } catch (err) {
    next(err);
    return;
  }
};
