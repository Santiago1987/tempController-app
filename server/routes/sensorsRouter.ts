import { Router } from "express";
import {
  resgiterTemp,
  tempModuleList,
  temperatureList,
} from "../controllers/sensors";

const sensorsRouter = Router();

sensorsRouter
  .post("/register", resgiterTemp)
  .get("/module/:chipID", tempModuleList)
  .get("/list", temperatureList);

export default sensorsRouter;
