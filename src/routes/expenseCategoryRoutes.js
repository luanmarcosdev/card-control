import express from 'express';
import ExpenseCategoryController from '../controllers/ExpenseCategoryController.js'; 

const router = express.Router();

router.get('/', ExpenseCategoryController.getAll);
router.get('/:id', ExpenseCategoryController.find);
router.post('/', ExpenseCategoryController.create);
router.put('/:id', ExpenseCategoryController.update);

export default router;