import { Router } from "express";
import { saveUser, loginUser } from "../controllers/users";

const usersRouter = Router();

// register new user
usersRouter.post("/register", saveUser);

// user login
usersRouter.post("/login", loginUser);

export default usersRouter;
