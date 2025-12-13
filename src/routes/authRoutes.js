import { Router } from 'express';
import { celebrate } from 'celebrate';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), registerUser);

export default router;
