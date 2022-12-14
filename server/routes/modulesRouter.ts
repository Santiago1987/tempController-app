import { Router } from "express";
import {
  deleteModule,
  listModules,
  registerModule,
  updateModule,
  updateModuleSensor,
} from "../controllers/modules";

const modulesRouter = Router();

modulesRouter
  .post("/register", registerModule)
  .get("/list", listModules)
  .put("/update", updateModule)
  .delete("/delete", deleteModule)
  .put("/update/sensors", updateModuleSensor);

export default modulesRouter;
