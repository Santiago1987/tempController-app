import { Request, Response, NextFunction } from "express";
import moment from "moment";
import Sensor from "../models/sensor";
interface sensorReading {
  sensorNumber: number;
  date: Date;
  temperature: number;
  chipID: string;
}

export const resgiterTemp = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let reading = request.body as sensorReading;
  let result = undefined;

  let { sensorNumber, date, temperature, chipID } = reading;

  if (!(sensorNumber && date && temperature && chipID)) {
    response.status(401).send({ error: "missing data" }).end();
  }

  const regis = new Sensor({
    sensorNumber,
    date,
    temperature,
    chipID,
  });

  regis
    .save()
    .then((res) => {
      result = res;
    })
    .catch((err) => next(err));

  response.status(200).send(result).end();
};

// LISTA DE TEMPERATURAS REGISTRADA POR UN DETERMINADO MODULO EN UN PERIODO
interface tempModuleList {
  frdate?: Date;
  todate?: Date;
}
export const tempModuleList = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { frdate, todate } = request.body as tempModuleList;
  let { chipID } = request.params;
  let result = undefined;

  if (!chipID) {
    response.status(401).send({ error: "missing parameters" }).end();
  }

  if (!todate) todate = new Date();
  if (!frdate) frdate = moment(todate).add(-1, "day").toDate();

  Sensor.find({ chipID, fecha: { $gte: frdate, $lte: todate } })
    .then((res) => {
      result = res;
    })
    .catch((err) => next(err));

  response.status(200).send(result).end();
};

//LISTA DE TEMPERATURAS REGISTRADAS POR TODOS LOS MODULOS EN UN DETERMINADO PERIODO
export const temperatureList = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { frdate, todate } = request.body as tempModuleList;
  let result = undefined;

  if (!todate) todate = new Date();
  if (!frdate) frdate = moment(todate).add(-1, "day").toDate();

  Sensor.find({ fecha: { $gte: frdate, $lte: todate } })
    .then((res) => {
      result = res;
    })
    .catch((err) => next(err));

  response.status(200).send(result).end();
};
