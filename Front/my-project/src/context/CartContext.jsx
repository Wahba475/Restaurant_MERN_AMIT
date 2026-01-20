import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Compute cart size from quantities
  let cartSize = 0;

  for (let i = 0; i < cart.length; i++) {
    cartSize = cartSize + (cart[i].quantity || 0);
  }

  // Fetch cart from backend
  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCart([]);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cart/get-cart`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setCart(response.data.cart || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add item to cart
  const addToCart = useCallback(async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to perform this action");
      return { success: false, requiresLogin: true };
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart/add-to-cart`,
        { productId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // Update local cart state immediately
      setCart(response.data.cart || []);
      toast.success("Item added to cart!");
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error adding to cart";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback(async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/cart/remove-from-cart`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { productId },
        },
      );
      setCart(response.data.cart || []);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Error removing item");
    } finally {
      setLoading(false);
    }
  }, []);

  // Decrease quantity
  const decreaseQuantity = useCallback(async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/cart/decrease-quantity`,
        { productId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setCart(response.data.cart || []);
    } catch (error) {
      toast.error("Error updating cart");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Clear cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const value = {
    cart,
    cartSize,
    loading,
    fetchCart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
