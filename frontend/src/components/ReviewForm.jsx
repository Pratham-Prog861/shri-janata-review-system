import { useState } from "react";
import StarRating from "./StarRating";
import api from "../config/api";

function ReviewForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    comment: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.rating) {
      setError("Please select a rating");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/reviews", formData);
      onSuccess(response.data);
      setFormData({ name: "", rating: 0, comment: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Your Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Rating</label>
        <StarRating
          rating={formData.rating}
          setRating={(rating) => setFormData({ ...formData, rating })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Your Review</label>
        <textarea
          required
          value={formData.comment}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows="4"
          placeholder="Share your experience..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}

export default ReviewForm;
