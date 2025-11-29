import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import api from "../config/api";

function ReviewForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    comment: "",
    category: "",
    productName: "",
    productPrice: 0,
  });
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/menu/categories");
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    const fetchProducts = async () => {
      if (formData.category) {
        try {
          const response = await api.get(`/menu/category/${formData.category}`);
          setProducts(response.data);
          // Reset product selection when category changes
          setFormData((prev) => ({
            ...prev,
            productName: "",
            productPrice: 0,
          }));
        } catch (err) {
          console.error("Failed to fetch products:", err);
        }
      } else {
        setProducts([]);
      }
    };
    fetchProducts();
  }, [formData.category]);

  const handleProductChange = (e) => {
    const selectedProduct = products.find((p) => p.name === e.target.value);
    if (selectedProduct) {
      setFormData({
        ...formData,
        productName: selectedProduct.name,
        productPrice: selectedProduct.price,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.rating) {
      setError("Please select a rating");
      return;
    }

    if (!formData.category) {
      setError("Please select a product category");
      return;
    }

    if (!formData.productName) {
      setError("Please select a product");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/reviews", formData);
      onSuccess(response.data);
      setFormData({
        name: "",
        rating: 0,
        comment: "",
        category: "",
        productName: "",
        productPrice: 0,
      });
      setProducts([]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-200">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Name
        </label>
        <input
          type="text"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rating
        </label>
        <div className="flex justify-center py-2">
          <StarRating
            rating={formData.rating}
            onRatingChange={(rating) => setFormData({ ...formData, rating })}
            size="lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all bg-white"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={`${cat}-${index}`} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product
          </label>
          <select
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all bg-white"
            value={formData.productName}
            onChange={handleProductChange}
            disabled={!formData.category}
          >
            <option value="">
              {formData.category ? "Select Product" : "Select Category First"}
            </option>
            {products.map((product, index) => (
              <option key={product._id || index} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {formData.productPrice > 0 && (
        <div
          className="text-right text-sm font-medium"
          style={{ color: "#BD5E21" }}
        >
          Price: ₹{formData.productPrice}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Review
        </label>
        <textarea
          required
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all resize-none"
          value={formData.comment}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
          placeholder="Tell us what you liked..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full text-white py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(to right, #FF7D29, #BD5E21)",
        }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Submitting...
          </span>
        ) : (
          "Submit Review"
        )}
      </button>
    </form>
  );
}

export default ReviewForm;
