import { body } from 'express-validator';

export const loginValidation = [body('email').isEmail(), body('password').isLength({ min: 8 })];

export const userValidation = [
  body('fullName').trim().notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 8 })
];

export const clientValidation = [
  body('fullName').trim().notEmpty(),
  body('dob').isISO8601(),
  body('panNumber').matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),
  body('aadhaarNumber').matches(/^\d{12}$/),
  body('email').isEmail(),
  body('mobile').isMobilePhone('en-IN'),
  body('address').notEmpty(),
  body('riskProfile').isIn(['conservative', 'moderate', 'aggressive']),
  body('assignedRelationshipManager').isMongoId()
];

export const investmentValidation = [
  body('schemeName').notEmpty(),
  body('amcName').notEmpty(),
  body('investmentType').isIn(['sip', 'lump_sum']),
  body('sipAmount').optional().isFloat({ min: 0 }),
  body('totalInvestedAmount').isFloat({ min: 0 }),
  body('investmentDate').isISO8601(),
  body('folioNumber').notEmpty(),
  body('currentValue').isFloat({ min: 0 }),
  body('paymentStatus').isIn(['paid', 'pending'])
];
