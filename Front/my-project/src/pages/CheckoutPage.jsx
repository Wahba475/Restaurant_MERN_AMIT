import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

import {
  ArrowLeft,
  CreditCard,
  Wallet,
  MapPin,
  Phone,
  User as UserIcon,
} from "lucide-react";
import toast from "react-hot-toast";

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, loading, clearCart } = useCart();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to perform this action");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  const [paymentMethod, setPaymentMethod] = useState(""); // 'cash' or 'stripe'
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  // Calculate total
  const total = cart.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + item.product.price * item.quantity;
  }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to place an order");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const orderItems = cart.map((item) => ({
        item: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }));

      const orderPayload = {
        customerName: formData.name,
        address: formData.address,
        phone: formData.phone,
        orderNotes: formData.notes,
        paymentMethod: paymentMethod === "cash" ? "Cash" : "Stripe",
        items: orderItems,
        totalPrice: total * 1.05, // Including tax
      };

      // 1. Create Order
      const orderResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        orderPayload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const { order } = orderResponse.data;

      // 2. Handle Payment Flow
      if (paymentMethod === "stripe") {
        const sessionResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/stripe/create-checkout-session`,
          {
            orderId: order._id,
            items: orderItems,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        window.location.href = sessionResponse.data.url;
      } else {
        toast.success("Order placed successfully!");
        navigate("/orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-['Oswald',_sans-serif] text-2xl mb-4">
            Your cart is empty
          </h2>
          <button
            onClick={() => navigate("/menu")}
            className="text-[#AD343E] underline"
          >
            Return to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-gray-600 hover:text-[#AD343E] transition-colors font-['DM_Sans',_sans-serif] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </button>
          <h1 className="font-['Oswald',_sans-serif] text-4xl font-bold text-gray-900">
            Checkout
          </h1>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          data-aos="zoom-in"
        >
          {/* Left Column: Form & Payment */}
          <div className="lg:col-span-7 space-y-8">
            {/* Delivery Details Section */}
            <div
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <h2 className="font-['Oswald',_sans-serif] text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#AD343E]" />
                Delivery Details
              </h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 font-['DM_Sans',_sans-serif]">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#AD343E] focus:ring-1 focus:ring-[#AD343E] outline-none transition-all font-['DM_Sans',_sans-serif]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 font-['DM_Sans',_sans-serif]">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#AD343E] focus:ring-1 focus:ring-[#AD343E] outline-none transition-all font-['DM_Sans',_sans-serif]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 font-['DM_Sans',_sans-serif]">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main St, Apt 4B"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#AD343E] focus:ring-1 focus:ring-[#AD343E] outline-none transition-all font-['DM_Sans',_sans-serif]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 font-['DM_Sans',_sans-serif]">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Special instructions for delivery..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#AD343E] focus:ring-1 focus:ring-[#AD343E] outline-none transition-all font-['DM_Sans',_sans-serif] h-24 resize-none"
                  />
                </div>
              </form>
            </div>

            {/* Payment Method Section */}
            <div
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              <h2 className="font-['Oswald',_sans-serif] text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[#AD343E]" />
                Payment Method
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Cash Button */}
                <button
                  onClick={() => setPaymentMethod("cash")}
                  className={`group relative h-24 bg-white border-2 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden
                    ${
                      paymentMethod === "cash"
                        ? "border-[#AD343E] shadow-lg shadow-[#AD343E]/10 scale-[1.02]"
                        : "border-gray-100 hover:border-gray-300 hover:shadow-md"
                    }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full absolute top-4 right-4 border-2 transition-colors
                    ${paymentMethod === "cash" ? "border-[#AD343E] bg-[#AD343E]" : "border-gray-300"}`}
                  />
                  <span
                    className={`font-['Oswald',_sans-serif] text-xl font-bold transition-colors
                    ${paymentMethod === "cash" ? "text-[#AD343E]" : "text-gray-700"}`}
                  >
                    CASH
                  </span>
                </button>

                {/* Stripe Button */}
                <button
                  onClick={() => setPaymentMethod("stripe")}
                  className={`group relative h-24 bg-white border-2 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden
                    ${
                      paymentMethod === "stripe"
                        ? "border-[#635BFF] shadow-lg shadow-[#635BFF]/10 scale-[1.02]"
                        : "border-gray-100 hover:border-gray-300 hover:shadow-md"
                    }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full absolute top-4 right-4 border-2 transition-colors
                    ${paymentMethod === "stripe" ? "border-[#635BFF] bg-[#635BFF]" : "border-gray-300"}`}
                  />
                  {/* Pseudo-logo for Stripe */}
                  <div className="flex items-center gap-1">
                    <span className="font-['DM_Sans',_sans-serif] font-bold text-2xl text-[#635BFF]">
                      stripe
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 sticky top-24 border border-gray-200">
              <h2 className="font-['Oswald',_sans-serif] text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => {
                  if (!item.product) return null;
                  return (
                    <div
                      key={item.product._id}
                      className="flex gap-4 items-start"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shrink-0 border border-gray-100">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-['Oswald',_sans-serif] text-sm font-bold text-gray-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs font-['DM_Sans',_sans-serif] text-gray-500">
                            Qty: {item.quantity}
                          </span>
                          <span className="text-sm font-['DM_Sans',_sans-serif] font-bold text-[#AD343E]">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-gray-600 font-['DM_Sans',_sans-serif]">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-['DM_Sans',_sans-serif]">
                  <span>Tax (5%)</span>
                  <span>${(total * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-['DM_Sans',_sans-serif]">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="font-['Oswald',_sans-serif] text-xl font-bold text-gray-900">
                    Total
                  </span>
                  <span className="font-['Oswald',_sans-serif] text-2xl font-bold text-[#AD343E]">
                    ${(total * 1.05).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-[#AD343E] text-white rounded-full font-['Oswald',_sans-serif] font-bold tracking-wide hover:bg-[#8f2a32] shadow-lg shadow-[#AD343E]/20 transition-all hover:-translate-y-1 mt-8 flex items-center justify-center gap-2"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CheckoutPage;
