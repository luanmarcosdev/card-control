import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get('/', UserController.getAuthUser);
router.put('/', UserController.updateAuthUser);

export default router;