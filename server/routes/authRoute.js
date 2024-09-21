// routes/authRoutes.js
import { Router } from 'express';
import { signUp, login, logout, checkAuth, getUsers } from '../controllers/authController.js';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);
router.get('/checkauth', checkAuth,);
router.get('/getusers',getUsers);
export default router;
