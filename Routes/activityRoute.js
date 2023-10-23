import express from "express";
import { authMiddleware, isAdmin } from "../Middleware/authMiddleware.js";
import { createActivity, getActivity } from "../Controllers/activityController.js";

const router = express.Router();

router.get("/get/:session", authMiddleware, getActivity);
router.post("/", authMiddleware, isAdmin, createActivity);

export default router;
