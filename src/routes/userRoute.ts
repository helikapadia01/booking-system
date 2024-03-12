// routes/userRoutes.ts
import express from 'express';
import UserController from '../controllers/userController';
import userController from '../controllers/userController';
import { authenticateMiddleware } from '../middleware/auth';

const router = express.Router();

// POST /signup
router.post('/api/signup', UserController.signUp);
router.get('/api/getUser', userController.getAllUser);
router.post('/api/login', authenticateMiddleware,userController.login);

export default router;
