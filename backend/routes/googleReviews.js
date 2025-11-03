import express from 'express';
import {
  getGoogleReviewLink,
  getGoogleReviews,
} from '../controllers/googleReviewController.js';

const router = express.Router();

router.get('/', getGoogleReviews);
router.get('/link', getGoogleReviewLink);

export default router;
