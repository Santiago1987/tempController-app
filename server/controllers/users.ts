import { Request, Response, NextFunction } from "express";
import User from "../models/user";
//import { connection } from "mongoose";
import bcrypt from "bcrypt";
import { UserFromBD } from "../../types";
import jwt from "jsonwebtoken";
import { extreq } from "../../types";

// register new user
export const saveUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { body } = request;
  let { userName, password, email } = body;

  try {
    if (!(userName && password)) {
      let err = new Error();
      err.name = "missingParameters";
      throw err;
    }

    password = password.toString();
    let passwordHash = undefined;
    let savedUser = undefined;
    let findUser = undefined;

    // controlar que el user name no exista

    findUser = await User.findOne({ userName });

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
    user = await User.findOne({ userName });

    if (!user) {
      response.status(401).json({ error: "invalid user or password" }).end();
      return;
    }

    const { email, passwordHash, _id } = user;

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
      id: _id,
      userName,
    };

    const secretword = process.env.TOKEN_WORLD;
    const token = secretword
      ? jwt.sign(userForToken, secretword, {
          expiresIn: 60 * 60,
        })
      : undefined;

    if (!token) {
      response.status(500).send({ error: "token invalid" }).end();
      return;
    }

    response.send({ email, userName, token }).status(200).end();
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
export const updateEmailUser = (
  request: extreq,
  response: Response,
  next: NextFunction
) => {
  let { userID, body } = request;
  let { email } = body;

  if (!userID || !email) {
    let err = new Error();
    err.name = "missingParameters";
    throw err;
  }

  User.findOneAndUpdate({ userID }, { $set: { email } }, { new: true })
    .then((res) => {
      response.status(200).send(res).end();
    })
    .catch((err) => next(err));

  return;
};

// ACTUALIZAR PASSWORD
export const updatePassUser = async (
  request: extreq,
  response: Response,
  next: NextFunction
) => {
  let { userID, body } = request;
  let { password } = body;

  if (!(userID && password)) {
    let err = new Error();
    err.name = "missingParameters";
    throw err;
  }

  try {
    // encryptado de password
    let passwordHash = await bcrypt.hash(password, 10);

    let data = await User.findOneAndUpdate(
      { userID },
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
export const deleteUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { id } = request.params;
  if (!id) {
    let err = new Error();
    err.name = "missingParameters";
    throw err;
  }

  User.deleteOne({ _id: id })
    .then((res) => {
      response.status(200).send(res).end();
    })
    .catch((err) => next(err));

  return;
};
