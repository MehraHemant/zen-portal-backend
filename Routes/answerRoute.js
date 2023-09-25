import express from "express";
import { getAnswer, postAnswer } from "../Controllers/answerController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/get", authMiddleware, getAnswer);
router.post("/post/:id", authMiddleware, postAnswer);
export default router;
