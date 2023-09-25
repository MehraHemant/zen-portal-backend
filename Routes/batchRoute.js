import express from "express";
import {
  createBatch,
  getAllBatch,
  getBatch,
  updateBatch,
} from "../Controllers/batchController.js";
import { authMiddleware, isAdmin } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBatch);
router.get("/get-all-batch", authMiddleware, isAdmin, getAllBatch);
router.get("/:id", getBatch);
router.put("/update-batch/:id", authMiddleware, isAdmin, updateBatch);

export default router;
