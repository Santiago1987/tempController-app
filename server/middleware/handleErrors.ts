import { ErrorRequestHandler, Response, Request, NextFunction } from "express";

const ERROR_HANDLERS: any = {
  CastError: (res: Response) =>
    res.status(401).send({ error: "id used is malformed" }),

  ValidationError: (res: Response, err: ErrorRequestHandler) =>
    res.status(401).send({ error: err.toString() }),

  JsonWebTokenError: (res: Response) =>
    res.status(401).json({ error: "token missing or invalid" }),

  missingParameters: (res: Response) =>
    res.status(401).send({ error: "missing parameters" }).end(),

  TokenExpiredError: (res: Response) =>
    res.status(401).send({ error: "token expired" }).end(),

  moduleNotExists: (res: Response) =>
    res.status(401).send({ error: "module does not exists" }).end(),

  administratorUser: (res: Response) =>
    res
      .status(401)
      .send({ error: "administrator user can't be deleted" })
      .end(),

  defaultError: (res: Response) => res.status(500).end(),
};

export default (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error.name);
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;

  handler(res, error);
  return;
};
