import Offer from '../models/Offer.js';
import Review from '../models/Review.js';

export const createReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    const activeOffer = await Offer.findOne({ isActive: true }).sort({
      createdAt: -1,
    });
    const couponCode = activeOffer
      ? `DISCOUNT${activeOffer.discountPercentage}-${Date.now()
          .toString(36)
          .toUpperCase()}`
      : null;

    const review = new Review({ name, rating, comment, couponCode });
    await review.save();

    // Suggest Google review for positive ratings (4-5 stars)
    const shouldSuggestGoogle = rating >= 4;
    const googlePlaceId = process.env.GOOGLE_PLACE_ID;
    const googleReviewLink = googlePlaceId
      ? `https://search.google.com/local/writereview?placeid=${googlePlaceId}`
      : null;

    res.status(201).json({
      message: 'Review submitted successfully',
      review,
      discount: activeOffer ? activeOffer.discountPercentage : 0,
      couponCode,
      suggestGoogleReview: shouldSuggestGoogle,
      googleReviewLink,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ isVisible: true }).sort({
      createdAt: -1,
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const toggleReviewVisibility = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.isVisible = !review.isVisible;
    await review.save();

    res.json({ message: 'Review visibility updated', review });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
