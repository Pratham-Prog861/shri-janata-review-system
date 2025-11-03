import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import QRCode from "qrcode";
import ReviewPopup from "../components/ReviewPopup";
import api from "../config/api";

function Home() {
  const [searchParams] = useSearchParams();
  const [showPopup, setShowPopup] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [activeOffer, setActiveOffer] = useState(null);
  const hasOpenedPopup = useRef(false);

  useEffect(() => {
    if (searchParams.get("review") === "true" && !hasOpenedPopup.current) {
      setShowPopup(true);
      hasOpenedPopup.current = true;
    }
  }, [searchParams]);

  useEffect(() => {
    const reviewUrl = `${window.location.origin}/?review=true`;
    QRCode.toDataURL(reviewUrl, { width: 300 })
      .then(setQrCodeUrl)
      .catch(console.error);

    api
      .get("/offers/active")
      .then((res) => setActiveOffer(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Review System</h1>
          <div className="space-x-4">
            <Link to="/reviews" className="text-gray-700 hover:text-blue-600">
              View Reviews
            </Link>
            <Link
              to="/admin/login"
              className="text-gray-700 hover:text-blue-600"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Welcome!</h2>
          <p className="text-xl text-gray-600">
            Share your experience and get rewarded
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Leave a Review</h3>
            <p className="text-gray-600 mb-6">
              Share your feedback and receive an exclusive discount coupon!
            </p>

            {activeOffer && (
              <div className="bg-linear-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-6">
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
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Write a Review
            </button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Scan QR Code</h3>
            <p className="text-gray-600 mb-6">
              Customers can scan this QR code to leave a review
            </p>
            {qrCodeUrl && (
              <img
                src={qrCodeUrl}
                alt="Review QR Code"
                className="mx-auto rounded-lg shadow-md"
              />
            )}
            <p className="text-sm text-gray-500 mt-4">
              Print this QR code and display it at your location
            </p>
          </div>
        </div>
      </div>

      <ReviewPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
}

export default Home;
