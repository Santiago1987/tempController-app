import express from "express";
import cors from "cors";
import connectiondb from "./mongodb";
import { config } from "dotenv";
import notFound from "./middleware/notFound";
import usersRouter from "./routes/usersRouter";
import handleErrors from "./middleware/handleErrors";
import modulesRouter from "./routes/modulesRouter";
import userExtractor from "./middleware/userExtractor";
import sensorsRouter from "./routes/sensorsRouter";
import { loadModulelist } from "./utils/moduleList";
import settingsRouter from "./routes/settingsRouter";
import { loadSettings } from "./utils/settingStatus";

const app = express();
config();
loadModulelist(); //function to get preload of modules list
loadSettings(); //logeo de settings

const connectionString = process.env.MONGODB_URI || "";

connectiondb(connectionString); //database connection

//MIDDELWARE
app.use(cors());
app.use(express.json());
app.use("/api/module", userExtractor);

//Routes
app.use("/api/user", usersRouter);
app.use("/api/module", modulesRouter);
app.use("/api/sensor", sensorsRouter);
app.use("/api/settings", settingsRouter);

//ERROR MIDDELWARE
app.use(notFound);
app.use(handleErrors);

//SERVER CONFIGURATIONS
const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
