import { useState } from "react";
import ReviewForm from "./ReviewForm";

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
      window.open(couponData.googleReviewLink, "_blank");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto border-4"
        style={{ borderColor: "#FFBF78" }}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>

        {!submitted ? (
          <>
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#BD5E21" }}
            >
              Leave a Review
            </h2>
            <p className="text-gray-600 mb-6">Share your experience with us!</p>
            <ReviewForm onSuccess={handleSuccess} />
          </>
        ) : (
          <div className="text-center py-6">
            <div className="text-6xl mb-4" style={{ color: "#FF7D29" }}>
              ✓
            </div>
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#BD5E21" }}
            >
              Thank You!
            </h2>
            <p className="text-gray-600 mb-6">
              Your review has been submitted successfully.
            </p>

            {couponData?.couponCode && (
              <div
                className="p-6 rounded-lg mb-4"
                style={{
                  background: "linear-gradient(to right, #FF7D29, #BD5E21)",
                  color: "white",
                }}
              >
                <p className="text-sm mb-2">Your Discount Coupon</p>
                <p className="text-3xl font-bold mb-2">
                  {couponData.discount}% OFF
                </p>
                <div className="bg-white text-gray-800 px-4 py-2 rounded font-mono text-lg font-bold">
                  {couponData.couponCode}
                </div>
              </div>
            )}

            {couponData?.suggestGoogleReview &&
              couponData?.googleReviewLink && (
                <div
                  className="p-4 rounded-lg mb-4 border-2"
                  style={{ backgroundColor: "#FFEEA9", borderColor: "#FFBF78" }}
                >
                  <p className="mb-3 text-sm" style={{ color: "#BD5E21" }}>
                    Love our service? Help others discover us!
                  </p>
                  <button
                    onClick={handleGoogleReview}
                    className="w-full bg-white border-2 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors hover:bg-orange-50"
                    style={{ borderColor: "#FF7D29", color: "#FF7D29" }}
                  >
                    <span className="text-xl">⭐</span>
                    Share on Google Reviews
                  </button>
                </div>
              )}

            <button
              onClick={handleClose}
              className="text-white px-6 py-2 rounded-lg w-full font-semibold transition-colors"
              style={{ backgroundColor: "#FF7D29" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#BD5E21")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF7D29")}
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
