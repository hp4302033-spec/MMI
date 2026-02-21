import { Router } from 'express';
import {
  addInvestment,
  deleteInvestment,
  exportClientInvestments,
  getClientInvestmentSummary,
  updateInvestment
} from '../controllers/investmentController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { investmentValidation } from '../utils/validators.js';

const router = Router();

router.use(protect);
router.post('/client/:clientId', authorize('admin', 'relationship_manager'), investmentValidation, validate, addInvestment);
router.put('/:id', authorize('admin', 'relationship_manager'), updateInvestment);
router.delete('/:id', authorize('admin'), deleteInvestment);
router.get('/client/:clientId/summary', getClientInvestmentSummary);
router.get('/client/:clientId/export', exportClientInvestments);

export default router;
