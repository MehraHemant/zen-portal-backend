import express from "express";
import { authMiddleware, isAdmin } from "../Middleware/authMiddleware.js";
import { createActivity } from "../Controllers/activityController.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createActivity);

export default router;
