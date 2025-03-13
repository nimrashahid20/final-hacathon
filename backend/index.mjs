import express from "express";
import mongoose from "./db/index.mjs";
import userRoutes from "./routes/userRoutes.mjs"
import chalk from "chalk";
import cors from "cors";

mongoose.connection.on("open", () => {
  console.log(chalk.white.bold.bgGreen("MongoDB connected"));
});
mongoose.connection.on("error", () => {
  console.error(chalk.bold.bgRed("Error in connecting MongoDB"));
});
const app = express();
app.use(cors());

app.use(express.json());
const port = 5000;
app.use("/api",userRoutes)

app.use("/", (req, res, next) => {
  console.log("Request URL:", req.url, "method: ", req.method);
  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
