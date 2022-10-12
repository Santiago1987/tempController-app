import { NextFunction, Response, Request } from "express";
import Module from "../models/module";

interface module {
  chipID: string;
  name?: string;
  active: boolean;
  ubication?: string;
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
  let savedModule = undefined;
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
  let result: module[] = [];

  try {
    list = await Module.find();

    list.map((mod) => {
      let { chipID, name, active, ubication } = mod;
      result.push({ chipID, name, active, ubication });
    });

    response.status(200).send(result).end();
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
  let data = undefined;

  if (!chipID) {
    let err = new Error();
    err.name = "missingParameters";
    throw err;
  }

  try {
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

export const deleteModule = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { id } = request.params;
  let result = undefined;

  if (!id) {
    let err = new Error();
    err.name = "missingParameters";
    throw err;
  }

  try {
    result = await Module.deleteOne({ chipID: id });

    response.status(200).send(result).end();
    return;
  } catch (err) {
    next(err);
    return;
  }
  return;
};
