import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.find);
router.post('/users', UserController.create);
router.delete('/users/:id', UserController.delete);
router.put('/users/:id', UserController.update);

export default router;