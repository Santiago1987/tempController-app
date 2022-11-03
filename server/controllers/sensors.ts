import { Request, Response, NextFunction } from "express";
import moment from "moment";
import Sensor from "../models/sensor";
import Module from "../models/module";
import { moduleList } from "../utils/moduleList";
import { ModuleFromBD, sensorReading } from "../../types";

export const resgiterTemp = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let reading = request.body as sensorReading;
  let result: any = undefined;
  let { date, temperature, chipID } = reading;

  if (!date) date = new Date();

  try {
    if (!(temperature && chipID)) {
      let err = new Error();
      err.name = "missingParameters";
      throw err;
    }

    let listStr = temperature.replaceAll("'", "").split(" ");
    let TArr: number[] = [];
    for (let n of listStr) {
      TArr.push(parseFloat(n));
    }

    if (!Boolean(moduleList.find((id) => id === chipID))) {
      let err = new Error();
      err.name = "moduleNotExists";
      throw err;
    }

    const regis = new Sensor({
      date,
      temperature: TArr,
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
  frDate?: Date;
  toDate?: Date;
  chipID?: string;
}
export const tempModuleList = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { chipID, frDate, toDate } = request.query as tempModuleList;
  let result: sensorReading | undefined = undefined;

  try {
    if (!chipID) {
      let err = new Error();
      err.name = "missingParameters";
      throw err;
    }

    if (!toDate) toDate = new Date();
    if (!frDate) frDate = moment(toDate).add(-1, "day").toDate();

    result = (await Sensor.find({
      chipID,
      fecha: { $gte: frDate, $lte: toDate },
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
  let { frDate, toDate } = request.query as tempModuleList;
  let result: sensorReading | undefined = undefined;

  if (!toDate) toDate = new Date();
  if (!frDate) frDate = moment(toDate).add(-1, "day").toDate();

  try {
    result = (await Sensor.find({
      date: { $gte: frDate, $lte: toDate },
    })) as any;

    response.status(200).send(result).end();
  } catch (err) {
    next(err);
  }
  return;
};

//SAVE OR UPDATE SENSOR INFO
export const updSensorInfo = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { chipID, sensorNumber, name, active } = request.query as any;
  let result: ModuleFromBD | undefined | null = undefined;

  try {
    if (!(chipID && sensorNumber)) {
      console.log(chipID, sensorNumber, name, active);
      let err = new Error();
      err.name = "missingParameters";
      throw err;
    }
    sensorNumber = sensorNumber - 1;
    if (!name) name = `Sensor ${sensorNumber}`;
    if (active === undefined) active = true;

    let module = Module.find({ chipID }) as any;
    if (!module) {
      let err = new Error();
      err.name = "moduleNotExists";
      throw err;
    }
    let { sensors } = module;
    sensors[sensorNumber + 1] = { name, active };
    result = await Sensor.findByIdAndUpdate(
      { chipID },
      { $set: { sensors } },
      { new: true }
    );

    response.status(200).send(result).end();
  } catch (err) {
    next(err);
  }
  return;
};
