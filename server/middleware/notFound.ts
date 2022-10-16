import { Request, Response, NextFunction } from "express";

export default (request: Request, response: Response, next: NextFunction) => {
  return response.status(404).send({ error: "not found" }).end();
};
