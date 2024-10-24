import express from 'express';
import { productValidate } from '../validations/product';
import { deleteProductDetails, getProductDetails, productDetailsRegistration, productDetailsUpdate } from '../controllers/productDetailsController';

const router = express.Router();

router.get('/:id', getProductDetails);

router.post('/:id', productDetailsRegistration);

router.patch('/:id', productDetailsUpdate);

router.delete('/:id', deleteProductDetails);

export default router;
 