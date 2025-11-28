import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import api from "../config/api";

function CustomerReviewsMarquee() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get("/reviews");
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  // Create a base set of reviews duplicated multiple times
  const baseReviews = [...reviews, ...reviews, ...reviews, ...reviews];

  // Double the base set for the seamless loop effect
  const duplicatedReviews = [...baseReviews, ...baseReviews];

  return (
    <div
      className="py-12 md:py-16 overflow-hidden"
      style={{ background: "linear-gradient(to right, #FFEEA9, #FFBF78)" }}
    >
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-2"
          style={{ color: "#BD5E21" }}
        >
          What Our Customers Say
        </h2>
        <p className="text-center text-gray-700 text-sm md:text-base">
          Real experiences from our valued customers
        </p>
      </div>

      <div className="relative">
        <div className="marquee-container">
          <div className="marquee-content">
            {duplicatedReviews.map((review, index) => (
              <div
                key={`${review._id}-${index}`}
                className="review-card bg-white p-4 md:p-6 rounded-lg shadow-lg mx-4 min-w-[300px] max-w-[300px] md:min-w-[350px] md:max-w-[350px]"
              >
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <h3 className="font-semibold text-base md:text-lg text-gray-800">
                    {review.name}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="mb-2 md:mb-3">
                  <StarRating rating={review.rating} readOnly />
                </div>

                {review.productName && (
                  <div
                    className="mb-2 md:mb-3 p-2 rounded"
                    style={{ backgroundColor: "#FFEEA9" }}
                  >
                    <p
                      className="text-xs md:text-sm"
                      style={{ color: "#BD5E21" }}
                    >
                      <span className="font-medium">Product:</span>{" "}
                      {review.productName}
                      {review.productPrice && (
                        <span
                          className="ml-2 font-semibold"
                          style={{ color: "#FF7D29" }}
                        >
                          ₹{review.productPrice}
                        </span>
                      )}
                    </p>
                  </div>
                )}

                <p className="text-gray-700 text-sm md:text-base line-clamp-3 md:line-clamp-4">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient overlays for fade effect */}
        <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-purple-50 to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-blue-50 to-transparent pointer-events-none z-10"></div>
      </div>

      <style jsx>{`
        .marquee-container {
          overflow: hidden;
          position: relative;
        }

        .marquee-content {
          display: flex;
          width: fit-content;
          animation: marquee 40s linear infinite;
        }

        @media (min-width: 768px) {
          .marquee-content {
            animation: marquee 80s linear infinite;
          }
        }

        .marquee-content:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default CustomerReviewsMarquee;
