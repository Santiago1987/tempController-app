import { Request, Response } from "express";
import User from "../models/user";
//import { connection } from "mongoose";
import bcrypt from "bcrypt";
import { UserFromBD } from "../../types";
import jwt from "jsonwebtoken";

//HACER LOS DE NEXT PARA MANEJAR ERRORES

// register new user
export const saveUser = async (request: Request, response: Response) => {
  const { body } = request;
  let { userName, name, password } = body;
  password = password.toString();

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    userName,
    name,
    passwordHash: passwordHash,
  });

  const savedUser = await user.save();

  //connection.close();

  response.json(savedUser);
};

// user login
export const loginUser = async (request: Request, response: Response) => {
  const { body } = request;
  const { userName, password } = body;

  const user = (await User.findOne({ userName })) as UserFromBD;

  if (!user) {
    response.status(401).json({
      error: "invalid user or password",
    });
    return;
  }

  const { name, passwordHash, _id } = user;

  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(password, passwordHash);

  //connection.close();

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

  return response.send({
    name,
    userName,
    token,
  });
};
