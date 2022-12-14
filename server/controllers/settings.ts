import { NextFunction, Response, Request } from "express";
import Settings from "../models/settings";
import { SettingsInterf, extreq } from "../../types";
import { loadSettings } from "../utils/settingStatus";
import { administratorList } from "../utils/administratorsList";
import User from "../models/user";

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

  let set: any = {};
  let unset: any = {};

  //objet keys no funciona porque undefined values no los considera
  let fields = [
    "tempLimitInf",
    "tempLimitSup",
    "hoursLess",
    "alertUser",
    "maxTemp",
    "minTemp",
    "sendWasap",
    "sendMail",
  ];

  for (let f of fields) {
    if (body[f] === undefined) {
      unset[f] = "";
    } else {
      set[f] = body[f];
    }
  }

  try {
    if (userID === undefined) {
      let err = new Error();
      err.name = "missingParameters";
      throw err;
      return;
    }

    const record = await Settings.findOneAndUpdate(
      { userID },
      {
        $set: set,
        $unset: unset,
      },
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
  request: extreq,
  response: Response,
  next: NextFunction
) => {
  let { userID } = request;
  let settings: any = undefined;
  let administratorID: undefined | string = undefined;

  try {
    if (!userID) {
      let err = new Error();
      err.name = "missingParameters";
      throw err;
    }

    //EL USARIRO ES ADMINISTRADOR ?
    if (administratorList.find((el) => el === userID)) administratorID = userID;

    //SI NO ES AMINISTRADOR BUSCAMOS EL ADMINISTRADOR
    if (!administratorID) {
      let user = await User.findOne({ _id: userID });
      if (!user) {
        let err = new Error();
        err.name = "noadministratorfound";
        throw err;
      }

      let { adminID } = user;
      administratorID = adminID?.toString();
    }

    if (!administratorID) {
      let err = new Error();
      err.name = "noadministratorfound";
      throw err;
    }

    settings = await Settings.findOne({ userID: administratorID });

    if (!settings) {
      response.status(401).json({ error: "invalid user" }).end();
      return;
    }

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
