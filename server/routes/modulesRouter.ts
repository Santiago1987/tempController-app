import { Router } from "express";
import {
  deleteModule,
  listModules,
  registerModule,
  updateModule,
} from "../controllers/modules";

const modulesRouter = Router();

modulesRouter
  .post("/resiter", registerModule)
  .get("/list", listModules)
  .put("/update", updateModule)
  .delete("/delete", deleteModule);

export default modulesRouter;
