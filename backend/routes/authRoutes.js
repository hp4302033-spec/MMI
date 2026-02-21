import { Router } from 'express';
import { createRm, login, logout, me, refresh, registerAdmin } from '../controllers/authController.js';
import { authLimiter } from '../middleware/rateLimiters.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { loginValidation, userValidation } from '../utils/validators.js';

const router = Router();

router.post('/register-admin', userValidation, validate, registerAdmin);
router.post('/login', authLimiter, loginValidation, validate, login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', protect, me);
router.post('/register-rm', protect, authorize('admin'), userValidation, validate, createRm);

export default router;
