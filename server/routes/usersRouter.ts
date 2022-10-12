import { Router } from "express";
import {
  saveUser,
  loginUser,
  listUsers,
  updateEmailUser,
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

usersRouter.put("/upd/email", userExtractor, updateEmailUser);

usersRouter.put("/upd/password", userExtractor, updatePassUser);

usersRouter.delete("/delete/:id", userExtractor, deleteUser);

export default usersRouter;
