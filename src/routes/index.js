import express from 'express';
import authToken from '../middlewares/auth.js';
import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';

const router = express.Router();

router.use(express.json());

router.use('/auth', authRoutes);
router.use(authToken, userRoutes);

export default router;
