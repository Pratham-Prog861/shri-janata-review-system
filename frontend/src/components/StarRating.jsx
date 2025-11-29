import { useState } from "react";

function StarRating({ rating, onRatingChange, readOnly = false }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          className={`text-3xl transition-colors ${
            readOnly ? "cursor-default" : "cursor-pointer"
          } ${star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"}`}
          onClick={() => !readOnly && onRatingChange(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default StarRating;
