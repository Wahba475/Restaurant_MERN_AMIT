import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, Check } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields", { duration: 1000 });
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/admin/login",
        {
          email,
          password,
        },
      );

      if (data.role === "admin" && data.token) {
        localStorage.setItem("adminToken", data.token);
        toast.success("Welcome back, Admin!", { duration: 1000 });
        navigate("/admin/dashboard");
      } else {
        toast.error("Access denied. Admins only.", { duration: 1000 });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed", {
        duration: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Left Side - Image */}
      <div className="w-full hidden md:flex md:w-1/2 bg-gray-900 relative overflow-hidden">
        <img
          className="w-full h-full object-cover opacity-80"
          src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop"
          alt="Restaurant Kitchen"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <form onSubmit={handleLogin} className="w-full max-w-md flex flex-col">
          {/* Header */}
          <h2 className="font-['Oswald',_sans-serif] text-4xl text-gray-900 font-medium">
            Admin Login
          </h2>
          <p className="font-['DM_Sans',_sans-serif] text-sm text-gray-500 mt-3">
            Sign in to manage your restaurant
          </p>

          {/* Email Input */}
          <div className="mt-8">
            <label className="font-['DM_Sans',_sans-serif] text-sm text-gray-700 mb-2 block">
              Email Address
            </label>
            <div className="flex items-center w-full bg-white border border-gray-300 h-12 rounded-full overflow-hidden px-6 gap-3">
              <Mail className="text-gray-400 w-5 h-5 flex-shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
               
                className="font-['DM_Sans',_sans-serif] bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mt-6">
            <label className="font-['DM_Sans',_sans-serif] text-sm text-gray-700 mb-2 block">
              Password
            </label>
            <div className="flex items-center w-full bg-white border border-gray-300 h-12 rounded-full overflow-hidden px-6 gap-3">
              <Lock className="text-gray-400 w-5 h-5 flex-shrink-0" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="font-['DM_Sans',_sans-serif] bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
                required
              />
            </div>
          </div>

          {/* Remember Me */}
          <div className="w-full flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <input
                className="w-4 h-4 accent-black"
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label
                className="font-['DM_Sans',_sans-serif] text-sm text-gray-600"
                htmlFor="rememberMe"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="font-['DM_Sans',_sans-serif] text-sm text-gray-400 hover:text-black transition-colors"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full h-12 rounded-full text-white bg-black hover:bg-gray-800 transition-colors font-['Oswald',_sans-serif] font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed uppercase"
          >
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>

          {/* Back Home */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-4 font-['DM_Sans',_sans-serif] text-sm text-gray-500 hover:text-gray-700 transition-colors mx-auto"
          >
            ← Back to Home
          </button>
        </form>
      </div>
    </div>
  );
}
