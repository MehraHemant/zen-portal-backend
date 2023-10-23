import express from 'express';
import { createPlacementBoard, getPlacementBoard } from '../Controllers/placementController.js';

const router = express.Router();

router.post('/create', createPlacementBoard);
router.get('/get', getPlacementBoard);

export default router;