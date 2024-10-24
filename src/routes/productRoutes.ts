import express from 'express';
import { deleteProduct, getProduct, productRegistration, productUpdate } from '../controllers/productController';

const router = express.Router();

router.get('/:id', getProduct);

router.post('/register', productRegistration);

router.patch('/:id', productUpdate);

router.delete('/:id', deleteProduct);

export default router;
