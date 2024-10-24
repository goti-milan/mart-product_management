import express from 'express';
import { createReview, deleteReview, getReview, updateReview } from '../controllers/reviewController';

const router = express.Router();

router.get('/:id', getReview);

router.post('/:id', createReview);

router.patch('/:id', updateReview);

router.delete('/:id', deleteReview);

export default router;