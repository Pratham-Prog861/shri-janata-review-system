import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";

function AdminDashboard() {
  const [reviews, setReviews] = useState([]);
  const [offers, setOffers] = useState([]);
  const [activeTab, setActiveTab] = useState("reviews");
  const [newOffer, setNewOffer] = useState({
    discountPercentage: "",
    description: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState({
    type: "",
    text: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [reviewsRes, offersRes] = await Promise.all([
        api.get("/reviews/all"),
        api.get("/offers"),
      ]);
      setReviews(reviewsRes.data);
      setOffers(offersRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401) {
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleReviewVisibility = async (id) => {
    try {
      await api.patch(`/reviews/${id}/toggle`);
      fetchData();
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  const deleteReview = async (id) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await api.delete(`/reviews/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const createOffer = async (e) => {
    e.preventDefault();
    try {
      await api.post("/offers", newOffer);
      setNewOffer({ discountPercentage: "", description: "" });
      fetchData();
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };

  const deleteOffer = async (id) => {
    if (!confirm("Are you sure you want to delete this offer?")) return;
    try {
      await api.delete(`/offers/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMessage({ type: "", text: "" });

    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    // Validate password length
    if (passwordData.newPassword.length < 6) {
      setPasswordMessage({
        type: "error",
        text: "New password must be at least 6 characters",
      });
      return;
    }

    try {
      await api.post("/auth/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setPasswordMessage({
        type: "success",
        text: "Password changed successfully!",
      });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setPasswordMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to change password",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-2 rounded-lg font-semibold ${
              activeTab === "reviews"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setActiveTab("offers")}
            className={`px-6 py-2 rounded-lg font-semibold ${
              activeTab === "offers"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Discount Offers
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-6 py-2 rounded-lg font-semibold ${
              activeTab === "settings"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Settings
          </button>
        </div>

        {activeTab === "reviews" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Reviews</h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="border rounded-lg p-4 flex justify-between items-start"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{review.name}</h3>
                      <span className="text-yellow-400">
                        {"★".repeat(review.rating)}
                      </span>
                      {!review.isVisible && (
                        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                          Hidden
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleString()}
                    </p>
                    {review.couponCode && (
                      <p className="text-sm text-blue-600 mt-1">
                        Coupon: {review.couponCode}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleReviewVisibility(review._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      {review.isVisible ? "Hide" : "Show"}
                    </button>
                    <button
                      onClick={() => deleteReview(review._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {reviews.length === 0 && (
                <p className="text-gray-500 text-center py-8">No reviews yet</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "offers" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Create New Offer</h2>
              <form onSubmit={createOffer} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Discount Percentage (0-100)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    value={newOffer.discountPercentage}
                    onChange={(e) =>
                      setNewOffer({
                        ...newOffer,
                        discountPercentage: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description (Optional)
                  </label>
                  <input
                    type="text"
                    value={newOffer.description}
                    onChange={(e) =>
                      setNewOffer({ ...newOffer, description: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g., Limited time offer"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Create Offer
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">All Offers</h2>
              <div className="space-y-4">
                {offers.map((offer) => (
                  <div
                    key={offer._id}
                    className="border rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl font-bold text-blue-600">
                          {offer.discountPercentage}% OFF
                        </span>
                        {offer.isActive && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            Active
                          </span>
                        )}
                      </div>
                      {offer.description && (
                        <p className="text-gray-600">{offer.description}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        Created:{" "}
                        {new Date(offer.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteOffer(offer._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {offers.length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    No offers created yet
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Change Password</h3>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter current password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter new password (min 6 characters)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Confirm new password"
                  />
                </div>

                {passwordMessage.text && (
                  <div
                    className={`p-3 rounded-lg ${
                      passwordMessage.type === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {passwordMessage.text}
                  </div>
                )}

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Change Password
                </button>
              </form>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-2">
                Account Information
              </h3>
              <p className="text-gray-600">
                Username:{" "}
                <span className="font-medium">
                  {localStorage.getItem("username") || "admin"}
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                For security, we recommend using a strong password with at least
                8 characters, including uppercase, lowercase, numbers, and
                special characters.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
