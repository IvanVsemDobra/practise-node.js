import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  loginUserShema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/authValidation.js';
import {
  loginUser,
  registerUser,
  logoutUser,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/auth/login', celebrate(loginUserShema), loginUser);
router.post('/auth/logout', logoutUser);

router.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);

router.post(
  '/auth/reset-password',
  celebrate(resetPasswordSchema),
  resetPassword,
);
export default router;
