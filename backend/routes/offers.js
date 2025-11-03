import express from 'express';
import { body } from 'express-validator';
import {
    createOffer,
    getActiveOffer,
    getAllOffers,
    updateOffer,
    deleteOffer
} from '../controllers/offerController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, [
    body('discountPercentage').isInt({ min: 0, max: 100 }).withMessage('Discount must be between 0 and 100')
], createOffer);

router.get('/active', getActiveOffer);
router.get('/', authMiddleware, getAllOffers);
router.put('/:id', authMiddleware, updateOffer);
router.delete('/:id', authMiddleware, deleteOffer);

export default router;
