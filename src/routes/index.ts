import express from 'express';
import productRoute from './productRoutes'
import productDeatilsRoute from './productDetailRoutes'
import reviewRoutes from './reviewRoutes'

const router = express.Router();

router.use('/product', productRoute);

router.use('/product-details', productDeatilsRoute);

router.use('/review', reviewRoutes);

export default router;
