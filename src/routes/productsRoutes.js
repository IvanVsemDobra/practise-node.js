import { Router } from 'express';

const router = Router();

router.get('/products', getAllProducts);
export default router;
