import StarRating from "./StarRating";

function ReviewsList({ reviews, showGoogleBadge = false }) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-500 text-center py-8">No reviews yet</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <div
          key={review._id || index}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg">
                {review.author_name || review.name}
              </h3>
              <p className="text-sm text-gray-500">
                {review.relative_time_description ||
                  new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
            {showGoogleBadge && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                Google Review
              </span>
            )}
          </div>

          <StarRating rating={review.rating} readOnly />

          <p className="mt-3 text-gray-700">{review.text || review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewsList;
