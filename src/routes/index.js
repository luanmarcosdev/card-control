import express from 'express';
import authToken from '../middlewares/auth.js';
import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';
import entityRoutes from './entityRoutes.js';
import expenseRoutes from './expenseRoutes.js';
import expenseCategoryRoutes from './expenseCategoryRoutes.js';

const router = express.Router();

router.use(express.json());

router.use('/auth', authRoutes);
router.use('/user', authToken, userRoutes);
router.use('/user/entities', authToken, entityRoutes);
router.use('/user/expenses', authToken, expenseRoutes);
router.use('/expenses/categories', authToken, expenseCategoryRoutes);

export default router;
