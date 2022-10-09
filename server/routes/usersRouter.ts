import { Router } from "express";
import {
  saveUser,
  loginUser,
  listUsers,
  updateEmailUser,
  deleteUser,
} from "../controllers/users";

const usersRouter = Router();

// register new user
usersRouter.post("/register", saveUser);

// user login
usersRouter.post("/login", loginUser);

// lista de usuario
usersRouter.get("/list", listUsers);

usersRouter.put("/upd/email", updateEmailUser);

usersRouter.put("/upd/password", updateEmailUser);

usersRouter.delete("/delete/:id", deleteUser);

export default usersRouter;
