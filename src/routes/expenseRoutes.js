import express from 'express';
import ExpenseController from '../controllers/ExpenseController.js';

const router = express.Router();

router.get('/', ExpenseController.getAll); 

export default router;