import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  loginUserShema,
  registerUserSchema,
} from '../validation/authValidation.js';
import {
  loginUser,
  registerUser,
  logoutUser,
} from '../controllers/authController.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/auth/login', celebrate(loginUserShema), loginUser);
router.post('/auth/logout', logoutUser);
export default router;
