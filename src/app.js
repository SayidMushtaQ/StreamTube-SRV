import express from "express";
import cors from "cors";
import { DATA_LIMIT } from "./constants.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  })
);

// Down below: Data Configuration
app.use(express.json({ limit: DATA_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: DATA_LIMIT }));
app.use(express.static("public"));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

//Import routes
import userRouter from "./routes/user.router.js";

app.use("/api/v1/users", userRouter);

export { app };
