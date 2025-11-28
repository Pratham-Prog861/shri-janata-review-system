import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReviewsList from "../components/ReviewsList";
import api from "../config/api";

function ReviewsDisplay() {
  const [localReviews, setLocalReviews] = useState([]);
  const [googleReviews, setGoogleReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
    const interval = setInterval(fetchReviews, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchReviews = async () => {
    try {
      // Fetch local reviews (required)
      const localRes = await api.get("/reviews");
      console.log("Local reviews fetched:", localRes.data);
      setLocalReviews(localRes.data);

      // Fetch Google reviews (optional - don't fail if it errors)
      try {
        const googleRes = await api.get("/google-reviews");
        console.log("Google reviews fetched:", googleRes.data);
        setGoogleReviews(googleRes.data.reviews || []);
      } catch (googleError) {
        console.log("Google reviews not available:", googleError.message);
        setGoogleReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const allReviews = [
    ...localReviews,
    ...googleReviews.map((r) => ({ ...r, isGoogle: true })),
  ];
  const averageRating =
    allReviews.length > 0
      ? (
          allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
        ).toFixed(1)
      : 0;

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(to bottom right, #FFEEA9, #FFBF78)",
      }}
    >
      <nav
        className="bg-white shadow-md border-b-4"
        style={{ borderColor: "#FF7D29" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold" style={{ color: "#BD5E21" }}>
            Shree Janta Ice Cream ( Since 1964 )
          </h1>
          <Link
            to="/"
            className="text-gray-700 hover:text-orange-600 font-medium"
          >
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: "#BD5E21" }}>
            Customer Reviews
          </h2>
          <div className="flex items-center justify-center gap-2 text-2xl">
            <span className="text-yellow-400">★</span>
            <span className="font-bold" style={{ color: "#BD5E21" }}>
              {averageRating}
            </span>
            <span className="text-gray-700">({allReviews.length} reviews)</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div
              className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
              style={{ borderColor: "#FF7D29" }}
            ></div>
          </div>
        ) : (
          <>
            {localReviews.length > 0 && (
              <div className="mb-8">
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: "#BD5E21" }}
                >
                  Recent Reviews
                </h3>
                <ReviewsList reviews={localReviews} />
              </div>
            )}

            {googleReviews.length > 0 && (
              <div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: "#BD5E21" }}
                >
                  Google Reviews
                </h3>
                <ReviewsList reviews={googleReviews} showGoogleBadge />
              </div>
            )}

            {allReviews.length === 0 && (
              <p className="text-center text-gray-500 py-12">
                No reviews yet. Be the first to review!
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ReviewsDisplay;
