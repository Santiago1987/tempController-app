import { Request, Response, NextFunction } from "express";
import moment from "moment";
import Sensor from "../models/sensor";
interface sensorReading {
  sensorNumber: number;
  date: Date;
  temperature: number;
  chipID: string;
}

export const resgiterTemp = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let reading = request.body as sensorReading;
  let result = undefined;
  let { sensorNumber, date, temperature, chipID } = reading;

  try {
    if (!(sensorNumber && date && temperature && chipID)) {
      let err = new Error();
      err.name = "missingParameters";
      throw err;
    }

    const regis = new Sensor({
      sensorNumber,
      date,
      temperature,
      chipID,
    });

    result = await regis.save();

    response.status(200).send(result).end();
  } catch (err) {
    next(err);
    return;
  }

  return;
};

// LISTA DE TEMPERATURAS REGISTRADA POR UN DETERMINADO MODULO EN UN PERIODO
interface tempModuleList {
  frdate?: Date;
  todate?: Date;
}
export const tempModuleList = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { frdate, todate } = request.body as tempModuleList;
  let { chipID } = request.params;
  let result = undefined;

  try {
    if (!chipID) {
      let err = new Error();
      err.name = "missingParameters";
      throw err;
    }

    if (!todate) todate = new Date();
    if (!frdate) frdate = moment(todate).add(-1, "day").toDate();

    result = await Sensor.find({
      chipID,
      fecha: { $gte: frdate, $lte: todate },
    });

    response.status(200).send(result).end();
  } catch (err) {
    next(err);
    return;
  }

  return;
};

//LISTA DE TEMPERATURAS REGISTRADAS POR TODOS LOS MODULOS EN UN DETERMINADO PERIODO
export const temperatureList = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { frdate, todate } = request.body as tempModuleList;
  let result = undefined;

  if (!todate) todate = new Date();
  if (!frdate) frdate = moment(todate).add(-1, "day").toDate();
  try {
    result = await Sensor.find({ fecha: { $gte: frdate, $lte: todate } });

    response.status(200).send(result).end();
  } catch (err) {
    next(err);
  }
  return;
};
