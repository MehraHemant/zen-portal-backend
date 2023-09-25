import express from 'express';
import { createRequirements, deleteRequirements, getARequirement, getRequirements, updateRequirements } from '../Controllers/requirementController.js';
import { authMiddleware, isAdmin } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.get('/get', getRequirements);
router.get('/get/:id', getARequirement);
router.post('/post', authMiddleware, isAdmin, createRequirements);
router.put('/:id', authMiddleware, isAdmin, updateRequirements);
router.delete('/:id', authMiddleware, isAdmin, deleteRequirements);

export default router;