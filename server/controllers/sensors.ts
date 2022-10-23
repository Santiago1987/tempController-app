import { Request, Response, NextFunction } from "express";
import moment from "moment";
import Sensor from "../models/sensor";
import { moduleList } from "../utils/moduleList";
import { sensorReading } from "../../types";

export const resgiterTemp = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let reading = request.body as sensorReading;
  let result: undefined | sensorReading = undefined;
  let { sensorNumber, date, temperature, chipID } = reading;

  try {
    if (!(sensorNumber && date && temperature && chipID)) {
      let err = new Error();
      err.name = "missingParameters";
      throw err;
    }

    if (!Boolean(moduleList.find((id) => id === chipID))) {
      let err = new Error();
      err.name = "moduleNotExists";
      throw err;
    }
    const regis = new Sensor({
      sensorNumber,
      date,
      temperature,
      chipID,
    });

    await regis.save().then((res) => (result = res));

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
  chipID?: string;
}
export const tempModuleList = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { chipID, frdate, todate } = request.query as tempModuleList;
  let result: sensorReading | undefined = undefined;

  try {
    if (!chipID) {
      let err = new Error();
      err.name = "missingParameters";
      throw err;
    }

    if (!todate) todate = new Date();
    if (!frdate) frdate = moment(todate).add(-1, "day").toDate();

    result = (await Sensor.find({
      chipID,
      fecha: { $gte: frdate, $lte: todate },
    })) as any;

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
  let { frdate, todate } = request.params as tempModuleList;
  let result: sensorReading | undefined = undefined;

  if (!todate) todate = new Date();
  if (!frdate) frdate = moment(todate).add(-1, "day").toDate();
  try {
    result = (await Sensor.find({
      fecha: { $gte: frdate, $lte: todate },
    })) as any;

    response.status(200).send(result).end();
  } catch (err) {
    next(err);
  }
  return;
};
