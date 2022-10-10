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
export const registerModule = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { body } = request as req;
  let savedModule = undefined;

  let { chipID, name, active, ubication } = body;

  if (!chipID) {
    response.status(401).send({ error: "no chipID" }).end();
  }

  Module.findOne({ chipID })
    .then((res) => {
      if (res) {
        response.status(401).send({ error: "module already exists" }).end();
      }
    })
    .catch((err) => next(err));

  name ??= "Modulo de sensores";
  active ??= true;

  const module = new Module({
    chipID,
    name,
    active,
    ubication,
  });

  module
    .save()
    .then((res) => {
      savedModule = res;
    })
    .catch((err) => next(err));

  response.status(200).send(savedModule).end();
};

//LISTA DE MODULOS
export const listModules = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let list: module[] = [];
  let result: module[] = [];

  Module.find()
    .then((res) => {
      list = res;
    })
    .catch((err) => next(err));

  list.map((mod) => {
    let { chipID, name, active, ubication } = mod;
    result.push({ chipID, name, active, ubication });
  });

  response.status(200).send(result).end();
};

//ACTUALIZAR MODULOS
export const updateModule = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { chipID, name, active, ubication } = request.body;
  let data = undefined;

  if (!chipID) {
    response.status(4001).send({ error: "missing chip id" }).end();
  }

  Module.findOneAndUpdate(
    { chipID },
    { $set: { name, active, ubication } },
    { new: true }
  )
    .then((res) => {
      data = res;
    })
    .catch((err) => next(err));

  response.status(200).send(data).end();
};

export const deleteModule = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { id } = request.params;
  let result = undefined;

  if (!id) {
    response.status(401).send({ error: "missing module id" }).end();
  }

  Module.deleteOne({ chipID: id }).then((res) => {
    result = res;
  });

  response.status(200).send(result).end();
};
