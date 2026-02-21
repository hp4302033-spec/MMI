import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = Router();
router.get('/', protect, authorize('admin', 'relationship_manager'), getDashboardStats);

export default router;
