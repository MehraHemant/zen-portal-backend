import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import studentRouter from "./Routes/studentRoute.js";
import certificateRouter from "./Routes/certificateRoute.js";
import applicationRouter from "./Routes/applicationRoute.js";
import sessionRouter from "./Routes/sessionRoute.js";
import batchRouter from "./Routes/batchRoute.js";
import answerRouter from "./Routes/answerRoute.js";
import requirementRouter from "./Routes/requirementsRoute.js";
import activityRouter from "./Routes/activityRoute.js";
import placementRouter from "./Routes/placementRoute.js";
import cors from "cors";
import { errorHandler, notFound } from "./Middleware/errorHandler.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());

app.use("/api", studentRouter);
app.use("/api/certificate", certificateRouter);
app.use("/api/application", applicationRouter);
app.use("/api/session", sessionRouter);
app.use("/api/answers", answerRouter);
app.use("/api/batch", batchRouter);
app.use("/api/requirements", requirementRouter);
app.use("/api/activity", activityRouter);
app.use("/api/placement", placementRouter);

app.use(notFound);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB)
  .then(() => app.listen(process.env.PORT))
  .then(() =>
    console.log(
      "Connected! Server is running on http://localhost:" +
        process.env.PORT +
        "/api"
    )
  )
  .catch((err) => console.log(err));
