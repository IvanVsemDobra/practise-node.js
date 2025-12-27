import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
} from '../controllers/productsController.js';
import { authenticate } from '../middleware/authenticate.js';
const router = Router();

router.use('/products', authenticate);

router.get('/products', getAllProducts);
router.get('/products/:productId', getProductById);
router.post('/products', createProduct);

export default router;
