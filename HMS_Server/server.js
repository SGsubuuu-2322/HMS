import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

const PORT = process.env.PORT || 7002;
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is successfully running at PORT ${PORT}`);
});
