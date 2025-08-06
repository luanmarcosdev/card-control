import express from 'express';
import EntityController from '../controllers/EntityController.js';
import EntityExpenseController from '../controllers/EntityExpenseController.js';
import verifyEntityOwnership from '../middlewares/verifyEntityOwnership.js';

const router = express.Router();

// entities
router.get('/', EntityController.getAll); 
router.get('/:entityid', EntityController.find);
router.post('/', EntityController.create);
router.put('/:entityid', EntityController.update); 
router.delete('/:entityid', EntityController.delete);

// entities expenses
router.get('/:entityid/expenses', verifyEntityOwnership, EntityExpenseController.getAll);
router.get('/:entityid/expenses/:expenseId', verifyEntityOwnership, EntityExpenseController.find);
router.post('/:entityid/expenses', verifyEntityOwnership, EntityExpenseController.create);
router.put('/:entityid/expenses/:expenseId', verifyEntityOwnership, EntityExpenseController.update);
router.delete('/:entityid/expenses/:expenseId', verifyEntityOwnership, EntityExpenseController.delete);

export default router;