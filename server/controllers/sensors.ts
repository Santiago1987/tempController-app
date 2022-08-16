import { NextFunction, Response } from "express";
import { extreq } from "../../types";

export const testsensor = (req: extreq, res: Response, next: NextFunction) => {
  const { userID } = req;

  return res.send({
    message: `token working - id sacado del middleware: ${userID}`,
  });
};
