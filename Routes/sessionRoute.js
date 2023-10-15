import express from "express";
import { authMiddleware, isAdmin } from "../Middleware/authMiddleware.js";

import {
  addSessions,
  getAllSessions,
  getSession,
  postAnswer,
  updateSession,
} from "../Controllers/sessionController.js";

const router = express.Router();

router.post("/addsession", addSessions);
router.post("/update/:id", updateSession);
router.get("/get-session/:id", getSession);
router.get("/get-all-sessions",authMiddleware, getAllSessions);
router.put("/postAnswer/:id", authMiddleware, postAnswer);

export default router;

