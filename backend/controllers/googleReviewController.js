import axios from 'axios';

export const getGoogleReviews = async (req, res) => {
  try {
    const { GOOGLE_API_KEY, GOOGLE_PLACE_ID } = process.env;

    if (!GOOGLE_API_KEY || !GOOGLE_PLACE_ID) {
      return res.json({
        message: 'Google API credentials not configured',
        reviews: [],
        rating: 0,
      });
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=reviews,rating&key=${GOOGLE_API_KEY}`;

    const response = await axios.get(url);

    if (response.data.status === 'OK') {
      const reviews = response.data.result.reviews || [];
      res.json({ reviews, rating: response.data.result.rating });
    } else {
      res.json({
        message: 'Failed to fetch Google reviews',
        error: response.data.status,
        reviews: [],
        rating: 0,
      });
    }
  } catch (error) {
    res.json({
      message: 'Server error',
      error: error.message,
      reviews: [],
      rating: 0,
    });
  }
};

export const getGoogleReviewLink = async (req, res) => {
  try {
    const { GOOGLE_PLACE_ID } = process.env;

    if (!GOOGLE_PLACE_ID) {
      return res.status(500).json({
        message: 'Google Place ID not configured',
        link: null,
      });
    }

    const reviewLink = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;

    res.json({
      link: reviewLink,
      message: 'Google review link generated successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
      link: null,
    });
  }
};
