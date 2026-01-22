import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading("Signing in...");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/login`,
        {
          email: formData.email,
          password: formData.password,
        },
      );

      // Store token
      login(response.data.token, response.data.user);

      toast.success("Welcome back!", { id: loadingToast });

      // Navigate to home after short delay
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage, { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Left Side - Image */}
      <div className="w-full hidden md:flex md:w-1/2 bg-gray-900">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
          alt="Restaurant Interior"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col"
          data-aos="zoom-in"
        >
          {/* Header */}
          <h2 className="font-['Oswald',_sans-serif] text-4xl text-gray-900 font-medium">
            Sign in
          </h2>
          <p className="font-['DM_Sans',_sans-serif] text-sm text-gray-500 mt-3">
            Welcome back! Please sign in to continue
          </p>

          {/* Email Input */}
          <div className="mt-8">
            <label className="font-['DM_Sans',_sans-serif] text-sm text-gray-700 mb-2 block">
              Email
            </label>
            <div className="flex items-center w-full bg-white border border-gray-300 h-12 rounded-full overflow-hidden px-6 gap-3">
              <svg
                width="16"
                height="11"
                viewBox="0 0 16 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                  fill="#6B7280"
                />
              </svg>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="font-['DM_Sans',_sans-serif] bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mt-6">
            <label className="font-['DM_Sans',_sans-serif] text-sm text-gray-700 mb-2 block">
              Password
            </label>
            <div className="flex items-center w-full bg-white border border-gray-300 h-12 rounded-full overflow-hidden px-6 gap-3">
              <svg
                width="13"
                height="17"
                viewBox="0 0 13 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                  fill="#6B7280"
                />
              </svg>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="font-['DM_Sans',_sans-serif] bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="w-full flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <input
                className="w-4 h-4 accent-[#AD343E]"
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isLoading}
              />
              <label
                className="font-['DM_Sans',_sans-serif] text-sm text-gray-600"
                htmlFor="rememberMe"
              >
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="font-['DM_Sans',_sans-serif] text-sm text-[#AD343E] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-8 w-full h-12 rounded-full text-white bg-[#AD343E] hover:bg-[#8f2a32] transition-colors font-['Oswald',_sans-serif] font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "SIGNING IN..." : "LOGIN"}
          </button>

          {/* Sign Up Link */}
          <p className="font-['DM_Sans',_sans-serif] text-gray-600 text-sm mt-6 text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#AD343E] hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>

          {/* Back to Home */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-4 font-['DM_Sans',_sans-serif] text-sm text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isLoading}
          >
            ← Back to Home
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
