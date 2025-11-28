import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ReviewPopup from "../components/ReviewPopup";
import CustomerReviewsMarquee from "../components/CustomerReviewsMarquee";
import MenuSection from "../components/MenuSection";
import DeliveryPartnersMarquee from "../components/DeliveryPartnersMarquee";
import Footer from "../components/Footer";
import api from "../config/api";

function Home() {
  const [searchParams] = useSearchParams();
  const [showPopup, setShowPopup] = useState(false);
  const [activeOffer, setActiveOffer] = useState(null);
  const hasOpenedPopup = useRef(false);

  useEffect(() => {
    if (searchParams.get("review") === "true" && !hasOpenedPopup.current) {
      setShowPopup(true);
      hasOpenedPopup.current = true;
    }
  }, [searchParams]);

  useEffect(() => {
    api
      .get("/offers/active")
      .then((res) => setActiveOffer(res.data))
      .catch(console.error);
  }, []);

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
          <h1 className="text-2xl font-bold" style={{ color: "#FF7D29" }}>
            Shree Janta Ice Cream
          </h1>
          <div className="space-x-4">
            <Link
              to="/reviews"
              className="text-gray-700 hover:text-orange-600 font-medium"
            >
              View Reviews
            </Link>
            <Link
              to="/admin/login"
              className="text-gray-700 hover:text-orange-600 font-medium"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Side - Tagline */}
          <div className="space-y-6">
            {/* Legacy Badge */}
            <div className="flex justify-center md:justify-start">
              <div className="inline-flex items-center justify-center w-60 h-60 sm:w-52 sm:h-52 rounded-full shadow-lg overflow-hidden">
                <img
                  src="/logo.jpg"
                  className="w-60 h-60 sm:w-52 sm:h-52 rounded-full object-cover"
                  alt="Logo"
                />
              </div>
            </div>

            <h2
              className="text-4xl md:text-6xl font-bold leading-tight"
              style={{ color: "#BD5E21" }}
            >
              Where Every Scoop Tells a Story
            </h2>
            <p className="text-lg md:text-xl text-gray-700">
              Share your experience and get rewarded with exclusive discounts!
            </p>
          </div>

          {/* Right Side - Review Form */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl border-2">
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "#BD5E21" }}
            >
              Leave a Review
            </h3>
            <p className="text-gray-600 mb-6">
              Share your feedback and receive an exclusive discount coupon!
            </p>

            {activeOffer && (
              <div
                className="text-white p-6 rounded-lg mb-6"
                style={{
                  background: "linear-gradient(to right, #BD5E21, #FF7D29)",
                }}
              >
                <p className="text-sm mb-1">Current Offer</p>
                <p className="text-4xl font-bold">
                  {activeOffer.discountPercentage}% OFF
                </p>
                {activeOffer.description && (
                  <p className="text-sm mt-2">{activeOffer.description}</p>
                )}
              </div>
            )}
            <button
              onClick={() => setShowPopup(true)}
              className="w-full text-white py-3 rounded-lg transition-colors text-lg font-semibold shadow-lg"
              style={{ backgroundColor: "#FF7D29" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#BD5E21")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF7D29")}
            >
              Write a Review
            </button>
          </div>
        </div>
      </div>

      {/* Full Menu Section */}
      <MenuSection />

      {/* What Our Customers Say Section */}
      <CustomerReviewsMarquee />

      {/* Delivery Partners Section */}
      <DeliveryPartnersMarquee />

      {/* Footer Section */}
      <Footer />

      <ReviewPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
}

export default Home;
