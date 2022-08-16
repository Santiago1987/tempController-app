import { Router } from "express";
import { testsensor } from "../controllers/sensors";
import userExtractor from "../middleware/userExtractor";

const sensorsRouter = Router();

sensorsRouter.get("/testtoken", userExtractor, testsensor);

export default sensorsRouter;
