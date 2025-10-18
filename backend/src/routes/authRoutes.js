import express from 'express';
import { register, login, verifyEmail, requestPasswordReset, resetPassword } from '../controllers/authController.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', verifyEmail);

//password reset
router.post('/forgot', requestPasswordReset); 
router.post('/reset', resetPassword);          

export default router;
