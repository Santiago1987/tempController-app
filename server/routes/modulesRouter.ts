import { Router } from "express";
import {
  deleteModule,
  listModules,
  registerModule,
  updateModule,
} from "../controllers/modules";

const modulesRouter = Router();

modulesRouter
  .post("/register", registerModule)
  .get("/list", listModules)
  .put("/update", updateModule)
  .delete("/delete/:id", deleteModule);

export default modulesRouter;
