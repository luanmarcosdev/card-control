import express from 'express';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use(express.json());
router.use(userRoutes);

export default router;

