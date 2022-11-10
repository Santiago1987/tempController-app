import { Router } from "express";
import {
  saveSettings,
  getSettings,
  updSettings,
} from "../controllers/settings";
import userExtractor from "../middleware/userExtractor";

const settingsRouter = Router();

settingsRouter
  .post("/save", userExtractor, saveSettings)
  .get("/", userExtractor, getSettings)
  .put("/upd", userExtractor, updSettings);

export default settingsRouter;
