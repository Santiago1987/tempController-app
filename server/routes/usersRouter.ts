import { Router } from "express";
import {
  saveUser,
  loginUser,
  listUsers,
  updUserInfo,
  updatePassUser,
  deleteUser,
} from "../controllers/users";
import userExtractor from "../middleware/userExtractor";

const usersRouter = Router();

// register new user
usersRouter.post("/register", saveUser);

// user login
usersRouter.post("/login", loginUser);

// lista de usuario
usersRouter.get("/list", userExtractor, listUsers);

usersRouter.put("/upd/info", userExtractor, updUserInfo);

usersRouter.put("/upd/password", userExtractor, updatePassUser);

usersRouter.delete("/delete", userExtractor, deleteUser);

export default usersRouter;
