import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

function ProductPage() {
  // Get product ID from URL
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // State management
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/menu/${id}`,
        );
        setItem(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  const handleAddToCart = async () => {
    const result = await addToCart(id);
    if (result.requiresLogin) {
      navigate("/login");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#AD343E] border-t-transparent mb-4"></div>
            <p className="font-['DM_Sans',_sans-serif] text-gray-600 text-lg">
              Loading product details...
            </p>
          </div>
        </div>
       
      </div>
    );
  }

  // Error state
  if (error || !item) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="font-['Oswald',_sans-serif] text-2xl text-gray-900 mb-3">
              Product Not Found
            </h2>
            <p className="font-['DM_Sans',_sans-serif] text-gray-500 mb-6">
              {error || "The product you are looking for does not exist."}
            </p>
            <button
              onClick={() => navigate("/menu")}
              className="px-6 py-3 bg-[#AD343E] text-white rounded-full font-['Oswald',_sans-serif] font-medium tracking-wide hover:bg-[#8f2a32] transition-colors"
            >
              BACK TO MENU
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 py-12 md:py-16 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate("/menu")}
            className="mb-8 flex items-center gap-2 text-gray-600 hover:text-[#AD343E] transition-colors font-['DM_Sans',_sans-serif]"
          >
            <span>←</span>
            <span>Back to Menu</span>
          </button>

          {/* Product details */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Product image */}
              <div className="h-64 md:h-full min-h-[400px] bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x400?text=No+Image";
                  }}
                />
              </div>

              {/* Product info */}
              <div className="p-6 md:p-8 flex flex-col justify-center">
                {/* Category badge */}
                <div className="mb-4">
                  <span className="inline-block px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-['Oswald',_sans-serif] tracking-wide">
                    {item.category}
                  </span>
                </div>

                {/* Product name */}
                <h1 className="font-['Oswald',_sans-serif] text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {item.name}
                </h1>

                {/* Price */}
                <p className="font-['Oswald',_sans-serif] text-4xl md:text-5xl font-bold text-[#AD343E] mb-6">
                  ${item.price?.toFixed(2)}
                </p>

                {/* Description */}
                <p className="font-['DM_Sans',_sans-serif] text-gray-600 text-base leading-relaxed mb-6">
                  {item.description || "Delicious dish from our kitchen."}
                </p>

                {/* Additional info */}
                <div className="space-y-3 mb-8">
                  {item.prepTime && (
                    <div className="flex items-center gap-3">
                      <span className="font-['Oswald',_sans-serif] text-gray-900 font-medium">
                        Prep Time:
                      </span>
                      <span className="font-['DM_Sans',_sans-serif] text-gray-600">
                        {item.prepTime} minutes
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <span className="font-['Oswald',_sans-serif] text-gray-900 font-medium">
                      Availability:
                    </span>
                    <span
                      className={`font-['DM_Sans',_sans-serif] ${item.available ? "text-green-600" : "text-red-600"}`}
                    >
                      {item.available ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 px-6 py-3 bg-[#AD343E] text-white rounded-full font-['Oswald',_sans-serif] font-medium tracking-wide hover:bg-[#8f2a32] transition-colors"
                    disabled={!item.available}
                  >
                    {item.available ? "ORDER NOW" : "OUT OF STOCK"}
                  </button>

                  <button
                    onClick={() => navigate("/menu")}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-['Oswald',_sans-serif] font-medium tracking-wide hover:border-[#AD343E] hover:text-[#AD343E] transition-colors"
                  >
                    BROWSE MENU
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductPage;
