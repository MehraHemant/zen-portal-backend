import express from 'express';
import { addSessions, getAllSessions } from '../Controllers/session-controllers.js';

const router = express.Router();

router.post('/addsession', addSessions);
router.get('/getsession', getAllSessions);

export default router;