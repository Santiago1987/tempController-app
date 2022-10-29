import { Router } from "express";
import {
  resgiterTemp,
  tempModuleList,
  temperatureList,
  updSensorInfo,
} from "../controllers/sensors";
import userExtractor from "../middleware/userExtractor";

const sensorsRouter = Router();

sensorsRouter
  .post("/register", resgiterTemp)
  .get("/module", userExtractor, tempModuleList)
  .get("/list", userExtractor, temperatureList)
  .post("/update", userExtractor, updSensorInfo);

export default sensorsRouter;
