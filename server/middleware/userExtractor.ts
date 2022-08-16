import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { extreq } from "../../types";

export default (req: extreq, res: Response, next: NextFunction) => {
  const authorization = req.get("authorization"); // obtiene el parametro autorization de la cabecera
  let token;

  // tipo de autorizacion bearer => bearer 412asd341dqsrasd34124
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }
  const secretword = process.env.TOKEN_WORLD;

  let decodedToken;
  try {
    decodedToken = secretword && token ? jwt.verify(token, secretword) : null;
  } catch (error) {
    next(error);
  }

  if (!decodedToken) {
    return res.status(500).json({ error: "missing token or invalid" });
  }

  const { id: userID } = decodedToken as any;
  req.userID = userID;

  next();
  return;
};
