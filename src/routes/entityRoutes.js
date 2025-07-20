import express from 'express';
import EntityController from '../controllers/EntityController.js';

const router = express.Router();

// entities
router.get('/', EntityController.getAll); 
router.get('/:entityid', EntityController.find);
router.post('/', EntityController.create);
router.put('/:entityid', EntityController.update); 
router.delete('/:entityid', EntityController.delete);

// // entities expenses
// router.get('/:entityid/expenses', EntityController.register); // mudar controller
// router.get('/:entityid/expenses/:expenseId', EntityController.register); // mudar controller
// router.post('/:entityid/expenses', EntityController.register); // mudar controller
// router.put('/:entityid/expenses/:expenseId', EntityController.register); // mudar controller
// router.delete('/:entityid/expenses/:expenseId', EntityController.register); // mudar controller

export default router;