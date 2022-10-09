import { Request, Response, NextFunction, response } from "express";
import User from "../models/user";
//import { connection } from "mongoose";
import bcrypt from "bcrypt";
import { UserFromBD } from "../../types";
import jwt from "jsonwebtoken";
import { extreq } from "../../types";

interface user {
  id: string;
  userName: string;
  email: string;
}

// register new user
export const saveUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { body } = request;
  let { userName, password, email } = body;
  password = password.toString();
  let passwordHash = null;
  let savedUser = undefined;

  // controlar que el user name no exista
  User.findOne({ userName })
    .then((res) => {
      if (res) {
        response.status(401).send({ error: "name already exists" }).end();
      }
    })
    .catch((err) => {
      next(err);
    });

  // encryptado de password
  bcrypt
    .hash(password, 10)
    .then((res) => {
      passwordHash = res;
    })
    .catch((err) => next(err));

  // guardado de usuario
  const user = new User({
    userName,
    email,
    passwordHash,
  });

  user
    .save()
    .then((res) => {
      savedUser = res;
    })
    .catch((err) => next(err));

  response.status(200).json(savedUser).end();
};

// user login
export const loginUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { body } = request;
  const { userName, password } = body;
  let user = undefined;

  User.findOne({ userName })
    .then((res) => {
      user = res;
    })
    .catch((err) => {
      next(err);
    });

  if (!user) {
    response
      .status(401)
      .json({
        error: "invalid user or password",
      })
      .end();
    return;
  }

  const { email, passwordHash, _id } = user as UserFromBD;

  let isPasswordCorrect = false;

  bcrypt
    .compare(password, passwordHash)
    .then((res) => {
      isPasswordCorrect = res;
    })
    .catch((err) => next(err));

  if (!isPasswordCorrect) {
    response.status(401).json({
      error: "invalid user or password",
    });
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

  if (!token) return response.status(500).end();

  return response
    .send({
      email,
      userName,
      token,
    })
    .status(200)
    .end();
};

// LISTA DE USUARIOS
export const listUsers = (res: Response, next: NextFunction) => {
  let result: user[] = [];

  User.find()
    .then((res) => {
      result = res as user[];
    })
    .catch((err) => next(err));

  response.status(200).send(result).end();
};

// ACTUALIZAR USUARIO
export const updateEmailUser = (
  response: Response,
  request: extreq,
  next: NextFunction
) => {
  let { userID, body } = request;
  let { email } = body;
  let data = undefined;

  if (!userID || !email) {
    response.status(401).send({ error: "missing data" }).end();
  }

  User.findOneAndUpdate({ userID }, { $set: { email } }, { new: true })
    .then((res) => {
      data = res;
    })
    .catch((err) => next(err));

  response.status(200).send(data).end();
};

// ACTUALIZAR PASSWORD
export const updatePassUser = (
  response: Response,
  request: extreq,
  next: NextFunction
) => {
  let { userID, body } = request;
  let { password } = body;
  let data = undefined;
  let passwordHash = null;

  if (!userID || !password) {
    response.status(401).send({ error: "missing data" }).end();
  }

  // encryptado de password
  bcrypt
    .hash(password, 10)
    .then((res) => {
      passwordHash = res;
    })
    .catch((err) => next(err));

  User.findOneAndUpdate({ userID }, { $set: { passwordHash } }, { new: true })
    .then((res) => {
      data = res;
    })
    .catch((err) => next(err));

  response.status(200).send(data).end();
};

//DELETE USER
export const deleteUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { id } = request.params;
  let result = null;

  User.deleteOne({ _id: id })
    .then((res) => {
      result = res;
    })
    .catch((err) => next(err));

  response.status(200).send(result).end();

  return;
};
