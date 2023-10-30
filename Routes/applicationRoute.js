import express from "express";
import { getApplication } from "../Controllers/applicationController.js";

const router = express.Router();
router.get("/", getApplication);
export default router;
