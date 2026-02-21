import { Router } from 'express';
import {
  createClient,
  downloadKyc,
  getClientById,
  listClients,
  softDeleteClient,
  updateClient
} from '../controllers/clientController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { uploadKyc } from '../middleware/uploadMiddleware.js';
import { validate } from '../middleware/validate.js';
import { clientValidation } from '../utils/validators.js';

const router = Router();

router.use(protect);
router.get('/', listClients);
router.get('/:id', getClientById);
router.post('/', authorize('admin', 'relationship_manager'), uploadKyc.single('kycDocument'), clientValidation, validate, createClient);
router.put('/:id', authorize('admin', 'relationship_manager'), uploadKyc.single('kycDocument'), updateClient);
router.delete('/:id', authorize('admin'), softDeleteClient);
router.get('/:id/kyc', downloadKyc);

export default router;
