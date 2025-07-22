import express from 'express';
import ExpenseCategory from '../controllers/ExpenseCategory.js'; // mudar controller

const router = express.Router();

router.get('/', ExpenseCategory.getAll); // mudar controller
router.get('/:id', ExpenseCategory.find); // mudar controller
router.post('/', ExpenseCategory.create); // mudar controller
router.put('/:id', ExpenseCategory.update); // mudar controller

export default router;