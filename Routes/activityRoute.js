import express from "express";
import { authMiddleware, isAdmin } from "../Middleware/authMiddleware.js";
import { createActivity, getActivity, getCapstone, getWebcode } from "../Controllers/activityController.js";

const router = express.Router();

router.get("/get/:session", authMiddleware, getActivity);
router.get("/getcapstone", authMiddleware, getCapstone);
router.get("/getwebcode", authMiddleware, getWebcode);
router.post("/create", authMiddleware, isAdmin, createActivity);

export default router;
