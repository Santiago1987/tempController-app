import express from "express";
import cors from "cors";
import connectiondb from "./mongodb";
import { config } from "dotenv";
import notFound from "./middleware/notFound";
import usersRouter from "./routes/usersRouter";
import sensorsRouter from "./routes/sensorsRoute";
import handleErrors from "./middleware/handleErrors";

const app = express();
config();

const connectionString = process.env.MONGODB_URI || "";

connectiondb(connectionString); //database connection

//MIDDELWARE
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/user", usersRouter);
app.use("/api/sensor", sensorsRouter);

//ERROR MIDDELWARE
app.use(notFound);
app.use(handleErrors);

//SERVER CONFIGURATIONS
const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
