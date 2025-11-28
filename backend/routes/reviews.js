import express from 'express';
import { body } from 'express-validator';
import {
    createReview,
    getReviews,
    getAllReviews,
    toggleReviewVisibility,
    deleteReview,
    exportReviews
} from '../controllers/reviewController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').trim().notEmpty().withMessage('Comment is required')
], createReview);

router.get('/', getReviews);
router.get('/export', authMiddleware, exportReviews);
router.get('/all', authMiddleware, getAllReviews);
router.patch('/:id/toggle', authMiddleware, toggleReviewVisibility);
router.delete('/:id', authMiddleware, deleteReview);

export default router;
