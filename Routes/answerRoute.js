import express from "express";
import {
  getAnswer,
  getAnswerByActivity,
  postAnswer,
  updateAnswer,
} from "../Controllers/answerController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/get", authMiddleware, getAnswer);
router.get("/get/:id", authMiddleware, getAnswerByActivity);
router.post("/post/:id", authMiddleware, postAnswer);
router.put("/update/:id", authMiddleware, updateAnswer);
export default router;
