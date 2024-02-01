import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(router);

export default app;
