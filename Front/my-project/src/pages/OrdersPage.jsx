import React, { useEffect } from "react";
import { useOrders } from "../context/OrderContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Clock,
  CheckCircle,
  XCircle,
  CreditCard,
  Banknote,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const OrdersPage = () => {
  const { orders, loading, fetchOrders } = useOrders();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please log in to view your orders");
      return;
    }
    fetchOrders();
  }, [fetchOrders, isLoggedIn]);

  if (!isLoggedIn) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#AD343E]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['DM_Sans',_sans-serif]">
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="font-['Oswald',_sans-serif] text-4xl font-bold text-gray-900 mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-['Oswald',_sans-serif]">
              No orders yet
            </h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't placed any orders yet.
            </p>
            <button
              onClick={() => navigate("/menu")}
              className="px-8 py-3 bg-[#AD343E] text-white rounded-full font-bold hover:bg-[#8f2a32] transition-all"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  {/* Order Header & Status */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-['Oswald',_sans-serif] text-xl font-bold text-gray-900">
                        Order #{order._id.slice(-6)}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                        ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "In Progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="text-sm text-gray-500 space-y-1">
                      <p>
                        {new Date(order.createdAt).toLocaleDateString()} at{" "}
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                      <p className="flex items-center gap-2">
                        {order.paymentMethod === "Cash" ? (
                          <Banknote size={16} />
                        ) : (
                          <CreditCard size={16} />
                        )}
                        {order.paymentMethod} •{" "}
                        <span
                          className={
                            order.paymentStatus === "Paid"
                              ? "text-green-600 font-bold"
                              : "text-gray-600"
                          }
                        >
                          {order.paymentStatus}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="flex-[2]">
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center text-sm"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-[#AD343E]">
                              {item.quantity}x
                            </span>
                            <span className="text-gray-800">{item.name}</span>
                          </div>
                          <span className="font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex-1 md:text-right flex flex-col justify-center">
                    <span className="text-gray-500 text-sm">Total Amount</span>
                    <span className="font-['Oswald',_sans-serif] text-2xl font-bold text-[#AD343E]">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrdersPage;
