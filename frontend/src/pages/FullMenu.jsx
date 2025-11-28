import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../config/api";

function FullMenu() {
  const [menuData, setMenuData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await api.get("/menu");
        setMenuData(response.data);

        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...response.data.map((item) => item.category),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch menu data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuData();
  }, []);

  // Filter products based on selected category
  const getFilteredProducts = () => {
    if (selectedCategory === "All") {
      // Get all products from all categories
      return menuData.flatMap((category) =>
        category.items.map((item) => ({
          ...item,
          category: category.category,
        }))
      );
    } else {
      // Get products from selected category
      const categoryData = menuData.find(
        (item) => item.category === selectedCategory
      );
      if (categoryData) {
        return categoryData.items.map((item) => ({
          ...item,
          category: categoryData.category,
        }));
      }
      return [];
    }
  };

  const filteredProducts = getFilteredProducts();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* Header */}
      <div className="bg-orange-50 py-8 shadow-sm mb-8">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium mb-4 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold" style={{ color: "#BD5E21" }}>
            Full Menu
          </h1>
          <p className="text-gray-600 mt-2">
            Explore our complete collection of delicious treats
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap md:justify-center gap-3 mb-12 no-scrollbar sticky top-4 z-10 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap shrink-0"
              style={{
                backgroundColor:
                  selectedCategory === category ? "#FF7D29" : "#FFEEA9",
                color: selectedCategory === category ? "#FFFFFF" : "#BD5E21",
                boxShadow:
                  selectedCategory === category
                    ? "0 4px 6px rgba(189, 94, 33, 0.3)"
                    : "none",
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={`${product.name}-${index}`}
              className="bg-white border-2 rounded-lg p-6 hover:shadow-xl transition-all duration-300"
              style={{ borderColor: "#FFBF78" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#FF7D29")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#FFBF78")
              }
            >
              {/* Category Badge */}
              <div className="mb-3">
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#FFEEA9", color: "#BD5E21" }}
                >
                  {product.category}
                </span>
              </div>

              {/* Product Name */}
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "#BD5E21" }}
              >
                {product.name}
              </h3>

              {/* Product Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description ||
                  `Delicious ${product.name} from our ${product.category} collection. Made with premium ingredients for the perfect taste.`}
              </p>

              {/* Price */}
              <div
                className="flex items-center justify-between mt-4 pt-4"
                style={{ borderTop: "1px solid #FFBF78" }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color: "#FF7D29" }}
                >
                  ₹{product.price}
                </span>
                <button
                  className="text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
                  style={{ backgroundColor: "#FF7D29" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#BD5E21")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#FF7D29")
                  }
                >
                  Try This
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
}

export default FullMenu;
