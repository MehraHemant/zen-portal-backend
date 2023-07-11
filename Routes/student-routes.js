import express from 'express';
import { attendance, authGetStudent, authenticate, getAllStudents, login, signup, udpateDetails }  from '../Controllers/student-controllers.js';


const router = express.Router();

router.get("/", getAllStudents);
router.post("/signup", signup);
router.post("/login", login);
router.get("/getuser", authenticate, authGetStudent);
router.put("/updateDetails",authenticate, udpateDetails);
router.put("/attend", authenticate, attendance);
export default router;
