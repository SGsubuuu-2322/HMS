import express from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./configs/config.js";
import router from "./routes/index.js";
import connectDB from "./configs/dbConnection.js";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

app.use("/api", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is successfully running at PORT ${PORT}`);
  });
});
