import express from "express";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { getCertificate } from "../Controllers/certificateController.js";
const router = express.Router();

router.get('/', getCertificate);

export default router;