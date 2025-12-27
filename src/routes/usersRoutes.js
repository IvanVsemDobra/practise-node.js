import { Router } from 'express';
import { updateUserAvatar } from '../controllers/authController.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.patch('/users/me/avatar', upload.single('avatar'), updateUserAvatar);

export default router;
