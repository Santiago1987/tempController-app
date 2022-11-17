import { Request, Response, NextFunction } from "express";
import User from "../models/user";
//import { connection } from "mongoose";
import bcrypt from "bcrypt";
import { UserFromBD, UserFromBDFilter } from "../../types";
import jwt from "jsonwebtoken";
import { extreq } from "../../types";

// register new user
export const saveUser = async (
  request: extreq,
  response: Response,
  next: NextFunction
) => {
  const { body, userID } = request;
  let { userName, password, email, administrator, telephone } = body;
  email ??= "";
  telephone ??= "";

  try {
    if (!(userName && password && userID)) {
      let err = new Error();
      err.name = "missingParameters";
      throw err;
    }

    if (administrator === undefined) administrator = false;
    password = password.toString();
    let passwordHash: string | undefined = undefined;
    let savedUser: any = undefined;
    let findUser: UserFromBDFilter | undefined = undefined;

    // controlar que el user name no exista
    findUser = (await User.findOne({ userName })) as UserFromBDFilter;

    if (findUser) {
      response.status(401).send({ error: "name already exists" }).end();
      return;
    }

    // encryptado de password
    passwordHash = await bcrypt.hash(password, 10);

    // guardado de usuario
    const user = new User({
      userName,
      email,
      passwordHash,
      administrator,
      telephone,
      adminID: userID,
    });
    savedUser = await user.save();

    response.status(200).json(savedUser).end();
  } catch (err) {
    next(err);
    return;
  }
  return;
};

// user login
export const loginUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { body } = request;
  const { userName, password } = body;

  let user: UserFromBD | null = null;

  if (!(password && userName)) {
    let err = new Error();
    err.name = "missingParameters";
    throw err;
  }

  try {
    user = (await User.findOne({ userName })) as UserFromBD;

    if (!user) {
      response.status(401).json({ error: "invalid user or password" }).end();
      return;
    }

    const { email, passwordHash, id, administrator } = user;

    let isPasswordCorrect = await bcrypt.compare(password, passwordHash);

    if (!isPasswordCorrect) {
      response
        .status(401)
        .json({
          error: "invalid user or password",
        })
        .end();
      return;
    }

    const userForToken = {
      id,
      userName,
    };

    const secretword = process.env.TOKEN_WORLD;
    const token = secretword
      ? jwt.sign(userForToken, secretword, {
          expiresIn: 60 * 60 * 24,
        })
      : undefined;

    if (!token) {
      response.status(500).send({ error: "token invalid" }).end();
      return;
    }

    response.send({ email, userName, token, administrator }).status(200).end();
    return;
  } catch (err) {
    next(err);
    return;
  }
};

// LISTA DE USUARIOS
export const listUsers = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    let result = await User.find();
    response.status(200).send(result).end();
  } catch (err) {
    next(err);
  }

  return;
};

// ACTUALIZAR USUARIO
export const updUserInfo = async (
  request: extreq,
  response: Response,
  next: NextFunction
) => {
  let { body } = request;
  let { id, email, telephone, userName } = body;
  console.log(id);

  try {
    if (!id) {
      let err = new Error();
      err.name = "missingParameters";
      throw err;
    }

    let result = await User.findOneAndUpdate(
      { _id: id },
      { $set: { email, telephone, userName } },
      { new: true }
    );

    response.status(200).send(result).end();
  } catch (err) {
    next();
  }

  return;
};

// ACTUALIZAR PASSWORD
export const updatePassUser = async (
  request: extreq,
  response: Response,
  next: NextFunction
) => {
  let { body } = request;
  let { id, password } = body;

  if (!(id && password)) {
    let err = new Error();
    err.name = "missingParameters";
    throw err;
  }

  try {
    // encryptado de password
    let passwordHash = await bcrypt.hash(password, 10);

    let data = await User.findOneAndUpdate(
      { _id: id },
      { $set: { passwordHash } },
      { new: true }
    );

    response.status(200).send(data).end();
  } catch (err) {
    next(err);
  }

  return;
};

//DELETE USER
export const deleteUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { id } = request.query;
  let res: any = undefined;

  try {
    if (!id) {
      let err = new Error();
      err.name = "missingParameters";
      throw err;
    }

    let result = (await User.findOne({ _id: id })) as any;

    if (!result) {
      let err = new Error();
      err.name = "missingParameters";
      throw err;
    }

    if (result.administrator) {
      let err = new Error();
      err.name = "administratorUser";
      throw err;
    }

    res = await User.deleteOne({ _id: id });

    response.status(200).send(res).end();
  } catch (err) {
    next(err);
  }

  return;
};
