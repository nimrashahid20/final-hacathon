import express from "express";
import mongoose from "./db/index.mjs";
import userRoutes from "./routes/userRoutes.mjs"
import taskRouter from './routes/taskRouter.mjs'
import chalk from "chalk";
import cors from "cors";
import connectToDB from "./db/index.mjs";

//Connecting MongoDB
connectToDB()
const app = express();

app.use(
	cors({
		origin: ['http://localhost:5174',
			 'http://localhost:5173',
			 'https://final-hacathon-one.vercel.app'
			],
		methods: ['GET', 'PUT', 'POST', 'DELETE'],
		credentials: true,
		allowedHeaders: ['Content-Type', 'Authorization'],
	}),
);


app.use(express.json());
const port = 5000;
app.use("/api/auth",userRoutes)
app.use('/api/tasks', taskRouter);

app.use("/", (req, res, next) => {
  console.log("Request URL:", req.url, "method: ", req.method);
  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
