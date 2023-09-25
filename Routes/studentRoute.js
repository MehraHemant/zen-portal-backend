import express from "express";
import {
    adminLogin,
getAStudent,
  attendance,
  deleteStudent,
  forgotPasswordToken,
  getAllStudents,
  login,
  registerAStudent,
  resetPassword,
  udpateDetails,
} from "../Controllers/studentController.js";
import { authMiddleware, isAdmin } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/addStudent", registerAStudent);
router.post("/admin-login", adminLogin);
router.get("/getStudents", authMiddleware, isAdmin, getAllStudents);
router.post("/login", login);
router.post("/forgot-password", forgotPasswordToken);
router.post("/reset-password/:token", resetPassword);

router.put("/:id", authMiddleware, udpateDetails);
router.put("/attend", authMiddleware, attendance);

router.get("/:id", authMiddleware, isAdmin, getAStudent);
router.delete("/:id", authMiddleware, isAdmin, deleteStudent);

export default router;
