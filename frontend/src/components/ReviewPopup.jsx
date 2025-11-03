import { useState } from 'react';
import ReviewForm from './ReviewForm';

function ReviewPopup({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [couponData, setCouponData] = useState(null);

  const handleSuccess = (data) => {
    setSubmitted(true);
    setCouponData(data);
  };

  const handleClose = () => {
    setSubmitted(false);
    setCouponData(null);
    onClose();
  };

  const handleGoogleReview = () => {
    if (couponData?.googleReviewLink) {
      window.open(couponData.googleReviewLink, '_blank');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>

        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
            <p className="text-gray-600 mb-6">Share your experience with us!</p>
            <ReviewForm onSuccess={handleSuccess} />
          </>
        ) : (
          <div className="text-center py-6">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your review has been submitted successfully.
            </p>

            {couponData?.couponCode && (
              <div className="bg-linear-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-4">
                <p className="text-sm mb-2">Your Discount Coupon</p>
                <p className="text-3xl font-bold mb-2">
                  {couponData.discount}% OFF
                </p>
                <div className="bg-white text-gray-800 px-4 py-2 rounded font-mono text-lg">
                  {couponData.couponCode}
                </div>
              </div>
            )}

            {couponData?.suggestGoogleReview &&
              couponData?.googleReviewLink && (
                <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 mb-3 text-sm">
                    Love our service? Help others discover us!
                  </p>
                  <button
                    onClick={handleGoogleReview}
                    className="w-full bg-white border-2 border-blue-500 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <span className="text-xl">⭐</span>
                    Share on Google Reviews
                  </button>
                </div>
              )}

            <button
              onClick={handleClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewPopup;
