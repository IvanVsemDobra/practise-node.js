import { Router } from 'express';
import { updateUserAvatar } from '../controllers/authController.js';
import { upload } from '../middleware/upload.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

export default router;
