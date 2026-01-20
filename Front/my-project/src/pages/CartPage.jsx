import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";

function CartPage() {
  const navigate = useNavigate();
  const { cart, loading, addToCart, decreaseQuantity, removeFromCart } =
    useCart();

  // Calculate total price
  const total = cart.reduce((sum, item) => {
    // Handle case where product might be null if deleted but still in cart
    if (!item.product) return sum;
    return sum + item.product.price * item.quantity;
  }, 0);

  if (loading && cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#AD343E] border-t-transparent mb-4"></div>
          <p className="font-['DM_Sans',_sans-serif] text-gray-600">
            Loading your cart...
          </p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="font-['Oswald',_sans-serif] text-3xl font-bold text-gray-900 mb-4">
          Your Cart is Empty
        </h2>
        <p className="font-['DM_Sans',_sans-serif] text-gray-600 mb-8 text-center max-w-md">
          Looks like you haven't added any delicious items to your cart yet.
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="px-8 py-3 bg-[#AD343E] text-white rounded-full font-['Oswald',_sans-serif] font-medium tracking-wide hover:bg-[#8f2a32] transition-colors"
        >
          BROWSE MENU
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <h1 className="font-['Oswald',_sans-serif] text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        Your Cart
        <span className="text-lg font-['DM_Sans',_sans-serif] font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {cart.reduce((acc, item) => acc + item.quantity, 0)} items
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => {
            // Skip invalid items where product failed to populate
            if (!item.product) return null;

            return (
              <div
                key={item._id || item.product._id}
                className="flex gap-6 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150?text=No+Image";
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-['Oswald',_sans-serif] text-xl font-bold text-gray-900 line-clamp-2">
                        {item.product.name}
                      </h3>
                      <p className="font-['DM_Sans',_sans-serif] text-[#AD343E] font-bold mt-1">
                        ${item.product.price?.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1">
                      <button
                        onClick={() => decreaseQuantity(item.product._id)}
                        disabled={loading}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-700 shadow-sm hover:text-[#AD343E] disabled:opacity-50 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-['Oswald',_sans-serif] font-medium w-6 text-center text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addToCart(item.product._id)}
                        disabled={loading}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-700 shadow-sm hover:text-[#AD343E] disabled:opacity-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Item Total */}
                    <p className="font-['Oswald',_sans-serif] text-lg font-bold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <button
            onClick={() => navigate("/menu")}
            className="flex items-center gap-2 text-[#AD343E] font-['DM_Sans',_sans-serif] font-bold hover:underline mt-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 sticky top-24">
            <h2 className="font-['Oswald',_sans-serif] text-2xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between text-gray-600 font-['DM_Sans',_sans-serif]">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 font-['DM_Sans',_sans-serif]">
                <span>Tax (estimated)</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-gray-600 font-['DM_Sans',_sans-serif]">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="font-['Oswald',_sans-serif] text-xl font-bold text-gray-900">
                Total
              </span>
              <span className="font-['Oswald',_sans-serif] text-2xl font-bold text-[#AD343E]">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full py-4 bg-[#AD343E] text-white rounded-full font-['Oswald',_sans-serif] font-bold tracking-wide hover:bg-[#8f2a32] shadow-lg shadow-[#AD343E]/20 transition-all hover:-translate-y-1"
            >
              PROCEED TO CHECKOUT
            </button>

            <div className="mt-6 text-center">
              <p className="font-['DM_Sans',_sans-serif] text-sm text-gray-500">
                Secure Checkout • Free Shipping
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
