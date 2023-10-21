import express from "express";
import {
  getAnswer,
  getCapstone,
  getWebcode,
  postAnswer,
} from "../Controllers/answerController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/get", authMiddleware, getAnswer);
router.post("/post/:id", authMiddleware, postAnswer);
router.get("/webcode", authMiddleware, getWebcode);
router.get("/capstone", authMiddleware, getCapstone);
export default router;
