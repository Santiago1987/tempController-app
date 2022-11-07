import { NextFunction, Response, Request } from "express";
import Module from "../models/module";
import { loadModulelist } from "../utils/moduleList";
import { ModuleFromBD } from "../../types";

interface module {
  chipID: string;
  name?: string;
  active: boolean;
  ubication?: string;
  sensors?: { name: string; active: string }[];
}

interface req {
  body: module;
}

// REGISTRO DE LOS MODULOS
export const registerModule = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { body } = request as req;
  let savedModule: any = undefined;
  let modexists = false;

  let { chipID, name, active, ubication } = body;

  try {
    if (!chipID) {
      let err = new Error();
      err.name = "missingParameters";
      throw err;
    }

    modexists = Boolean(await Module.findOne({ chipID }));

    if (modexists) {
      response.status(401).send({ error: "module already exists" }).end();
      return;
    }

    name ??= "Modulo de sensores";
    active ??= true;

    const module = new Module({
      chipID,
      name,
      active,
      ubication,
    });

    savedModule = await module.save();

    response.status(200).send(savedModule).end();
    loadModulelist();
    return;
  } catch (err) {
    next(err);
    return;
  }
  return;
};

//LISTA DE MODULOS
export const listModules = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let list: module[] = [];

  try {
    list = await Module.find();
    response.status(200).send(list).end();
    return;
  } catch (err) {
    next(err);
    return;
  }
  return;
};

//ACTUALIZAR MODULOS
export const updateModule = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { chipID, name, active, ubication } = request.body;
  let data: ModuleFromBD | undefined | null = undefined;
  try {
    if (!chipID) {
      let err = new Error();
      err.name = "missingParameters";
      throw err;
    }

    data = await Module.findOneAndUpdate(
      { chipID },
      { $set: { name, active, ubication } },
      { new: true }
    );

    response.status(200).send(data).end();
    return;
  } catch (err) {
    next(err);
  }
  return;
};

export const updateModuleSensor = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { chipID, sensors } = request.body;
  let data: ModuleFromBD | undefined | null = undefined;
  try {
    if (!chipID) {
      let err = new Error();
      err.name = "missingParameters";
      throw err;
    }

    data = await Module.findOneAndUpdate(
      { chipID },
      { $set: { sensors } },
      { new: true }
    );

    response.status(200).send(data).end();
    return;
  } catch (err) {
    next(err);
  }
  return;
};

export const deleteModule = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { id } = request.query;
  let result: any = undefined;
  try {
    if (!id) {
      let err = new Error();
      err.name = "missingParameters";
      throw err;
    }

    result = await Module.deleteOne({ chipID: id });

    response.status(200).send(result).end();
    loadModulelist();
    return;
  } catch (err) {
    next(err);
    return;
  }
  return;
};
