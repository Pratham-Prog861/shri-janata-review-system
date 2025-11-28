import { useState, useEffect } from "react";
import api from "../config/api";

function MenuSection() {
  const [menuData, setMenuData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);

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
      }
    };
    fetchMenuData();
  }, []);

  // Filter products based on selected category
  const getFilteredProducts = () => {
    if (selectedCategory === "All") {
      // Get 4 random products from all categories
      const allProducts = menuData.flatMap((category) =>
        category.items.map((item) => ({
          ...item,
          category: category.category,
        }))
      );
      return allProducts.slice(0, 4);
    } else {
      // Get 4 products from selected category
      const categoryData = menuData.find(
        (item) => item.category === selectedCategory
      );
      if (categoryData) {
        return categoryData.items.slice(0, 4).map((item) => ({
          ...item,
          category: categoryData.category,
        }));
      }
      return [];
    }
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2" style={{ color: "#BD5E21" }}>
            Our Full Menu
          </h2>
          <p className="text-gray-600">
            Explore our delicious selection of ice creams and treats
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap md:justify-center gap-3 mb-12 no-scrollbar">
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
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu Button */}
        <div className="text-center mt-12">
          <button
            className="text-white px-8 py-3 rounded-lg transition-all font-semibold text-lg shadow-lg"
            style={{
              background: "linear-gradient(to right, #BD5E21, #FF7D29)",
            }}
          >
            View Full Menu
          </button>
        </div>
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

export default MenuSection;
