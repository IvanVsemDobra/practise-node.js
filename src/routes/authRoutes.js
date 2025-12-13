import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerUserSchema } from '../validation/authValidation.js';
import { registerUser } from '../controllers/productsController.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), registerUser);

export default router;
