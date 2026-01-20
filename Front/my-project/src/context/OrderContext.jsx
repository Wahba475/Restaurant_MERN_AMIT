import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { orderService } from "../services/api";
import toast from "react-hot-toast";

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setOrders([]);
      return;
    }

    try {
      setLoading(true);
      const data = await orderService.getMyOrders();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      // toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch orders on mount if user is logged in
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const value = {
    orders,
    loading,
    fetchOrders,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};
