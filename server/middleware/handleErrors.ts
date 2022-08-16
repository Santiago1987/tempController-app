import { ErrorRequestHandler, Response, Request, NextFunction } from "express";

const ERROR_HANDLERS: any = {
  CastError: (res: Response) =>
    res.status(400).send({ error: "id used is malformed" }),

  ValidationError: (res: Response, err: ErrorRequestHandler) =>
    res.status(409).send({ error: err.toString() }),

  JsonWebTokenError: (res: Response) =>
    res.status(401).json({ error: "token missing or invalid" }),

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
};
